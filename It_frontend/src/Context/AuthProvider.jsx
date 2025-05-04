import { createContext, useEffect, useReducer, useState } from "react";
import { jwtDecode } from 'jwt-decode';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

const getToken = () => {
  const token = localStorage.getItem("token") || null;
  if (!token) {
    return { token: null };
  }
  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;

    if (decoded.exp && decoded.exp < now) {
      localStorage.removeItem("token");
      return { token: null };
    }
    return {
      token: token,
    };
  } catch (err) {
    console.log(err);
    localStorage.removeItem("token");
    return { token: null };
  }
};

const initialState = getToken();
// action={type:"Login",payload:{token:"ajdsbfjabejbcbmnbdmbsajdbf"}}
// action={type:"Logout"}
const reducer = (state, action) => {
  switch (action.type) {
    case "Login": {
      localStorage.setItem("token", action.payload.token);
      return { ...state, token: action.payload.token };
    }
    case "Logout": {
      localStorage.removeItem("token");
      return { ...state, token: null };
    }
    default: {
      return state;
    }
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [user, setUser] = useState(null);
  // console.log(state.token);

  const getUserData = async () => {
    let showUser = await fetch("http://localhost:9000/api/getSingleUser", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
    });
    showUser = await showUser.json();
    setUser(showUser.response);
  };
  useEffect(() => {
    if (state.token) {
      getUserData();
    }
  }, [state.token]);

  useEffect(() => {
    if (state.token) {
      try {
        const decoded = jwtDecode(state.token);
        const now = Date.now() / 1000; //converting into seconds from milliseconds Date.now() gives value in milliseconds by default
        const expiry = decoded.exp; // but this give value in seconds by default
        const timeout = (expiry - now) * 1000; //converting into milliseconds from seconds

        const timer = setTimeout(() => {
          dispatch({ type: "Logout" });
        }, timeout);
        return () => clearTimeout(timer);
      } catch (err) {
        console.log("Error while decoding token", err);
      }
    }
  }, [state.token]);

  return (
    <AuthContext.Provider value={{ state, dispatch,user }}>
      {children}
    </AuthContext.Provider>
  );
};
