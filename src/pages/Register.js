import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../components/BaseUrl";

// const BASE_URL = "https://noteit-api-b5ly.onrender.com";
// const BASE_URL = "http://localhost:3001";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    theme: "light",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`${BASE_URL}/register`, formData)
      .then((res) => {
        console.log(res);
        toast.success("User Registered Successfully.");
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 2000);
        setFormData({
          username: "",
          email: "",
          password: "",
          theme: "light",
        });
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 400) {
          toast.error("User with this email already exists.");
        } else {
          toast.error("An error occurred. Please try again.");
        }
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="header">NoteIt</div>
      <div className="body">
        <form className="outer" onSubmit={handleSubmit}>
          <div className="title">Register</div>
          <input
            type="text"
            placeholder="Userame"
            value={formData.username}
            required
            onChange={(event) =>
              setFormData({ ...formData, username: event.target.value })
            }
          />
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
          <Link to="/login" className="link">
            Already have an account.
          </Link>
        </form>
      </div>
    </>
  );
};

export default Register;
