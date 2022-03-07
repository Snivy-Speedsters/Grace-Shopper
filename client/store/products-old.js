import axios from "axios";

const initialState = [];

//action constants

const SET_PRODUCTS = "SET_PRODUCTS";

//action creators

export const setProducts = (product) => {
  return {
    type: SET_PRODUCTS,
    product,
  };
};
//thunk creators
export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/products");
      dispatch(setProducts(data));
    } catch (err) {
      console.log(err);
    }
  };
};

//reducer

export default function productsReducer(products = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.product;

    default:
      return products;
  }
}
