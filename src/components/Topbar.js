import React from "react";

const Topbar = ({ openCreateModal }) => {
  return (
    <div className="topbar">
      <p>Your App Title</p>
      <button onClick={openCreateModal} className="create-button">
        Create
      </button>
    </div>
  );
};

export default Topbar;
