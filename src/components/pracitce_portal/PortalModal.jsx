import React from "react";
import { createPortal } from "react-dom";

const modalStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#fff",
  padding: "50px",
  zIndex: 1000,
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .7)",
};

const Modal = ({ open, onClosed, children }) => {
  if (!open) return null;
  return createPortal(
    <>
      <div style={overlayStyle} />
      <div style={modalStyle} onClick={() => console.log("자식 Portal Click")}>
        <button onClick={onClosed}>모달 닫기</button>
        {children}
      </div>
    </>,
    document.getElementById("portal"),
  );
};

export default Modal;
