import React from "react";
import { FaPlus } from "react-icons/fa";
import { BsFillSunFill } from "react-icons/bs";
import { BiSolidMoon } from "react-icons/bi";

const Topbar = ({ openCreateModal, setToken, theme, setTheme }) => {
  return (
    <div className="topbar">
      <div className="title">NoteIt</div>
      <div className="buttons">
        <FaPlus
          onClick={openCreateModal}
          className={theme == "Dark" ? `btn-light` : `btn-dark`}
        />
        {theme == "Dark" ? (
          <BsFillSunFill
            className="btn-light"
            onClick={() => {
              setTheme("Light");
              localStorage.setItem("theme", "Light");
            }}
          />
        ) : (
          <BiSolidMoon
            className="btn-dark"
            onClick={() => {
              setTheme("Dark");
              localStorage.setItem("theme", "Dark");
            }}
          />
        )}
        <div
          onClick={() => {
            setToken();
            localStorage.removeItem("token");
            localStorage.removeItem("theme");
          }}
          className="logout-button"
        >
          Logout
        </div>
      </div>
    </div>
  );
};

export default Topbar;
