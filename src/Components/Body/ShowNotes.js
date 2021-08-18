import { useState } from "react";
import Card from "../UI/Card";
import classes from "./ShowNotes.module.css";
import UpdateNote from "./UpdateNote";

const ShowNotes = (props) => {
  let taskList = (
    <p style={{ color: "white" }}>No new notes yet! Add notes to shown here!</p>
  );

  const [viewNote, setViewNote] = useState({
    open: false,
    note: {},
  });
  const onOpenHandler = (note) => {
    console.log(`${note.title}`);
    setViewNote({ open: true, note: note });
  };
  const onCloseHandler = () => {
    setViewNote({ open: false, note: {} });
  };

  if (props.notes.length > 0) {
    taskList = (
      <>
        {props.notes.map((note) => (
          <Card key={note.id}>
            <div
              key={note.id}
              className={classes.note}
              onClick={onOpenHandler.bind(null, note)}
            >
              <h3>{note.title}</h3>
              <h6>{note.body}</h6>
            </div>
          </Card>
        ))}
      </>
    );
  }
  let content = taskList;

  if (props.error) {
    content = <p style={{ color: "white" }}>{props.error}</p>;
  }
  if (props.isLoading) {
    content = <p style={{ color: "white" }}>Loading...</p>;
  }

  return (
    <div className={classes.bkg}>
      {content}
      <UpdateNote viewNote={viewNote} onClose={onCloseHandler}/>
    </div>
  );
};

export default ShowNotes;
