import React from "react";
import "./Banner.css";

const Banner = () => {
  const scrollToProducts = () => {
    const element = document.getElementById("itemList");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="slogan-banner" id="slogan-Banner">
      <div className="slogan-banner-background">
        <img
          src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          alt="Shopping experience"
        />
      </div>
      <div className="slogan-content">
        <h1 className="main-slogan">Elevate Your Shopping Experience</h1>
        <p className="supporting-text">Discover quality products at unbeatable prices</p>
        <button className="slogan-cta" onClick={scrollToProducts}>
          Browse Collection
        </button>
      </div>
    </div>
  );
};

export default Banner;
