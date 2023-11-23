import axios from "axios";
import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { TiTick } from "react-icons/ti";

const BASE_URL = "https://noteit-api-b5ly.onrender.com";
// const BASE_URL = "http://localhost:3001";

const Update = ({
  token,
  noteId,
  closeModal,
  fetchNotes,
  setModalType,
  noteCount,
  theme,
}) => {
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
        closeModal();
        noteCount();
        fetchNotes();
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
          closeModal();
          noteCount();
          fetchNotes();
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
        <MdDeleteForever
          className={theme == "Dark" ? `btn-light` : `btn-dark`}
          onClick={handleDelete}
        />
        <TiTick
          className={theme == "Dark" ? `btn-light` : `btn-dark`}
          onClick={handleSubmit}
        />
      </div>
    </form>
  );
};

export default Update;
