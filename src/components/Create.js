import axios from "axios";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

const BASE_URL = "https://noteit-api-b5ly.onrender.com";
// const BASE_URL = "http://localhost:3001";

const Create = ({
  token,
  closeModal,
  fetchNotes,
  setModalType,
  noteCount,
  theme,
}) => {
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
        closeModal();
        noteCount();
        fetchNotes();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form className="inner" onSubmit={handleSubmit}>
      <div className={theme == "Dark" ? "light-input" : "dark-input"}>
        <select
          className={
            theme == "Dark"
              ? "light-borders Transparent"
              : "dark-borders Transparent"
          }
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
          className={
            theme == "Dark"
              ? "light-borders Transparent"
              : "dark-borders Transparent"
          }
          type="text"
          placeholder="Title"
          value={formData.title}
          required
          onChange={(event) =>
            setFormData({ ...formData, title: event.target.value })
          }
        />
        <textarea
          className={
            theme == "Dark"
              ? "light-borders Transparent"
              : "dark-borders Transparent"
          }
          type="text"
          placeholder="Content"
          value={formData.content}
          required
          onChange={(event) =>
            setFormData({ ...formData, content: event.target.value })
          }
        />
      </div>
      <div className="buttons">
        <FaPlus
          className={theme == "Dark" ? `btn-light` : `btn-dark`}
          onClick={handleSubmit}
        />
      </div>
    </form>
  );
};

export default Create;
