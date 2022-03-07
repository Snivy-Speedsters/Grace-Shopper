import axios from 'axios';

let initialState = [];

/*
 Action Type
 */

const SET_CART = 'SET_CART';
const UPDATE_CART = 'UPDATE_CART';

/*
 Action Creator
 */
const setCart = (product) => ({
	type: SET_CART,
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
			const token = window.localStorage.getItem('token');
			const { data } = await axios.get(`/api/users/cart`, {
				headers: { authorization: token },
			});
			console.log('here')
			dispatch(setCart(data));
		} catch (error) {
			console.log('fetchCart Error', error);
		}
	};
};

export const updateCartProducts = (qty, productId) => {
	return async (dispatch) => {
		try {
			const token = window.localStorage.getItem('token');
			await axios.put(`/api/users/cart/${productId}/update`, {
				headers: { authorization: token },
				qty,
			});
			fetchCartProducts();
		} catch (error) {
			console.log('UpdateCart Error', error);
		}
	};
};

export const addCartProduct = (productId) => {
	return async (dispatch) => {
		try {
			const token = window.localStorage.getItem('token');
			await axios.put(`/api/users/cart/add/${productId}`, {
				headers: { authorization: token },
			});
			fetchCartProducts()
		} catch (error) {
			console.log('addCart Error', error);
		}
	};
};

export const removeCartProduct = (productId) => {
	return async (dispatch) => {
		try {
			const token = window.localStorage.getItem('token');
			const { data } = await axios.put(`/api/users/cart/remove/${productId}`, {
				headers: { authorization: token },
			});
			dispatch(updateCart(data));
		} catch (error) {
			console.log('removeCart Error', error);
		}
	};
};

export const fetchCheckout = () => {
	return async (dispatch) => {
		try {
			const token = window.localStorage.getItem('token');
			const { data } = await axios.put(`/api/users/cart/checkout`, {
				headers: { authorization: token },
			});
			dispatch(setCart(data));
		} catch (error) {
			console.log('checkout Error', error);
		}
	};
};

/*
 Reducer
 */

export default function cartReducer(state = initialState, action) {
	switch (action.type) {
		case SET_CART:
			return action.product
		default:
			return state;
	}
}
