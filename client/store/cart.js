import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSingleProduct } from './singleProduct';
import axios from 'axios';

const TOKEN = 'token';

export const fetchCart = createAsyncThunk(
	'/cart/fetch',
	async () => {
	const token = window.localStorage.getItem(TOKEN);

	if(token){
		const { data } = await axios.get(`/api/users/cart`, { headers: { authorization: token }});
		return data;
	} else {
		return JSON.parse(window.localStorage.products)
	}
});

export const addToCart = createAsyncThunk(
	'/cart/add',
	async (productId, { dispatch }) => {
	const token = window.localStorage.getItem(TOKEN);

	if(token){
		await axios.put(`/api/users/cart/add/${productId}`, { headers: { authorization: token }})
	} else {
		const { payload } = await dispatch(fetchSingleProduct(productId))
		return payload
	}
});

export const removeFromCart = createAsyncThunk(
	'/cart/remove',
	async (productId) => {
		const token = window.localStorage.getItem(TOKEN);

		if(token){
			await axios.put(`/api/users/cart/remove/${productId}`, { headers: { authorization: token }});
		} else {
			let localArray = JSON.parse(window.localStorage.products)
			localArray = localArray.filter(product => product.id !== productId)
			window.localStorage.products = JSON.stringify(localArray)
		}
	}
);

export const removeAllFromCart = createAsyncThunk(
	'/cart/remove/all',
	async (products) => {
		const token = window.localStorage.getItem(TOKEN);
		await axios.put(`/api/users/cart/remove/all`, { headers: { authorization: token }, products});
	}
);

export const addAllToCart = createAsyncThunk(
	'/cart/add/all',
	async (products) => {
		const token = window.localStorage.getItem(TOKEN);
		await axios.put(`/api/users/cart/add/all`, { headers: { authorization: token }, products});
	}
);

export const updateProductQty = createAsyncThunk(
	'/cart/update',
	async ({ productId, qty }, { dispatch }) => {
		const token = window.localStorage.getItem(TOKEN);

		if(token){
		await axios.put(`/api/users/cart/${productId}/update`, { headers: { authorization: token }, qty});
		} else {
			const localArray = JSON.parse(window.localStorage.products)
			const newArray = localArray.map(product => product.id == productId ? {...product, cart:{qty}} : product)
			window.localStorage.products = JSON.stringify(newArray)
			dispatch(fetchCart())
		}
	}
);


export const fetchCheckout = createAsyncThunk('/cart/checkout', async () => {
	const token = window.localStorage.getItem(TOKEN);
	await axios.put(`/api/users/cart/checkout`, {
		headers: { authorization: token },
	});
});

export const compareCarts = createAsyncThunk(
	'/cart/compare',
	async (user, {dispatch}) => {
		const localArray = JSON.parse(window.localStorage.products)
		window.localStorage.products = JSON.stringify([])
		await dispatch(removeAllFromCart(user.products))
		await dispatch(addAllToCart(localArray))
		await dispatch(fetchCart())
	}
)

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
		})
		builder.addCase(addToCart.fulfilled, (state, action) => {
			if(action.payload){
				const idArray = []
				const localArray = JSON.parse(window.localStorage.products)
				for(let i = 0; i < localArray.length; i++){
					idArray.push(localArray[i].id)
				}

				if(!idArray.includes(action.payload.id)){
					localArray.push({...action.payload, cart: {qty: 1}})
					window.localStorage.products = JSON.stringify(localArray)
				}
			}
		})
	},
});

export default cartSlice.reducer;
