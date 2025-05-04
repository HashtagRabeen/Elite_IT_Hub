import React, { useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
function Protected({ Comp }) {
  const navigate = useNavigate();
  const { state } = useContext(AuthContext);
  console.log(state.token);

  useEffect(() => {
    if (!state.token) {
      navigate("/login");
    }
  },[state,navigate]);//it works when value changes in state
  return <Comp />;
}

export default Protected;
