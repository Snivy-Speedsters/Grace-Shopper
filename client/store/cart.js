import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const TOKEN = 'token';

export const fetchCart = createAsyncThunk('/cart/fetch', async () => {
	const token = window.localStorage.getItem(TOKEN);
	const { data } = await axios.get(`/api/users/cart`, {
		headers: { authorization: token },
	});
	return data;
});

export const addToCart = createAsyncThunk('/cart/add', async (productId) => {
	const token = window.localStorage.getItem(TOKEN);
	await axios.put(`/api/users/cart/add/${productId}`, {
		headers: { authorization: token },
	});
});

export const removeFromCart = createAsyncThunk(
	'/cart/remove',
	async (productId) => {
		const token = window.localStorage.getItem(TOKEN);
		await axios.put(`/api/users/cart/remove/${productId}`, {
			headers: { authorization: token },
		});
		fetchCart();
	}
);

export const updateProductQty = createAsyncThunk(
	'/cart/update',
	async ({ productId, qty }) => {
		const token = window.localStorage.getItem(TOKEN);
		await axios.put(`/api/users/cart/${productId}/update`, {
			headers: { authorization: token },
			qty,
		});
	}
);


export const fetchCheckout = createAsyncThunk('/cart/checkout', async () => {
	const token = window.localStorage.getItem(TOKEN);
	await axios.put(`/api/users/cart/checkout`, {
		headers: { authorization: token },
	});
	fetchCart();
});

const initialState = {
	products: [],
	amount: 0,
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchCart.fulfilled, (state, action) => {
			const products = action.payload;
			const amount = action.payload.length;
			return { products, amount };
		});
	},
});

export default cartSlice.reducer;
