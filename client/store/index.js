/*

import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import products from "./products";
import product from "./singleProduct";
import cart from "./cart";
import allUsers from "./allUsers";

const reducer = combineReducers({
  products,
  product,
  auth,
  cart,
  allUsers
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";

*/

import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth'
import cartReducer from './cart'
import productsReducer from './products'

export default configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    products: productsReducer
  },
})
