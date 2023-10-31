import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:3001";

const Login = ({ setToken }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`${BASE_URL}/login`, formData)
      .then((res) => {
        console.log(res);
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        required
        onChange={(event) =>
          setFormData({ ...formData, email: event.target.value })
        }
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        required
        onChange={(event) =>
          setFormData({ ...formData, password: event.target.value })
        }
      />
      <button type="submit">Submit</button>
      <Link to="/register">Create a new account.</Link>
    </form>
  );
};

export default Login;
