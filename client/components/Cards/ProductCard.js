import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Box,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addToCart, fetchCart } from "../../store/cart";

export const ProductCard = (props) => {
  const { imageUrl, name, price, id } = props.product;

  const dispatch = useDispatch();
  const history = useHistory();

  const handleAdd = () => {
    dispatch(addToCart(id))
      .then(() => {
        dispatch(fetchCart());
      })
      .then(() => {
        history.push("/products");
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
              <Button onClick={handleAdd} className="button">
                Add to Cart
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default ProductCard;
