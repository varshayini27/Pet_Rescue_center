import React from 'react';
import Modal from 'react-modal';
import { IoMdLogOut } from "react-icons/io";
import BeatLoader from 'react-spinners/BeatLoader';

interface LogoutConfirmModalProps {
  onLogout: () => void;
  onClose: () => void;
  showModal: boolean;
  loading?: boolean;
}

const LogoutConfirmModal: React.FC<LogoutConfirmModalProps> = ({
  onLogout,
  onClose,
  showModal,
  loading,
}) => {
  return (
    <Modal
      isOpen={showModal}
      onRequestClose={onClose}
      contentLabel="Logout Confirmation"
      style={{
        overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1000 },
        content: {
          borderRadius: 12,
          width: "380px",
          height: "auto",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          transform: "translate(-50%, -50%)",
          padding: "24px",
          zIndex: 1050,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        },
      }}
    >
      {/* Icon */}
      <IoMdLogOut size={65} color="#d9534f" />

      {/* Title */}
      <div
        style={{
          fontSize: "22px",
          fontWeight: "bold",
          marginTop: "16px",
          color: "#084C11",
        }}
      >
        Confirm Logout
      </div>

      {/* Description */}
      <div
        style={{
          fontSize: "14px",
          color: "#555",
          marginTop: "8px",
          textAlign: "center",
        }}
      >
        Do you really want to log out? You’ll need to log in again to access
        your account.
      </div>

      {/* Buttons */}
      <div
        style={{
          marginTop: "24px",
          display: "flex",
          gap: "12px",
        }}
      >
        <button
          onClick={onClose}
          style={{
            padding: "8px 16px",
            borderRadius: "6px",
            border: "1px solid #226918",
            backgroundColor: "#fff",
            color: "#226918",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>

        <button
          onClick={onLogout}
          style={{
            padding: "8px 16px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#d9534f",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
            minWidth: "90px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {loading ? <BeatLoader color="#fff" size={8} /> : "Logout"}
        </button>
      </div>
    </Modal>
  );
};

export default LogoutConfirmModal;
