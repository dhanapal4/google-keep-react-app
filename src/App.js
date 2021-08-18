import "./App.css";
import TakeNote from "./Components/Body/TakeNote";
import Headers from "./Components/Headers/Headers";
import AddNote from "./Components/Body/AddNote";
import { useCallback, useEffect, useReducer, useState } from "react";
import ShowNotes from "./Components/Body/ShowNotes";
import ThemeContextProvider from "./Contexts/ThemeContext";
import AuthContextProvider from "./Contexts/AuthContext";
import { Alert } from "react-bootstrap";
import useHttp from "./Components/CustomHooks/use-http";

const ACTIONS = {
  SHOW: "show",
  HIDE: "hide",
  ADD: "add",
  FILTER: "filter",
  FETCH: "fetch",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SHOW:
      return { ...state, show: true, notes: [...state.notes] };
    case ACTIONS.HIDE:
      return { ...state, show: false, notes: [...state.notes] };
    case ACTIONS.ADD:
      return {
        notes: [...state.notes, action.payload.note],
        filteredNotes: [...state.notes, action.payload.note],
      };
    case ACTIONS.FILTER:
      return {
        notes: [...state.notes],
        filteredNotes: [...action.payload.filteredNotes],
      };
    case ACTIONS.FETCH:
      return {
        notes: [...state.notes, action.payload.notes],
        filteredNotes: [...state.filteredNotes, action.payload.notes],
      };
    default:
      return state;
  }
};

function App() {

  
  const [visibleAlert, setVisibleAlert]=useState(false);

  const [state, dispatchFn] = useReducer(reducer, {
    show: false,
    addNote: false,
    notes: [],
    filteredNotes: [],
  });

  const openTakeNote = () => {
    dispatchFn({ type: "show" });
  };
  const closeTakeNote = () => {
    dispatchFn({ type: "hide" });
  };

  const addNoteFBHandler = async (note) => {
    console.log(note)
    const response = await fetch(
      "https://notes-auth-development-default-rtdb.firebaseio.com/notes.json",
      {
        mode: "no-cors",
        method: "POST",
        body: JSON.stringify(note),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setVisibleAlert(true);
  };

  useEffect(()=>{
    window.setTimeout(()=>{setVisibleAlert(false)},2000);
  },[visibleAlert]);

  const [notes, setNotes] = useState([]);

  const {isLoading,error,fetchNotesFBHandler}=useHttp();
  
 useEffect(()=>{
  const responseData=(data)=>{
   const notesFromFirebase = [];
     for (const key in data) {
       notesFromFirebase.push({
         id: key,
         title: data[key].title,
         body: data[key].body,
         timestamp: data[key].timestamp,
         priority: data[key].priority,
       });
     }
     console.log(notesFromFirebase);
 
     setNotes(notesFromFirebase);
  }
  const configData={
    url:"https://notes-auth-development-default-rtdb.firebaseio.com/notes.json",
  }
  fetchNotesFBHandler(configData,responseData.bind(null)); 
 },[fetchNotesFBHandler]);



  const filteredDataHandler = (data) => {
    if (data.length !== 0) {
      dispatchFn({ type: "filter", payload: { filteredNotes: data } });
      // console.log(`Filtered Data received - ${data[0].title}`);
    } else {
      dispatchFn({ type: "filter", payload: { filteredNotes: [] } });
      // console.log("No results found");
    }
  };

  return (
    <div style={{ backgroundColor: "rgb(32, 32, 32)" }}>
      <AuthContextProvider>
        <ThemeContextProvider>
          <Headers data={state.notes} filteredData={filteredDataHandler} />
          {visibleAlert&&<Alert variant="success">Note added successfully.!</Alert>}
          {!state.show && <TakeNote onClick={openTakeNote} />}
          {state.show && (
            <AddNote onClick={closeTakeNote} onAdd={addNoteFBHandler} />
          )}
          <ShowNotes notes={notes} isLoading={isLoading} error={error}/>
        </ThemeContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
