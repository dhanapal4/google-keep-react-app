
import Card from '../UI/Card';

const ShowNotes=(props)=>{
    return(
        <Card>
            <h3>Notes:</h3>
        {props.notes.map((note)=><h2 key={note.id}>{note.title}</h2>)}
        </Card>
    );
}

export default ShowNotes;