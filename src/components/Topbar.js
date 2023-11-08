import React from "react";

const Topbar = ({ openCreateModal, setToken }) => {
  return (
    <div className="topbar">
      <p>Your App Title</p>
      <button onClick={openCreateModal} className="create-button">
        Create
      </button>
      <button onClick={() => setToken()} className="create-button">
        Logout
      </button>
    </div>
  );
};

export default Topbar;
