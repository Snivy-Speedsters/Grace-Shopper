import axios from "axios";

let initialState = [];

/*
 Action Type
 */

const SET_PRODUCTS = "SET_PRODUCTS";

/*
 Action Creator
 */
const setProducts = (product) => ({
  type: SET_PRODUCTS,
  product,
});

/*
 Thunks
 */

export const fetchCartProducts = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/${userId}/cart`);
      dispatch(setProducts(data));
    } catch (error) {
      console.log("fetchCart Error", error);
    }
  };
};

export const updateCartProduct = (userId, productId, action) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/users/${userId}/cart/${productId}`, {action});
      dispatch(setProducts(data));
    } catch (error) {
      console.log("fetchCart Error", error);
    }
  };
};

/*
 Reducer
 */

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.product;
    default:
      return state;
  }
}
