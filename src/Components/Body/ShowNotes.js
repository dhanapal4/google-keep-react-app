import Card from "../UI/Card";
import classes from "./ShowNotes.module.css";

const ShowNotes = (props) => {
  return (
    <div className={classes.bkg}>
      {props.notes.map((note) => (
        <Card key={note.id}>
          <div>
            <h3>{note.title}</h3>
            <h6>{note.body}</h6>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ShowNotes;
