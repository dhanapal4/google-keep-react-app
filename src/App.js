import './App.css';
import TakeNote from './Components/Body/TakeNote';
import Headers from './Components/Headers/Headers';
import AddNote from './Components/Body/AddNote';
import {useState} from 'react';
import ShowNotes from './Components/Body/ShowNotes';



function App() {
  const [notes,setNotes]=useState([
  {
    id:1,
    title:'ReactJS Bootstrap',
    body:'Planning to complete ReactJS with full effort by doing multiple projects at a time.',
    timestamp:Date(Date.now()),
    priority:1
  }
]);
  const [takeNote, setTakeNote] = useState(false);


  const openTakeNote=()=>{
    setTakeNote(true);
  }
  const closeTakeNote=()=>{
    setTakeNote(false);
  }
  const addNoteHandler=(note)=>{
    setNotes(prevNotes=>{return [...prevNotes,note]});
  }
  
  return (
    <>
    <Headers />
    {!takeNote && <TakeNote onClick={openTakeNote}/>}
    {takeNote && <AddNote onClick={closeTakeNote} onAdd={addNoteHandler}/>}
    <ShowNotes notes={notes}/>
    </>
  );
}

export default App;
