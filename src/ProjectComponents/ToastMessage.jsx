import React from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

const ToastMessage = () => {
  return (
    <div>
      <ToastContainer position="top-end" className="p-3">
        <Toast bg="warning" delay={4000} autohide>
          <Toast.Body>"Toast Message"</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default ToastMessage;
