import axios from "axios";
import { useState } from "react";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:3001";

const colors = {
  note: "red",
  task: "blue",
};

const Create = ({ token }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    // Submit the form data with the color from the type-to-color mapping
    axios
      .post(
        `${BASE_URL}/create`,
        {
          ...formData,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        setFormData({
          title: "",
          content: "",
          type: "",
        });
        console.log("Note Created...");
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Topbar />
      <Sidebar />
      <form
        onSubmit={handleSubmit}
        style={{ backgroundColor: colors[formData.type] || "gray" }}
      >
        <select
          value={formData.type}
          onChange={(event) =>
            setFormData({ ...formData, type: event.target.value })
          }
        >
          <option value="">Select type</option>
          <option value="note">Note</option>
          <option value="task">Task</option>
        </select>
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          required
          style={{ backgroundColor: colors[formData.type] }}
          onChange={(event) =>
            setFormData({ ...formData, title: event.target.value })
          }
        />
        <input
          type="text"
          placeholder="Content"
          value={formData.content}
          style={{ backgroundColor: colors[formData.type] }}
          onChange={(event) =>
            setFormData({ ...formData, content: event.target.value })
          }
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Create;
