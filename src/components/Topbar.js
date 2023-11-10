import React from "react";

const Topbar = ({ openCreateModal, setToken, colors }) => {
  return (
    <div className="topbar" style={{ backgroundColor: colors["Theme"] }}>
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
