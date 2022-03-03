import axios from 'axios';

const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT';

const setSingleProduct = (product) => ({
	type: SET_SINGLE_PRODUCT,
	product,
});

export const fetchSingleProduct = (id) => async (dispatch) => {
	const { data } = await axios.get(`/api/products/${id}`);
	dispatch(setSingleProduct(data));
};

export const updateSingleProduct = (id, changes) => async (dispatch) => {
	const token = window.localStorage.getItem('token')
	const { data } = await axios.put(`/api/admin/products/${id}`, { changes, headers: { 'authorization': token }});
	dispatch(setSingleProduct(data));
};

export const deleteSingleProduct = (id) => async (dispatch) => {
	const token = window.localStorage.getItem('token')
	const { data } = await axios.delete(`/api/admin/products/${id}`, { headers: { 'authorization': token }});
	dispatch(setSingleProduct(data));
};

export default function productReducer(state = {}, action) {
	switch (action.type) {
		case SET_SINGLE_PRODUCT:
			return action.product;
		default:
			return state;
	}
}
