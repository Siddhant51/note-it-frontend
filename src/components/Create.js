import axios from "axios";
import { useState } from "react";

const BASE_URL = "http://localhost:3001";

const Create = ({ token, closeModal, fetchNotes, setModalType }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "Other",
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
        fetchNotes();
        closeModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <select
          value={formData.type}
          onChange={(event) => {
            setFormData({ ...formData, type: event.target.value });
            setModalType(event.target.value || "");
          }}
        >
          <option value="Other">Select type</option>
          <option value="Study">Study</option>
          <option value="Personal">Personal</option>
          <option value="Fitness">Fitness</option>
          <option value="Finance">Finance</option>
        </select>
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          required
          onChange={(event) =>
            setFormData({ ...formData, title: event.target.value })
          }
        />
        <input
          type="text"
          placeholder="Content"
          value={formData.content}
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
