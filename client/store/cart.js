import axios from 'axios';

let initialState = [];

/*
 Action Type
 */

const SET_PRODUCTS = 'SET_PRODUCTS';
const UPDATE_CART = 'UPDATE_CART';

/*
 Action Creator
 */
const setProducts = (product) => ({
	type: SET_PRODUCTS,
	product,
});

const updateCart = (product) => {
	return {
		type: UPDATE_CART,
		product,
	};
};

/*
 Thunks
 */

export const fetchCartProducts = () => {
	return async (dispatch) => {
		try {
			const token = window.localStorage.getItem('token')
			const { data } = await axios.get(`/api/users/cart`, {headers: { 'authorization': token }})
			dispatch(setProducts(data));
		} catch (error) {
			console.log('fetchCart Error', error);
		}
	};
};

export const addCartProduct = (productId) => {
	return async (dispatch) => {
		try {
			const token = window.localStorage.getItem('token')
			const { data } = await axios.put(`/api/users/cart/add/${productId}`, {headers: { 'authorization': token }})
			dispatch(updateCart(data))
		} catch (error) {
			console.log('addCart Error', error);
		}
	}
}

export const removeCartProduct = (productId) => {
	return async (dispatch) => {
		try {
			const token = window.localStorage.getItem('token')
			const { data } = await axios.put(`/api/users/cart/remove/${productId}`, {headers: { 'authorization': token }})
			dispatch(updateCart(data))
		} catch (error) {
			console.log('removeCart Error', error)
		}
	}
}

export const fetchCheckout = () => {
  return async (dispatch) => {
    try {
			const token = window.localStorage.getItem('token')
      const { data } = await axios.put(`/api/users/cart/checkout`, {headers: { 'authorization': token }});
      dispatch(setProducts(data));
    } catch (error) {
      console.log("checkout Error", error);
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
		case UPDATE_CART:
			return state.map((product) => {
				return product.id === action.product.id ? action.product : product;
			});
		default:
			return state;
	}
}
