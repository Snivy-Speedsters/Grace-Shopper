import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ProductCheckoutCard from "./Cards/ProductCheckoutCard";
import MakePayment from "./Checkout/makePayment";
import { Container, Stack, Item, Button, Typography } from "@mui/material";

export const Cart = () => {
  const cart = useSelector((state) => state.cart.products);
  const loggedIn = useSelector((state) => state.auth.id);

  const history = useHistory();

  const renderCart = (cart) => {
    if(cart.length === 0){
      return (<Typography variant="h4" textAlign="center">Nothing in cart</Typography>)
    } else {
      return cart.map(product => <ProductCheckoutCard key={product.id} product={product}/>)
    }
  }

  return (
    <Container>
      <Stack spacing={2} sx={{mt: 1, mb: 1}}>
        {renderCart(cart)}
      </Stack>


      {loggedIn ?
      <></> : <Button onClick={() => {history.push("/login");}}>Login to Checkout</Button>}
      {loggedIn && cart.length !== 0 ? <MakePayment /> : <></>}

    </Container>
  );
};

export default Cart;
