import axios from "axios";
import React, { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Create from "../components/Create";
import Update from "../components/Update";
import ReactModal from "react-modal";

const BASE_URL = "http://localhost:3001";

const colors = {
  note: "red",
  task: "blue",
};

const Home = ({ token, setToken }) => {
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const openCreateModal = () => {
    setCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setCreateModalOpen(false);
  };

  const openUpdateModal = (noteId) => {
    setSelectedNote(noteId);
    setUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setSelectedNote(null);
    setUpdateModalOpen(false);
  };

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
  }, [closeCreateModal, closeUpdateModal]);

  return (
    <>
      <Topbar />
      <Sidebar />
      {notes?.map((note) => (
        <div
          key={note._id}
          onClick={() => openUpdateModal(note._id)}
          style={{ backgroundColor: colors[note.type] || "gray" }}
        >
          <strong>{note.title}</strong>
          <p>{note.content}</p>
        </div>
      ))}
      <button onClick={openCreateModal}>Create</button>
      <ReactModal
        isOpen={isCreateModalOpen || isUpdateModalOpen}
        onRequestClose={isUpdateModalOpen ? closeUpdateModal : closeCreateModal}
        contentLabel="Create or Update Note"
      >
        {isCreateModalOpen ? (
          <Create token={token} closeModal={closeCreateModal} />
        ) : isUpdateModalOpen ? (
          <Update
            token={token}
            noteId={selectedNote}
            closeModal={closeUpdateModal}
          />
        ) : null}
      </ReactModal>
    </>
  );
};

export default Home;
