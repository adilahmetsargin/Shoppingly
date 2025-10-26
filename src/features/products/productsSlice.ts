import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface Product {
  id: string;
  name: string;
  qty: number;
  image?: string; // data URL
}

const initialState: Product[] = [
  {
    id: uuidv4(),
    name: "Bananas",
    qty: 6,
    image: "https://picsum.photos/seed/banana/300/200",
  },
  {
    id: uuidv4(),
    name: "Milk",
    qty: 2,
    image: "https://picsum.photos/seed/milk/300/200",
  },
  {
    id: uuidv4(),
    name: "Bread",
    qty: 1,
    image: "https://picsum.photos/seed/bread/300/200",
  },
];

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Omit<Product, "id">>) {
      state.unshift({ id: uuidv4(), ...action.payload });
    },
    removeProduct(state, action: PayloadAction<string>) {
      return state.filter((p) => p.id !== action.payload);
    },
    updateProduct(state, action: PayloadAction<Product>) {
      const idx = state.findIndex((p) => p.id === action.payload.id);
      if (idx >= 0) state[idx] = action.payload;
    },
    clearAll() {
      return [];
    },
  },
});

export const { addProduct, removeProduct, updateProduct, clearAll } =
  productsSlice.actions;
export default productsSlice.reducer;
