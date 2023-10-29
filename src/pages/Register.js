import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    theme: "light",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    // Make a network request or update the local state
    // using the form data
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(event) =>
          setFormData({ ...formData, name: event.target.value })
        }
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(event) =>
          setFormData({ ...formData, email: event.target.value })
        }
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(event) =>
          setFormData({ ...formData, password: event.target.value })
        }
      />
      <button type="submit">Submit</button>
      <Link to="/login">
        <Navigate replace={true} />
        Create a new account.
      </Link>
    </form>
  );
};

export default Register;
