import { useState } from "react";
import Card from "../UI/Card";
import classes from "./ShowNotes.module.css";
import UpdateNote from "./UpdateNote";

const ShowNotes = (props) => {
  const [isOpen, setIsOpen] = useState(false);
const onCloseHandler=()=>{
  setIsOpen(false);
}


  return (
    <div className={classes.bkg}>
      {props.notes.map((note) => (
        <Card key={note.id}>
          {isOpen && <UpdateNote note={note} onClose={onCloseHandler}/>}

          <div className={classes.note} onClick={() => setIsOpen(true)}>
            <h3>{note.title}</h3>
            <h6>{note.body}</h6>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ShowNotes;
