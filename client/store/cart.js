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

export const fetchCartProducts = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/cart/${id}`);
      dispatch(setProducts(data));
    } catch (error) {
      console.log("fetchCart Error", error);
    }
  };
};

/*
 Reducer
 */

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.product;
    default:
      return state;
  }
}
