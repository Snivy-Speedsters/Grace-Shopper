import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleProduct } from '../store/singleProduct';
import { addToCart, fetchCart } from '../store/cart';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import { Card, CardMedia, CardContent, Grid, Typography, CardActionArea, Box, Chip, Button } from "@mui/material";

const SingleProduct = props => {
	const { productId } = props.match.params
	const product = useSelector((state) => state.singleProduct)
	const { imageUrl, name, price, tags } = product

	const dispatch = useDispatch()
	const history = useHistory()

	useEffect(() => {
		dispatch(fetchSingleProduct(productId))
	}, [])

	const handleAdd = () => {
		dispatch(addToCart(productId))
		.then(() => {dispatch(fetchCart())})
		.then(() => {history.push('/products')})
	}
	console.log(tags)

	return(
		<Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>
			<Grid item xs={3}>
				<Card variant="outlined" sx={{maxWidth: 400}}>
					<CardMedia component='img' height='400' image={imageUrl} alt={name} />
					<CardContent>
						<Typography gutterBottom variant='h5' component='div'>{name}</Typography>
						<Typography gutterBottom variant="body2" color="text.secondary">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							Sed eget tempor nulla. Cras tristique molestie aliquet.
						</Typography>
						<Typography gutterBottom variant='h5' component='div'>${price}</Typography>
					</CardContent>
					<Box display='flex' sx={{mb:1}}>
						<Button variant="contained" onClick={handleAdd}>Add To Cart</Button>
						<Button variant="contained" onClick={() => {history.push('/products')}}>Back To All</Button>
					</Box>
					<Box display='flex' sx={{mb:1}}>
          {tags.length === 0 ? <></> :
            tags.map(tag => <Chip key={tag.name} label={tag.name} variant="outlined" />)
          }
        </Box>
				</Card>
			</Grid>
		</Grid>
	)
}

export default SingleProduct;

{/* <div>
{ product.id === productId ? <h3>No Product Found</h3> : (
	<>
		<h1>Buddy</h1>
		<img src={imageUrl} />
		<p>Name: {name}</p>
		<p>Price: ${price}</p>
		<button onClick={() => {handleAdd()}}>Add to Cart</button>
		<Link to={'/products'}>
			<button>View All Buddies</button>
		</Link>
	</>
)}
</div> */}
