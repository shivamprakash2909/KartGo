import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllDashboardProducts,
  setDashboadStats,
  setCategoryWiseStats,
  addProduct,
} from "../../features/dashboardSlice";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import { DollarSign, Package } from "lucide-react";
import "./Dashboard.css";
import { Bar, BarChart, Legend, Pie, PieChart, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import AdminItemCard from "../../components/AdminItemCard/AdminItemCard";
import AddProductModal from "./AddProductModal";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { dashboardStats, allProducts, dashboardItemsPerCategory } = useSelector((state) => state.dashboard);
  const [monthlyInventoryValue, setMonthlyInventoryValue] = useState([]);
  const [displayAdminItems, setDisplayAdminItems] = useState(false);
  const [openAddProductModal, setOpenAddProdModal] = useState(false);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  const addProductHandler = async (addedProductData) => {
    let newProduct = null;
    try {
      setIsAddingProduct(true);
      const res = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: addedProductData.id,
          title: addedProductData.title,
          price: addedProductData.price,
          description: addedProductData.description,
          category: addedProductData.category,
          stock: addedProductData.stock,
          images: addedProductData.images,
        }),
      });
      const resData = await res.json();
      if (resData) {
        newProduct = {
          id: resData.id,
          title: resData.title,
          price: resData.price,
          description: resData.description,
          category: resData.category,
          stock: resData.stock,
          images: resData.images,
        };
      }
    } catch (error) {
      console.error("Error in adding Product, error: ", error);
    } finally {
      setIsAddingProduct(false);
      setOpenAddProdModal(false);
    }
  };
  const generateDashboardStats = async () => {
    const allProducts = await fetch("https://dummyjson.com/products?limit=0");
    const allProductsData = await allProducts.json();

    dispatch(setAllDashboardProducts(allProductsData));
    if (allProductsData && allProductsData.total && allProductsData.products.length) {
      let totalInventoryValue = 0;
      allProductsData.products.forEach((prod) => {
        totalInventoryValue += prod.price * prod.stock;
      });

      dispatch(
        setDashboadStats({
          totalInventoryValue,
          tottalProducts: allProductsData.total,
        })
      );
    }
  };

  const generateMonthlyInventoryValueData = () => {
    const data = {
      Jan: 0,
      Feb: 0,
      Mar: 0,
      Apr: 0,
      May: 0,
      Jun: 0,
      Jul: 0,
      Aug: 0,
      Sep: 0,
      Oct: 0,
      Nov: 0,
      Dec: 0,
    };

    const today = new Date();
    const dataKeys = Object.keys(data);

    allProducts.products.forEach((prod) => {
      const creationDate = new Date(prod.meta.createdAt);
      const creationYear = creationDate.getFullYear();
      const creationMonth = creationDate.getMonth();

      if (creationMonth > today.getMonth() && creationYear === today.getFullYear() - 1) {
        data[dataKeys[creationMonth]] += prod.price * prod.stock;
      } else if (creationMonth <= today.getMonth() && creationYear === today.getFullYear()) {
        data[dataKeys[creationMonth]] += prod.price * prod.stock;
      }
    });

    setMonthlyInventoryValue(
      dataKeys.map((monthName) => {
        return {
          month: monthName.toString(),
          valuation: data[monthName],
        };
      })
    );
  };

  const fetchCategoryData = async () => {
    try {
      const productsRes = await fetch("https://dummyjson.com/products?limit=0");
      const { products } = await productsRes.json();

      const categoryRes = await fetch("https://dummyjson.com/products/categories");
      const allCategories = await categoryRes.json();
      const totalCategories = allCategories.length;
      const categoryMap = new Map();

      allCategories.forEach((cat) => {
        categoryMap.set(cat.slug, { slug: cat.slug, name: cat.name, value: 0, totalAmount: 0 });
      });

      products.forEach((product) => {
        if (categoryMap.has(product.category)) {
          const eachCategory = categoryMap.get(product.category);
          eachCategory.value++;
          eachCategory.totalAmount += product.price * product.stock;
        }
      });
      const categoryData = Array.from(categoryMap.values());

      dispatch(
        setCategoryWiseStats({
          totalCategories,
          categoryData,
        })
      );
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const formatYAxisTick = (value) => {
    if (value >= 1000) {
      return `${value / 1000}k`;
    }
    return value;
  };

  useEffect(() => {
    generateDashboardStats();
  }, []);

  useEffect(() => {
    generateMonthlyInventoryValueData();
    fetchCategoryData();
  }, [allProducts.products]);

  return (
    <div className="page-container dashboard">
      <div className="Dashboard-addButton-heading">
        <div>
          <h1>Dashboard</h1>
          <h3>Welcome to your e-commerce admin dashboard</h3>
        </div>
        <div>
          <button onClick={() => setOpenAddProdModal(true)}>Add Product</button>
        </div>
      </div>

      <AddProductModal
        isOpen={openAddProductModal}
        onClose={() => setOpenAddProdModal(false)}
        onSave={addProductHandler}
        cancelBtnText="Cancel"
        saveBtnText="Add"
        title="Add Product"
        cancelBtnDisabled={isAddingProduct}
        confirmBtnDisabled={isAddingProduct}
      />

      <div className="dasboard-card-section">
        <DashboardCard
          Icon={<Package />}
          title={"Total Inventory Value"}
          value={`$${dashboardStats.totalInventoryValue}`}
          key={"inv-val-dashboard-card"}
        />
        <DashboardCard
          Icon={<DollarSign />}
          title={"Total Products"}
          value={dashboardStats.tottalProducts}
          key={"prod-count-dashboard-card"}
        />
      </div>
      <div className="dasboard-chart-section">
        <ResponsiveContainer className="dashboard-card dashboard-chart-container" width="100%" height={400}>
          <BarChart data={monthlyInventoryValue} height={"100%"}>
            <XAxis dataKey="month" />
            <YAxis tickFormatter={formatYAxisTick} />
            <Tooltip />
            <Legend />

            <Bar dataKey="valuation" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer
          className="dashboard-card dashboard-chart-container"
          width="100%"
          height={400}
          style={{ padding: "0 0 0 30px" }}
        >
          <PieChart height={"100%"} width={"100%"}>
            <Pie
              data={dashboardItemsPerCategory.categoryData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={160}
              fill="#8884d8"
              label
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        <ResponsiveContainer
          className="dashboard-card dashboard-chart-container"
          width="100%"
          height={400}
          style={{ padding: "0 0 0 30px" }}
        >
          <PieChart height={"100%"} width={"100%"}>
            <Pie
              data={dashboardItemsPerCategory.categoryData}
              dataKey="totalAmount"
              cx="50%"
              cy="50%"
              outerRadius={180}
              fill="#8884d8"
              // label
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        {/* <div>y</div> */}
      </div>
      <div className="dashboard-item-list">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "6px",
            marginBottom: "16px",
          }}
        >
          <button onClick={() => setDisplayAdminItems((prev) => !prev)}>
            {displayAdminItems ? "Hide Products" : "Show Products"}
          </button>
        </div>

        {displayAdminItems &&
          allProducts.products.map((product) => <AdminItemCard key={product.id} productData={product} />)}
      </div>
    </div>
  );
};

export default Dashboard;
