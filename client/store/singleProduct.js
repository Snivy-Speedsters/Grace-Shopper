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

export default function productReducer(state = {}, action) {
	switch (action.type) {
		case SET_SINGLE_PRODUCT:
			return action.product;
		default:
			return state;
	}
}
