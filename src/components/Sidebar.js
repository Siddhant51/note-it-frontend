import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BASE_URL = "http://localhost:3001";

const Sidebar = ({ token, noteTypes, totalNotesCount, noteCount }) => {
  const { type } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    noteCount();
  }, [token]);

  return (
    <div className="sidebar">
      <div
        className={type ? `button Transparent Default` : `button Default`}
        onClick={() => navigate("/", { replace: true })}
      >
        <p>All Notes</p> <p>({totalNotesCount})</p>
      </div>
      {noteTypes.map((category) => (
        <div
          className={
            type && type == category._id
              ? `button ${type}`
              : `button Transparent ${category._id}`
          }
          onClick={() =>
            navigate(`/notes/${category._id}`, {
              replace: true,
            })
          }
        >
          <p>{category._id}</p> <p>({category.count})</p>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
