import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:3001";

const Sidebar = ({ token, color }) => {
  const navigate = useNavigate();

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
  useEffect(() => {
    noteCount();
  }, [token]);

  return (
    <div className="sidebar">
      <div className="button" onClick={() => navigate("/", { replace: true })}>
        <p>All Notes</p> <p>({totalNotesCount})</p>
      </div>
      {noteTypes.map((type) => (
        <div
          className="button"
          onClick={() =>
            navigate(`/notes/${type._id}`, {
              replace: true,
            })
          }
        >
          <p>{type._id}</p> <p>({type.count})</p>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
