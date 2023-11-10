import React, { useState, useEffect } from "react";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import Create from "../components/Create";
import Update from "../components/Update";
import ReactModal from "react-modal";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles.css";

const BASE_URL = "http://localhost:3001";

// const colors = {
//   Personal: "#f43f5e",
//   Study: "#3b82f6",
//   Other: "#22c55e",
//   Fitness: "#ffcc29",
//   Finance: "#8b45f7",
//   Background: "#212121",
//   Theme: "#212121",
//   Font: "#ffffff",
// };
const colors = {
  Personal: "#f43f5e",
  Study: "#3b82f6",
  Other: "#22c55e",
  Fitness: "#ffcc29",
  Finance: "#8b45f7",
  Background: "#e8e8e8",
  Theme: "#e8e8e8",
  Font: "black",
};

const Home = ({ token, setToken }) => {
  const { type } = useParams();

  const [notes, setNotes] = useState([]);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [modalType, setModalType] = useState("");

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
    <div
      className="home"
      style={{ backgroundColor: colors["Background"], color: colors["Font"] }}
    >
      <Topbar
        setToken={setToken}
        openCreateModal={openCreateModal}
        colors={colors}
      />
      <div class="container">
        <Sidebar token={token} colors={colors} />
        <main>
          {filteredNotes.map((note) => (
            <div
              className="note"
              key={note._id}
              onClick={() => {
                openUpdateModal(note._id);
                setModalType(note.type);
              }}
              style={{ backgroundColor: colors[note.type] }}
            >
              <strong>{note.title}</strong>
              <p>{note.content}</p>
            </div>
          ))}
        </main>
      </div>
      <ReactModal
        isOpen={isCreateModalOpen || isUpdateModalOpen}
        onRequestClose={isUpdateModalOpen ? closeUpdateModal : closeCreateModal}
        contentLabel="Create or Update Note"
        className="Modal"
        style={{
          content: {
            backgroundColor: colors[modalType],
          },
        }}
      >
        {isCreateModalOpen ? (
          <Create
            token={token}
            closeModal={closeCreateModal}
            fetchNotes={fetchNotes}
            setModalType={setModalType}
          />
        ) : isUpdateModalOpen ? (
          <Update
            token={token}
            noteId={selectedNote}
            closeModal={closeUpdateModal}
            fetchNotes={fetchNotes}
            setModalType={setModalType}
          />
        ) : null}
      </ReactModal>
    </div>
  );
};

export default Home;
