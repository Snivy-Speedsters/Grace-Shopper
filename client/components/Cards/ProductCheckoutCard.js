import React from "react";
import { Link } from "react-router-dom";
import { updateProductQty, removeFromCart, fetchCart } from "../../store/cart";
import { useDispatch } from "react-redux";
import {
  Card,
  Box,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia,
  Select,
  FormControl,
  InputLabel,
  MenuOption,
} from "@material-ui/core";

const ProductCheckoutCard = (props) => {
  const { imageUrl, name, price, id } = props.product;
  const { qty } = props.product.cart;

  const dispatch = useDispatch();

  const qtyDropdown = (amount) => {
    const outputArray = [];
    let i = 1;
    while (i <= amount) {
      outputArray.push(
        <option value={i} key={`p${id}-o${i}`}>
          {i}
        </option>
      );
      i = i + 1;
    }
    return outputArray;
  };

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
    <div>
      <Box boxShadow={3} spacing={3} style={{ padding: 10 }}>
        <Card
          className="mdc-card mdc-card--outlined product"
          variant="outlined"
          style={{ backgroundColor: "grey" }}
        >
          <CardMedia
            style={{ paddingTop: "5%" }}
            image={imageUrl}
            title="Background image"
            component="img"
          />

          <CardContent>
            <Link to={`/products/${id}`}>
              <Typography variant="h3" className="product-text">
                {name}
              </Typography>
              <Typography variant="h3" className="price-text">
                $ {price}
              </Typography>
            </Link>
            <CardActions>
              <Button
                onClick={() => {
                  handleRemove(id);
                }}
              >
                Remove
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </Box>

      {/* 
      <Link to={`/products/${id}`}>
        <img src={imageUrl} />
      </Link>

      <Link to={`/products/${id}`}>
      <h2>{name}</h2>
      </Link> */}

      <select
        defaultValue={qty}
        onChange={(event) => {
          handleUpdate(event.target.value, id);
        }}
      >
        {qtyDropdown(7)}
      </select>
    </div>
  );
};

export default ProductCheckoutCard;
