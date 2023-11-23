import React, { useState, useEffect } from "react";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import Create from "../components/Create";
import Update from "../components/Update";
import ReactModal from "react-modal";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment/moment";

const BASE_URL = "https://noteit-api-b5ly.onrender.com";
// const BASE_URL = "http://localhost:3001";

const Home = ({ token, setToken }) => {
  const { type } = useParams();

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "Dark");

  const [notes, setNotes] = useState([]);

  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  const [selectedNote, setSelectedNote] = useState(null);
  const [modalType, setModalType] = useState("");

  const [loading, setLoading] = useState(true);

  const openCreateModal = () => {
    setCreateModalOpen(true);
    setModalType("Other");
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

  const [noteTypes, setNoteTypes] = useState([]);
  const [totalNotesCount, setTotalNotesCount] = useState(0);

  const noteCount = () => {
    axios
      .get(`${BASE_URL}/note-count`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setNoteTypes(res.data);

        // Calculate total notes count by summing up the counts of all types
        const total = res.data.reduce((total, type) => total + type.count, 0);
        setTotalNotesCount(total);
      })
      .catch((err) => {
        console.log(err);
      });
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
      })
      .finally(() => {
        setLoading(false);
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
    <div className={`home ${theme}`}>
      <Topbar
        setToken={setToken}
        openCreateModal={openCreateModal}
        setTheme={setTheme}
        theme={theme}
      />
      <div class="container">
        <Sidebar
          token={token}
          noteTypes={noteTypes}
          totalNotesCount={totalNotesCount}
          noteCount={noteCount}
          theme={theme}
          loading={loading}
        />
        <main>
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
                <div className={`note loading-${theme}`} key={index}></div>
              ))
            : filteredNotes.map((note) => {
                const formattedUpdatedAt = moment(note.updatedAt);
                const relativeTime = formattedUpdatedAt.fromNow();

                return (
                  <div
                    className={`note ${note.type}`}
                    key={note._id}
                    onClick={() => {
                      openUpdateModal(note._id);
                      setModalType(note.type);
                    }}
                  >
                    <div className="front">
                      <div className="top-right">
                        <p>{note.type}</p>
                      </div>
                      <div className="center">
                        <p>{note.title}</p>
                      </div>
                      <div className="bottom-left">
                        <p>{relativeTime}</p>
                      </div>
                    </div>
                    <div className="back">
                      <p>{note.content.slice(0, 70)}</p>
                    </div>
                  </div>
                );
              })}
        </main>
      </div>
      <ReactModal
        isOpen={isCreateModalOpen || isUpdateModalOpen}
        onRequestClose={isUpdateModalOpen ? closeUpdateModal : closeCreateModal}
        contentLabel="Create or Update Note"
        className={`Modal ${modalType}`}
        style={{
          overlay: {
            backdropFilter: "blur(3px)",
            backgroundColor:
              theme === "Dark"
                ? "rgba(0, 0, 0, 0.5)"
                : "rgba(255, 255, 255, 0.5)",
          },
        }}
      >
        {isCreateModalOpen ? (
          <Create
            token={token}
            closeModal={closeCreateModal}
            fetchNotes={fetchNotes}
            setModalType={setModalType}
            noteCount={noteCount}
            theme={theme}
          />
        ) : isUpdateModalOpen ? (
          <Update
            token={token}
            noteId={selectedNote}
            closeModal={closeUpdateModal}
            fetchNotes={fetchNotes}
            setModalType={setModalType}
            noteCount={noteCount}
            theme={theme}
          />
        ) : null}
      </ReactModal>
    </div>
  );
};

export default Home;
