import { createContext, useEffect, useReducer } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

const initialState = {
  CartItems: [],
};

const init=()=>{
  try{
        const stored=localStorage.getItem("cartItems")
        return stored 
        ? {CartItems:JSON.parse(stored)}
        :initialState;
  }
  catch(error){
    console.log(error)
    return initialState;
  }
}

const CartReducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case "Add_To_Cart": {
      const isExist = state.CartItems.find((item) => {
        return item._id === action.payload._id;
      });
      if (isExist) {
        const updatedCart = state.CartItems.map((item) => {
          if (item._id === action.payload._id) {
            return { ...item, qty: item.qty + 1 };
          } else {
            return item;
          }
        });
        return { ...state, CartItems: updatedCart };
      } else {
        const newCartItems = { ...action.payload, qty: 1 };
        const updatedCartItems = [...state.CartItems, newCartItems];
        return {
          ...state,
          CartItems: updatedCartItems,
        };
      }
    }

    case "Increment": {
      const updatedCart = state.CartItems.map((item) => {
        if (item._id === action.payload._id) {
          return { ...item, qty: item.qty + 1 };
        } else {
          return item;
        }
      });
      return { ...state, CartItems: updatedCart };
    }
    case "Decrement": {
      const updatedCart = state.CartItems.map((item) => {
        if (item._id === action.payload._id && item.qty > 1) {
          return { ...item, qty: item.qty - 1 };
        } else {
          return item;
        }
      });
      return { ...state, CartItems: updatedCart };
    }

    case "Delete": {
      const filteredItems = state.CartItems.filter((item) => {
        if (item._id !== action.payload._id) return item;
      });
      return { ...state, CartItems: filteredItems };
    }
    case "Clear_Cart": {
      return { ...state, CartItems: [] };
    }
    default: {
      return state;
    }
  }
};
export const CartProvider = ({ children }) => {
  const [cartState, cartDispatch] = useReducer(CartReducer, initialState,init);
  useEffect(()=>{
      localStorage.setItem("cartItems",JSON.stringify(cartState.CartItems))
  },[cartState.CartItems]);
  return (
    <CartContext.Provider value={{ cartState, cartDispatch }}>
      {children}
    </CartContext.Provider>
  );
};
