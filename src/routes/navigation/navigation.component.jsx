import React, { useContext } from "react";
import { signOutUser } from "../../utils/firebase/firebase";
import { Outlet, useNavigate } from "react-router-dom";

import CartIcon from "../../components/cart-icon/CartIcon";
import CartDowndown from "../../components/cart-dropdown/CartDowndown";

import { ReactComponent as Crown } from "../../assets/crown.svg";

import { UserContext } from "../../context/user.context";
import { CartContext } from "../../context/cart.context";

import {
  NavigationContainer,
  LogoContainer,
  NavLinksContainer,
  NavLink,
} from "./navigation.styles.jsx";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);
  const navigate = useNavigate();
  const logOut = async () => {
    try {
      await signOutUser();
      navigate("/auth");
    } catch (error) {}
  };
  return (
    <>
      <NavigationContainer>
        <LogoContainer to="/">
          <Crown className="logo" />
        </LogoContainer>
        <NavLinksContainer>
          <NavLink to="/shop">Shop</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={logOut}>
              Sign Out
            </NavLink>
          ) : (
            <NavLink to="/auth">Sign In</NavLink>
          )}
          <CartIcon />
        </NavLinksContainer>
        {isCartOpen && <CartDowndown />}
      </NavigationContainer>
      <Outlet />
    </>
  );
};

export default Navigation;
