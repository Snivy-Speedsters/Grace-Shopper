import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders } from '../store/orders';
import { Link } from 'react-router-dom';
import {
	Card,
	CardMedia,
	CardContent,
	Typography,
	CardActionArea,
	Box,
	Chip,
	IconButton,
	Container,
	Grid,
} from '@mui/material';
const OrderHistory = () => {
	const orders = useSelector((state) => state.orders);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchOrders());
	}, []);

	const allOrders = orders.map((order) => {
		return order.cart.map((product) => {
			console.log(product);
			return (
				<Card
					container
					spacing={2}
					className="collection-product avatar"
					style={{ marginRight: '2rem', marginBottom: '2rem' }}
					key={product.id}
				>
					<CardMedia
						component="img"
						height="300"
						image={product.imageUrl}
						className=""
					/>
					<CardContent>
						<Typography gutterBottom variant="h5" component="div">
							{product.name}
						</Typography>
						<Typography gutterBottom variant="body2" color="text.secondary">
							{product.description}
						</Typography>
						<Typography gutterBottom variant="h5" component="div">
							${product.price}
						</Typography>
					</CardContent>
				</Card>
			);
		});
	});

	return (
		<Container>
			<h1>You have ordered:</h1>
			<Grid container>{allOrders}</Grid>
		</Container>
	);
};

export default OrderHistory;
