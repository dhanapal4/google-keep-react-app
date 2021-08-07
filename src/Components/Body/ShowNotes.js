
import Card from '../UI/Card';

const ShowNotes=(props)=>{
    return(
        <Card>
        {props.notes.map((note)=><h2 key={note.id}>{note.title}</h2>)}
        </Card>
    );
}

export default ShowNotes;