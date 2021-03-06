import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addTag } from '../../store/filter';
import {
	Card,
	CardMedia,
	CardContent,
	Typography,
	CardActionArea,
	Box,
	Chip,
	IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { addToCart, fetchCart } from '../../store/cart';

export const ProductCard = (props) => {
	const { imageUrl, name, id, tags, description } = props.product;

	const price = props.product.price.substring(
		0,
		props.product.price.length - 3
	);

	const dispatch = useDispatch();
	const history = useHistory();

	const handleAdd = () => {
		dispatch(addToCart(id)).then(() => {
			dispatch(fetchCart());
		});
	};

	return (
		<Card variant="outlined" sx={{ maxWidth: 300 }}>
			<CardActionArea
				onClick={() => {
					history.push(`/products/${id}`);
				}}
			>
				<CardMedia component="img" height="300" image={imageUrl} alt={name} />
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{name}
					</Typography>
					<Typography gutterBottom variant="body2" color="text.secondary">
						{description}
					</Typography>
					<Typography gutterBottom variant="h5" component="div">
						${price}
					</Typography>
				</CardContent>
			</CardActionArea>
			<IconButton
				onClick={() => {
					handleAdd();
				}}
			>
				<AddIcon />
			</IconButton>
			<Box display="flex">
				{tags.length === 0 ? (
					<></>
				) : (
					tags.map((tag) => (
						<Chip
							key={tag.name}
							label={tag.name}
							variant="outlined"
							onClick={() => {
								dispatch(addTag(tag.name));
							}}
						/>
					))
				)}
			</Box>
		</Card>
	);
};

export default ProductCard;
