import React from "react";
import { useHistory } from "react-router-dom";
import { updateProductQty, removeFromCart, fetchCart } from "../../store/cart";
import { useDispatch } from "react-redux";
import { Card, CardMedia, CardContent, Typography, CardActionArea, Box, Chip, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const ProductCheckoutCard = (props) => {
  const { imageUrl, name, price, id } = props.product;
  const { qty } = props.product.cart;

  const dispatch = useDispatch();
  const history = useHistory()

  const handleUpdate = (qty, productId) => {
    const updatedProduct = {
      qty,
      productId,
    };
    dispatch(updateProductQty(updatedProduct));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id)).then(() => {
      dispatch(fetchCart());
    });
  };

  return (
  <Card variant="outlined" sx={{maxWidth: 300}}>
    <CardActionArea onClick={() => {history.push(`/products/${id}`)}}>
      <CardMedia component='img' height='300' image={imageUrl} alt={name} />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>{name}</Typography>
        <Typography gutterBottom variant='h5' component='div'>${price}</Typography>
      </CardContent>
    </CardActionArea>
    <Box display='flex'>
      <FormControl fullWidth>
        <InputLabel id="ageLabel">Qty</InputLabel>
        <Select defaultValue={qty} labelId="qtyLabel" id="qtySelect" label="Qty" onChange={(event) => {handleUpdate(event.target.value, id)}}>
          <MenuItem value='1'>1</MenuItem>
          <MenuItem value='2'>2</MenuItem>
          <MenuItem value='3'>3</MenuItem>
          <MenuItem value='4'>4</MenuItem>
          <MenuItem value='5'>5</MenuItem>
          <MenuItem value='6'>6</MenuItem>
          <MenuItem value='7'>7</MenuItem>
        </Select>
      </FormControl>
      <Button onClick={() => {handleRemove(id)}}><DeleteIcon /></Button>
    </Box>
</Card>
  );
};

export default ProductCheckoutCard;
