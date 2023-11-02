import axios from "axios";
import React, { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const BASE_URL = "http://localhost:3001";

const colors = {
  note: "red",
  task: "blue",
};

const Home = ({ token, setToken }) => {
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);

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

  return (
    <>
      <Topbar />
      <Sidebar />
      {notes?.map((note) => (
        <div
          key={note._id}
          onClick={() => navigate(`/update/${note._id}`)}
          style={{ backgroundColor: colors[note.type] || "gray" }}
        >
          <strong>{note.title}</strong>
          <p>{note.content}</p>
        </div>
      ))}
      <button onClick={() => navigate("/create")}>Create</button>
    </>
  );
};

export default Home;
