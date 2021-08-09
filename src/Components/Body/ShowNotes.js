import { useState } from "react";
import Card from "../UI/Card";
import classes from "./ShowNotes.module.css";
import UpdateNote from "./UpdateNote";

const ShowNotes = (props) => {
  const [viewNote, setViewNote] = useState({
    open: false,
    note: {},
  });
  const onOpenHandler = (note) => {
    console.log(`${note.title}`);
    setViewNote({ open: true, note:note });
  };
  const onCloseHandler = () => {
    setViewNote({ open: false, note: {} });
  };

  return (
    <div className={classes.bkg}>
      {props.notes.map((note) => (
          <Card key={note.id}>
            <div key={note.id}
              className={classes.note}
              onClick={onOpenHandler.bind( null,note)}
            >
              <h3>{note.title}</h3>
              <h6>{note.body}</h6>
            </div>
          </Card>
      ))}
      <UpdateNote viewNote={viewNote} onClose={onCloseHandler}>
        {/* <h3>Hey</h3> */}
      </UpdateNote>
    </div>
  );
};

export default ShowNotes;
