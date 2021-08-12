import './App.css';
import TakeNote from './Components/Body/TakeNote';
import Headers from './Components/Headers/Headers';
import AddNote from './Components/Body/AddNote';
import {useReducer} from 'react';
import ShowNotes from './Components/Body/ShowNotes';
import ThemeContextProvider from './Contexts/ThemeContext';
import AuthContextProvider from './Contexts/AuthContext';


const ACTIONS={
  SHOW:'show',
  HIDE:'hide',
  ADD:'add'
};

const reducer=(state,action)=>{
  switch(action.type){
    case ACTIONS.SHOW:
      return {show:true,notes:[...state.notes]};
    case ACTIONS.HIDE:
      return {show:false,notes:[...state.notes]};
      case ACTIONS.ADD:
        return {notes:[...state.notes,action.payload.note]};
    default:
      return state;

  }

}

function App() {


  const [state,dispatchFn]=useReducer(reducer,{show:false,addNote:false,notes:[
    {
      id:1,
      title:'ReactJS - Web',
      body:'Planning to complete ReactJS with full effort by doing multiple projects at a time.',
      timestamp:Date(Date.now()),
      priority:1
    }
  ]});



  const openTakeNote=()=>{
    dispatchFn({type:'show'});
  }
  const closeTakeNote=()=>{
    dispatchFn({type:'hide'});
  }
  const addNoteHandler=(note)=>{
    dispatchFn({type:'add',payload:{note:note}});

  }
  
  return (
    <AuthContextProvider>
    <ThemeContextProvider>
    <Headers />
    {!state.show && <TakeNote onClick={openTakeNote}/>}
    {state.show && <AddNote onClick={closeTakeNote} onAdd={addNoteHandler}/>}
    <ShowNotes notes={state['notes']} />
    </ThemeContextProvider>
    </AuthContextProvider>
  );
}

export default App;
