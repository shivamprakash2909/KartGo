import React, { useState } from "react";
import "./AdminItemCard.css";
import { useDispatch, useSelector } from "react-redux";

import ConfirmationModal from "../Modal/ConfirmationModal";
import { updateDashboardProductList } from "../../features/dashboardSlice";
import EditProductModal from "./EditProductModal";

const AdminItemCard = ({ productData }) => {
  const { images, title, brand, category, price, rating, stock, description } = productData;

  const dispatch = useDispatch();

  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const { allProducts } = useSelector((state) => state.dashboard);

  const deleteHandler = async () => {
    try {
      setIsDeleting(true);
      const res = await fetch(`https://dummyjson.com/products/${productData.id}`, {
        method: "DELETE",
      });

      const resData = await res.json();

      if (resData.isDeleted) {
        dispatch(updateDashboardProductList(allProducts.products.filter((prod) => prod.id !== productData.id)));
      }
    } catch (error) {
      console.error("Failed to delete product, err: ", error);
    } finally {
      setIsDeleting(false);
      setOpenDeleteModal(false);
    }
  };

  const updateHandler = async (updatedProdData) => {
    try {
      setIsUpdating(true);

      const res = await fetch(`https://dummyjson.com/products/${productData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: updatedProdData.title,
          price: updatedProdData.price,
          description: updatedProdData.description,
          category: updatedProdData.category,
          stock: updatedProdData.stock,
        }),
      });

      const resData = await res.json();

      if (resData) {
        dispatch(
          updateDashboardProductList(
            allProducts.products.map((prod) => {
              if (prod.id !== productData.id) return prod;

              const updatedData = { ...prod };
              const prodKeys = Object.keys(resData);
              prodKeys.forEach((key) => {
                updatedData[key] = resData[key];
              });

              return updatedData;
            })
          )
        );
      }
    } catch (error) {
      console.error("Failed to update product, err: ", error);
    } finally {
      setIsUpdating(false);
      setOpenEditModal(false);
    }
  };

  return (
    <>
      <div className="admin-item-card">
        <div className="card-image-container">
          <img src={images?.[0] || "https://via.placeholder.com/150"} alt={title} className="card-image" />
        </div>

        <div className="card-details">
          <h3 className="card-title">{title}</h3>
          <div className="card-meta">
            <span className="card-brand">{brand}</span>
            <span className="card-category">{category}</span>
          </div>

          <div className="card-stats">
            <div className="stat-item">
              <span className="stat-label">Price:</span>
              <span className="stat-value">${price}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Rating:</span>
              <span className="stat-value">{rating}/5</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Stock:</span>
              <span className="stat-value">{stock} units</span>
            </div>
          </div>

          <p className="card-description">{description}</p>
        </div>

        <div className="card-actions">
          <button onClick={() => setOpenEditModal(true)} className="action-btn edit-btn">
            Edit Product
          </button>
          <button onClick={() => setOpenDeleteModal(true)} className="action-btn delete-btn">
            Delete Product
          </button>
        </div>
      </div>

      <EditProductModal
        isOpen={openEditModal}
        onClose={() => setOpenEditModal(false)}
        onSave={updateHandler}
        product={productData}
        cancelBtnText="Cancel"
        saveBtnText="Update"
        title="Edit Product"
        cancelBtnDisabled={isUpdating}
        confirmBtnDisabled={isUpdating}
      />

      <ConfirmationModal
        onConfirmClick={deleteHandler}
        cancelBtnDisabled={isDeleting}
        confirmBtnDisabled={isDeleting}
        confirmBtnText={"Delete"}
        confirmBtnType={"danger"}
        isOpen={openDeleteModal}
        modalDescription={"Do you want to delete this Product?"}
        modalTitle={"Delete Product"}
        onCancelClick={() => setOpenDeleteModal(false)}
      />
    </>
  );
};

export default AdminItemCard;
