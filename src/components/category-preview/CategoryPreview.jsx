import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../product-card/ProductCard";

import "./category-preview.styles.scss";

const CategoryPreview = ({ title, products }) => {
  return (
    <div className="category-preview-container">
      <h2>
        <Link to={title} className="title">
          {title.toUpperCase()}
        </Link>
      </h2>

      <div className="preview">
        {products
          .filter((blah, index) => 4 > index)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default CategoryPreview;
