import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const BASE_URL = "https://noteit-api-b5ly.onrender.com";
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
        navigate("/login", { replace: true });
        setFormData({
          username: "",
          email: "",
          password: "",
          theme: "light",
        });
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
