import React from "react";
import classes from "./Modal.module.css";
import * as ReactDOM from "react-dom";

function Backdrop({onClose}) {
  return <div className={classes.backdrop} onClick={onClose}></div>;
}

function ModalOverlay(props) {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
}

function Modal({onClose, children}) {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={onClose}/>, document.getElementById("modal"))}
      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        document.getElementById("overlays")
      )}
    </React.Fragment>
  );
}

export default Modal;
