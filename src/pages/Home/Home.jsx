import { useEffect, useState } from "react";
import Banner from "../../components/Banner/Banner";
import Displayitems from "../../components/DisplayItems/Displayitems";
import { Flashlight } from "lucide-react";

const Home = () => {
  // const [loading, setLoading] = useState(false);

  // const scrollHandler = () => {
  //   const scrollContainer = document.getElementById("page-container-wrapper");
  //   if (!scrollContainer) return;

  //   const { scrollTop, scrollHeight, clientHeight } = scrollContainer;

  //   const threshold = 100; // pixels from bottom

  //   console.log({ scrollTop, scrollHeight, clientHeight });

  //   if (scrollHeight - (scrollTop + clientHeight) < threshold && !loading) {
  //     console.log("call");
  //   }
  // };

  // useEffect(() => {
  //   const scrollContainer = document.getElementById("page-container-wrapper");

  //   if (!scrollContainer) return;

  //   if (scrollContainer) {
  //     scrollContainer.addEventListener("scroll", scrollHandler);
  //   }

  //   return () => {
  //     if (scrollContainer) {
  //       scrollContainer.removeEventListener("scroll", scrollHandler);
  //     }
  //   };
  // }, []);

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);

  const loadMoreItems = async () => {
    try {
      if (loading || !hasMore) return;
      const res = await fetch(`https://dummyjson.com/products?limit=10&skip=${skip}`);
      const resData = await res.json();
      const newProducts = resData.products;
      console.log("here, resData: ", resData);
      // console.log("resData.products.length: ", resData.products.length);
      if (resData.products.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prev) => {
          const uniqueNew = newProducts.filter((item) => !prev.some((existing) => existing.id === item.id));

          const updated = [...prev, ...uniqueNew];
          console.log("updatedProducts: ", updated);
          return updated;
        });
        setSkip((prev) => prev + 10);
      }
    } catch (error) {
      console.error("Error in loadMoreItems, err: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    const scrollConatiner = document.getElementById("home-infinite-scroll-container");
    const { scrollTop, scrollHeight, clientHeight } = scrollConatiner;
    const threshold = 100;
    if (scrollHeight - (scrollTop + clientHeight) < threshold && !loading) {
      loadMoreItems();
    }
  };
  useEffect(() => {
    loadMoreItems();
    const scrollContainer = document.getElementById("home-infinite-scroll-container");
    if (!scrollContainer) return;
    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="page-container" id="home-infinite-scroll-container">
      <Banner />
      <Displayitems products={products} />

      {loading && <div style={{ textAlign: "center", padding: "16px" }}>Loading...</div>}
      {!hasMore && <div style={{ textAlign: "center", padding: "16px" }}>No more products</div>}
    </div>
  );
};

export default Home;
