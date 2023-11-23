import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const BASE_URL = "https://noteit-api-b5ly.onrender.com";
// const BASE_URL = "http://localhost:3001";

const Login = ({ setToken }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "sid@gmail.com",
    password: "123456",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`${BASE_URL}/login`, formData)
      .then((res) => {
        console.log(res);
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("theme", "Dark");
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="header">NoteIt</div>
      <div className="body">
        <form className="outer" onSubmit={handleSubmit}>
          <div className="title">Login</div>
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
          <button className="btn" type="submit">
            Submit
          </button>
          <Link to="/register" className="link">
            Create a new account.
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login;
