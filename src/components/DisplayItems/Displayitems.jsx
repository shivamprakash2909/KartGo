import React, { useEffect, useState } from "react";
import "./DisplayItems.css";
import { createCookieSessionStorage } from "react-router-dom";
import Itemcard from "../Itemcard/Itemcard";
// import { useSelector } from "react-redux";

const Displayitems = ({ products }) => {
  console.log("products: ", products);
  // TODO: Add pagination (infinite scrolling)
  // const { productData } = useSelector((state) => state.product);

  return (
    <div className="display-items-list" id="itemList">
      {products.map((item) => {
        return (
          <Itemcard
            key={`product-list-${item.id}`}
            title={item.title}
            description={item.description}
            price={item.price}
            stock={item.stock}
            brand={item.brand}
            category={item.category}
            images={item.images}
            rating={item.rating}
            discountPercentage={item.discountPercentage}
          />
        );
      })}
    </div>
  );
};

export default Displayitems;
