import React from "react";
import type { Product } from "../features/products/productsSlice";
import { useNavigate } from "react-router-dom";

const ProductItem: React.FC<{ product: Product; onRemove: () => void }> = ({
  product,
  onRemove,
}) => {
  const navigate = useNavigate();
  return (
    <article
      className="card hover-anim"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="img-wrap">
        {product.image ? (
          <img src={product.image} alt={product.name} />
        ) : (
          <div className="placeholder">No Image</div>
        )}
      </div>
      <div className="card-body">
        <div className="card-title">{product.name}</div>
        <div className="card-qty">Qty: {product.qty}</div>
        <button
          className="btn-danger"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          Delete
        </button>
      </div>
    </article>
  );
};

export default ProductItem;
