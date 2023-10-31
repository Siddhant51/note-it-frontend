import axios from "axios";
import React, { useEffect, useState } from "react";
import CreateModal from "../components/CreateModal";
import { useNavigate } from "react-router-dom";
const history = window.history;

const BASE_URL = "http://localhost:3001";

const Home = ({ token, setToken }) => {
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/notes`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res);
        setNotes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const openModal = () => {
    setIsOpen(true);
    history.pushState({}, null, "/create");
  };

  const closeModal = () => {
    setIsOpen(false);
    navigate(-1);
  };

  return (
    <div>
      {notes?.map((note) => (
        <div key={note.id}>
          {note.title}
          {note.content}
        </div>
      ))}
      <button onClick={openModal}>Create New Item</button>
      <CreateModal isOpen={isOpen} onClose={closeModal} token={token} />
      Home
    </div>
  );
};

export default Home;
