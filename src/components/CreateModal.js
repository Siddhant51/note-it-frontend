import Modal from "react-modal";
import Create from "./Create";

const CreateModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          height: 400,
          backgroundColor: "white",
          borderRadius: 8,
        },
      }}
    >
      <h1>Create a new item</h1>
      <Create />
    </Modal>
  );
};

export default CreateModal;
