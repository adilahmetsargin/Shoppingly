import React from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import { removeProduct, clearAll } from "../features/products/productsSlice";
import ProductItem from "./ProductItem";


const ProductList: React.FC = () => {
  const products = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  return (
    <section className="product-list">
      <div className="list-header">
        <h3>Items ({products.length})</h3>
        <div>
          <button className="btn-ghost" onClick={() => dispatch(clearAll())}>
            Clear All
          </button>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="empty">
          Your list is empty. Add something to get started ✨
        </div>
      ) : (
        <div className="grid">
          {products.map((p) => (
            <ProductItem
              key={p.id}
              product={p}
              onRemove={() => dispatch(removeProduct(p.id))}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductList;
