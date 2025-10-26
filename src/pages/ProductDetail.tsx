import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks";

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const product = useAppSelector((s) => s.products.find((p) => p.id === id));
  const navigate = useNavigate();

  if (!product) return <div className="empty">Product not found</div>;

  return (
    <div className="product-detail">
      <button className="btn-ghost" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <div className="detail-card">
        <div className="img-wrap">
          {product.image ? (
            <img src={product.image} alt={product.name} />
          ) : (
            <div className="placeholder">No Image</div>
          )}
        </div>
        <h2>{product.name}</h2>
        <p>Quantity: {product.qty}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
