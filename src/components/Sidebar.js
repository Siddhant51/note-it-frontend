import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:3001";

const Sidebar = ({ token }) => {
  const navigate = useNavigate();

  const [noteTypes, setNoteTypes] = useState([]);
  const [totalNotesCount, setTotalNotesCount] = useState(0);

  useEffect(() => {
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
  }, [token]);

  return (
    <div>
      <div onClick={() => navigate("/", { replace: true })}>
        All Notes ({totalNotesCount})
      </div>
      {noteTypes.map((type) => (
        <div onClick={() => navigate(`/notes/${type._id}`, { replace: true })}>
          {type._id} ({type.count})
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
