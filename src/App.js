import './App.css';
import TakeNote from './Components/Body/TakeNote';
import Headers from './Components/Headers/Headers';
import AddNote from './Components/Body/AddNote';
import {useState,useReducer} from 'react';
import ShowNotes from './Components/Body/ShowNotes';


const ACTIONS={
  SHOW:'show',
  HIDE:'hide'
};

const reducer=(state,action)=>{
  switch(action.type){
    case ACTIONS.SHOW:
      return {show:true};
    case ACTIONS.HIDE:
      return {show:false};
    default:
      return state;

  }

}

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

  const [state,dispatchFn]=useReducer(reducer,{show:false});
  // const [takeNote, setTakeNote] = useState(false);


  const openTakeNote=()=>{
    // setTakeNote(true);
    dispatchFn({type:'show'});
  }
  const closeTakeNote=()=>{
    // setTakeNote(false);
    dispatchFn({type:'hide'});
  }
  const addNoteHandler=(note)=>{
    setNotes(prevNotes=>{return [...prevNotes,note]});
  }
  
  return (
    <>
    <Headers />
    {!state.show && <TakeNote onClick={openTakeNote}/>}
    {state.show && <AddNote onClick={closeTakeNote} onAdd={addNoteHandler}/>}
    <ShowNotes notes={notes}/>
    </>
  );
}

export default App;
