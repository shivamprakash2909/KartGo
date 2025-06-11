import React from "react";
import "./Itemcard.css";

const Itemcard = ({ title, description, price, rating, stock, brand, category, images = [], discountPercentage }) => {
  return (
    <div className="item-card">
      {/* Display first image if available, else fallback to thumbnail */}
      <img src={images[0]} alt={title} className="item-image" />

      <div className="item-content">
        <h3 className="item-title">{title}</h3>
        <p>
          <strong>Brand:</strong> {brand}
        </p>
        <p>
          <strong>Category:</strong> {category}
        </p>
        <p>
          <strong>Price:</strong> ${price}
          <span className="item-discount"> ({discountPercentage}% off)</span>
        </p>
        <p>
          <strong>Rating:</strong> {rating} ⭐
        </p>
        <p>
          <strong>Stock:</strong> {stock} units
        </p>
        <p className="item-description">{description}</p>
      </div>
    </div>
  );
};

export default Itemcard;
