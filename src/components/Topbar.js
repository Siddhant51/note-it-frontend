import React from "react";

const Topbar = ({ openCreateModal, setToken, color }) => {
  return (
    <div className="topbar" style={{ backgroundColor: color }}>
      <div className="title">NoteIt</div>
      <div className="buttons">
        <div onClick={openCreateModal} className="create-button">
          Add New Note
        </div>
        <div onClick={() => setToken()} className="logout-button">
          Logout
        </div>
      </div>
    </div>
  );
};

export default Topbar;
