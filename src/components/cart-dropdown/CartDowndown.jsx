import React, { useContext } from "react";
import Button from "../button/Button";
import CartItem from "../cart-item/CartItem";

import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/cart.context";

import {
  CartDowndownContainer,
  EmptyMessage,
  CartItemMap,
} from "./cart-dropdown.styles.jsx";

const CartDowndown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate("/checkout");
  };
  return (
    <CartDowndownContainer>
      <CartItemMap>
        {!cartItems.length ? (
          <EmptyMessage>There are no items in your cart</EmptyMessage>
        ) : (
          <>
            {cartItems.map((item) => (
              <CartItem key={item.id} cartItem={item} />
            ))}
          </>
        )}
      </CartItemMap>
      <Button onClick={goToCheckoutHandler}>CHECKOUT</Button>
    </CartDowndownContainer>
  );
};

export default CartDowndown;
