import axios from "axios";
import { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import { useNavigate, useParams } from "react-router-dom";

const BASE_URL = "http://localhost:3001";

const colors = {
  note: "red",
  task: "blue",
};

const Update = ({ token }) => {
  const navigate = useNavigate();

  const { noteId } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "",
  });

  useEffect(() => {
    axios
      .get(`${BASE_URL}/note/${noteId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        const noteData = res.data;
        setFormData({
          title: noteData.title,
          content: noteData.content,
          type: noteData.type,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [noteId, token]);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .put(
        `${BASE_URL}/update/${noteId}`,
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
        console.log("Note Updated...");
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      axios
        .delete(`${BASE_URL}/delete/${noteId}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          console.log("Note Deleted...");
          navigate("/", { replace: true });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <Topbar />
      <Sidebar />
      <form onSubmit={handleSubmit}>
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
        <button onClick={handleDelete}>Delete</button>
        <button type="submit">Save</button>
      </form>
    </>
  );
};

export default Update;
