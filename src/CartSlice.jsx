import { createSlice } from "@reduxjs/toolkit";

// Create a Redux slice for managing cart state
export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Initialize cart items as an empty array
  },
  reducers: {
    // Add item to cart or increment quantity if already exists
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.name === item.name);
      if (existingItem) {
        // If item already exists, increase its quantity
        existingItem.quantity++;
      } else {
        // If new item, add it to cart with quantity 1
        state.items.push({ ...item, quantity: 1 });
      }
    },

    // Remove item completely from cart
    removeItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.name === item.name);
      if (existingItem) {
        // Remove the item from the cart array
        state.items = state.items.filter((i) => i.name !== item.name);
      }
    },

    // Update quantity of a specific item in cart
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find((i) => i.name === name);
      if (item) {
        // Update the item's quantity
        item.quantity = quantity;
        // If quantity reaches 0, remove the item from cart
        if (item.quantity === 0) {
          state.items = state.items.filter((i) => i.name !== name);
        }
      }
    },
  },
});

// Export action creators for use in components
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Export the reducer to be included in the store
export default CartSlice.reducer;
