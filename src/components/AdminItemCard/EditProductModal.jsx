import React, { useState, useEffect } from "react";
import "./EditModal.css";
import { useSelector } from "react-redux";

const EditProductModal = ({
  isOpen,
  product,
  onClose,
  onSave,
  title = "Edit Product",
  saveBtnText = "Save Changes",
  cancelBtnText = "Cancel",
  cancelBtnDisabled,
  confirmBtnDisabled,
}) => {
  const { dashboardItemsPerCategory } = useSelector((state) => state.dashboard);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    stock: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || "",
        price: product.price || "",
        description: product.description || "",
        category: product.category || "",
        stock: product.stock || "",
      });
    }
  }, [product]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="title">Product Name</label>
              <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select id="category" name="category" value={formData.category} onChange={handleChange} required>
                <option value="">Select a category</option>

                {dashboardItemsPerCategory.categoryData.map((cat) => (
                  <option key={`edit-prod-cat-${cat.slug}`} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="stock">Stock Quantity</label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                required
              />
            </div>
          </div>
          <div className="modal-footer">
            <button disabled={cancelBtnDisabled} type="button" className="cancel-btn" onClick={onClose}>
              {cancelBtnText}
            </button>
            <button disabled={confirmBtnDisabled} type="submit" className="confirm-btn primary">
              {saveBtnText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
