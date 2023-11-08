import React, { useState, useEffect } from "react";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import Create from "../components/Create";
import Update from "../components/Update";
import ReactModal from "react-modal";
import axios from "axios";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const BASE_URL = "http://localhost:3001";

const colors = {
  note: "red",
  task: "blue",
};

const Home = ({ token, setToken }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { type } = useParams();

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

  const fetchNotes = async () => {
    axios
      .get(`${BASE_URL}/notes`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setNotes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchNotes();
  }, [token]);

  // Filter notes based on the 'type' parameter
  const filteredNotes = type
    ? notes.filter((note) => note.type === type)
    : notes;

  return (
    <>
      <Topbar openCreateModal={openCreateModal} />
      <Sidebar token={token} />
      {filteredNotes.map((note) => (
        <div
          key={note._id}
          onClick={() => openUpdateModal(note._id)}
          style={{ backgroundColor: colors[note.type] || "gray" }}
        >
          <strong>{note.title}</strong>
          <p>{note.content}</p>
        </div>
      ))}
      <ReactModal
        isOpen={isCreateModalOpen || isUpdateModalOpen}
        onRequestClose={isUpdateModalOpen ? closeUpdateModal : closeCreateModal}
        contentLabel="Create or Update Note"
      >
        {isCreateModalOpen ? (
          <Create
            token={token}
            closeModal={closeCreateModal}
            fetchNotes={fetchNotes}
          />
        ) : isUpdateModalOpen ? (
          <Update
            token={token}
            noteId={selectedNote}
            closeModal={closeUpdateModal}
            fetchNotes={fetchNotes}
          />
        ) : null}
      </ReactModal>
    </>
  );
};

export default Home;
