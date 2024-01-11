import axios from "axios";
import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "react-top-loading-bar";
import { BASE_URL } from "../components/BaseUrl";

const Login = ({ setToken }) => {
  const navigate = useNavigate();
  const loadingBar = useRef(null);

  const [formData, setFormData] = useState({
    email: "sid@gmail.com",
    password: "123456",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Show the loading bar
      loadingBar.current.continuousStart();

      const res = await axios.post(`${BASE_URL}/login`, formData);

      // Hide the loading bar
      loadingBar.current.complete();

      console.log(res);
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("theme", "Dark");
      toast.success("Login successful!");
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 4000);
    } catch (err) {
      // Hide the loading bar on error
      loadingBar.current.complete();

      console.log(err);
      toast.error("Invalid credentials. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer />
      <LoadingBar color="#f11946" ref={loadingBar} />
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
