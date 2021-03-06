import React from "react";
import reactDom from "react-dom";
import classes from "./UpdateNote.module.css";

const UpdateNote = (props) => {
  const note = props.viewNote.note;
  if (!props.viewNote.open) {
    return null;
  }
  const noteDate=note.timestamp.split(" ");
  console.log(noteDate)
  const lastUpdateDate=noteDate[2]+noteDate[1]+", "+noteDate[3]+" "+noteDate[4];
  return reactDom.createPortal(
    <>
      <div className={classes.overlay} onClick={props.onClose}></div>
      <div className={classes.modal}>
        <h4>{note.title}</h4>
        <hr/>
        <h5>{note.body}</h5>

        <div className={classes.close}>
          <p onClick={props.onClose}>Close</p>
        </div>
        <h6>Last updated :{lastUpdateDate}</h6>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default UpdateNote;
