import React, { useContext } from "react";
import { CartContext } from "../../context/cart.context";

import {
  ItemCount,
  CartIconContainer,
  ShoppingIcon,
} from "./cart-icon.styles.jsx";

const CartIcon = () => {
  const { setIsCartOpen, totalItems } = useContext(CartContext);

  return (
    <CartIconContainer onClick={() => setIsCartOpen((prev) => !prev)}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{totalItems}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
