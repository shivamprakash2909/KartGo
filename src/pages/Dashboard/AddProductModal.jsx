import { useState } from "react";
import "./AddProductModal.css"; // external CSS for styling
import { useSelector } from "react-redux";
const AddProductModal = ({
  isOpen,
  onClose,
  onSave,
  cancelBtnText = "Cancel",
  saveBtnText = "Add",
  title = "Add Product",
  cancelBtnDisabled = false,
  confirmBtnDisabled = false,
}) => {
  const { dashboardItemsPerCategory } = useSelector((state) => state.dashboard);

  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    imageFile: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct({ ...product, imageFile: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("category", product.category);
    formData.append("stock", product.stock);
    formData.append("images", product.imageFile);

    onSave(formData);

    setProduct({
      title: "",
      price: "",
      description: "",
      category: "",
      stock: "",
      imageFile: null,
    });
    setPreview(null);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>{title}</h2>
        <form onSubmit={handleSubmit} className="product-form" encType="multipart/form-data">
          <input type="text" name="title" placeholder="Title" value={product.title} onChange={handleChange} required />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={product.description}
            onChange={handleChange}
            required
          />
          <select id="category" name="category" value={product.category} onChange={handleChange} required>
            <option value="">Select a category</option>

            {dashboardItemsPerCategory.categoryData.map((cat) => (
              <option key={`edit-prod-cat-${cat.slug}`} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={product.stock}
            onChange={handleChange}
            required
          />
          <input type="file" name="imageFile" accept="image/*" onChange={handleImageChange} required />
          {preview && <img src={preview} alt="Preview" style={{ width: "100px", marginTop: "10px" }} />}
          <div className="modal-buttons">
            <button type="submit" className="add-btn" disabled={confirmBtnDisabled}>
              {saveBtnText}
            </button>
            <button type="button" onClick={onClose} className="cancel-btn" disabled={cancelBtnDisabled}>
              {cancelBtnText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
