import axios from "axios";
import React, { useEffect, useState } from "react";
import CreateModal from "../components/CreateModal";
const history = window.history;

const BASE_URL = "http://localhost:3001";

const Home = ({ token, setToken }) => {
  const [notes, setNotes] = useState({});
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
        setNotes(res.data.notes);
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
    history.goBack();
  };

  return (
    <div>
      <button onClick={openModal}>Create New Item</button>
      <CreateModal isOpen={isOpen} onClose={closeModal} />
      Home
    </div>
  );
};

export default Home;
