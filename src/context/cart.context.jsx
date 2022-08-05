import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
  //find if cartitems contains product to add
  const existingCartItem = cartItems.find(
    (item) => item.id === productToAdd.id
  );
  //if found, increment quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  //return new array with motified cartItems or new cart items
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRemove) => {
  const existingCartItem = cartItems.find(
    (item) => item.id === productToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
  } else if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  }
  return [...cartItems, { ...productToRemove, quantity: 1 }];
};

const deleteCartItem = (cartItems, productToDelete) => {
  return cartItems.filter((cartItem) => cartItem.id !== productToDelete.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  setCartItems: () => {},
  totalItems: 0,
  setTotalItems: () => {},
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  deleteItemFromCart: () => {},
  setProductTotal: () => {},
  cartsTotal: null,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState();
  const [cartsTotal, setCartsTotal] = useState(null);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };

  const deleteItemFromCart = (productToDelete) => {
    setCartItems(deleteCartItem(cartItems, productToDelete));
  };

  useEffect(() => {
    const handleCartTotal = () => {
      let i = 0;
      const quantities = cartItems.map((cartItem) => cartItem.quantity);
      const totalQuantity = quantities.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        i
      );
      return setTotalItems((prev) => (prev = totalQuantity));
    };

    handleCartTotal();
  }, [cartItems]);

  useEffect(() => {
    const handleProductPriceTotal = () => {
      const cartTotal = cartItems.reduce(
        (total, cartItem) => total + cartItem.quantity * cartItem.price,
        0
      );

      return setCartsTotal((prev) => (prev = cartTotal));
    };
    handleProductPriceTotal();
  }, [cartItems]);
  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    totalItems,
    cartsTotal,
    removeItemFromCart,
    deleteItemFromCart,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
