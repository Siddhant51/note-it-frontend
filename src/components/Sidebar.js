import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BASE_URL = "https://noteit-9f0j.onrender.com";
// const BASE_URL = "http://localhost:3001";

const Sidebar = ({
  token,
  noteTypes,
  totalNotesCount,
  noteCount,
  theme,
  loading,
}) => {
  const { type } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    noteCount();
  }, [token]);

  return (
    <>
      {loading ? (
        // Display loading placeholders if loading is true
        <div className={`sidebar loading-${theme}`}>
          {Array.from({ length: 6 }).map((_, index) => (
            <div className="button" key={index}></div>
          ))}
        </div>
      ) : (
        // Render sidebar when loading is false
        <div className={`sidebar ${loading ? `loading-${theme}` : ""}`}>
          <div
            className={type ? `button Transparent Default` : `button Default`}
            onClick={() => navigate("/", { replace: true })}
          >
            <p>All Notes</p> <p>({totalNotesCount})</p>
          </div>
          {noteTypes.map((category) => (
            <div
              className={
                type && type === category._id
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
      )}
    </>
  );
};

export default Sidebar;
