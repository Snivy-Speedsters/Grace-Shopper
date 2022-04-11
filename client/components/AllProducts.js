import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../store/products';
import { ProductCard } from './Cards/ProductCard';
import AllProductsFilter from './AllProductsFilter';
import { Container, Box, Grid } from '@mui/material';

export const AllProducts = () => {
	const products = useSelector((state) => state.products);
	const { tags, gender } = useSelector((state) => state.filter);
	const dispatch = useDispatch();

	// Executes when component first loads
	useEffect(() => {
		dispatch(fetchProducts());
	}, []);

	const checkTags = (product) => {
		for (let i = 0; i < product.tags.length; i++) {
			if (tags.includes(product.tags[i].name)) {
				return true;
			}
		}
		return false;
	};

	const filterProducts = (products) => {
		let filteredProducts = [];

		if (tags.length === 0) {
			products.map((product) => filteredProducts.push(product));
		} else {
			products.map((product) => {
				if (checkTags(product)) {
					filteredProducts.push(product);
				}
			});
		}

		if (gender !== '') {
			filteredProducts = filteredProducts.filter(
				(product) => product.gender === gender
			);
		}
		filteredProducts.sort((a, b) => {
			return a.id - b.id;
		});

		return filteredProducts.map((product) => (
			<Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
				<ProductCard product={product} />
			</Grid>
		));
	};

	return (
		<Container>
			<AllProductsFilter />
			{!products ? (
				<h3>No Products</h3>
			) : (
				<Grid container spacing={2}>
					{filterProducts(products)}
				</Grid>
			)}
		</Container>
	);
};

export default AllProducts;
