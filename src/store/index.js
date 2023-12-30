import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = { login: false };

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    toggleLogin(state) {
      state.login = !state.login;
    },
  },
});

// cart state

const intitalCartState = {
  totalQuantity: 0,
  // itemQuantity: 0,
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: intitalCartState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          category: newItem.category,
          description: newItem.description,
          image: newItem.image,
          itemQuantity: 1,
        });
        state.totalPrice += newItem.price;
        state.totalPrice = Math.round(state.totalPrice)
        state.totalQuantity++;
      } else {
        state.totalPrice += existingItem.price;
        state.totalPrice = Math.round(state.totalPrice)
        state.totalQuantity++;
        existingItem.itemQuantity++;
      }
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      console.log(existingItem);
      if (existingItem.itemQuantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.itemQuantity--;
      }
      state.totalQuantity--;
      state.totalPrice = state.totalPrice - existingItem.price;
      state.totalPrice = Math.round(state.totalPrice)
    },
  },
});

const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export const loginActions = loginSlice.actions;
export const cartActions = cartSlice.actions;
export default store;
