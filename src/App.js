import "./App.css";
import TakeNote from "./Components/Body/TakeNote";
import Headers from "./Components/Headers/Headers";
import AddNote from "./Components/Body/AddNote";
import { useReducer } from "react";
import ShowNotes from "./Components/Body/ShowNotes";
import ThemeContextProvider from "./Contexts/ThemeContext";
import AuthContextProvider from "./Contexts/AuthContext";

const ACTIONS = {
  SHOW: "show",
  HIDE: "hide",
  ADD: "add",
  FILTER:"filter"
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SHOW:
      return { ...state,show: true, notes: [...state.notes] };
    case ACTIONS.HIDE:
      return { ...state, show: false, notes: [...state.notes] };
    case ACTIONS.ADD:
      return { notes: [...state.notes, action.payload.note],filteredNotes: [...state.notes, action.payload.note]};
    case ACTIONS.FILTER:
      return {notes:[...state.notes],filteredNotes:[...action.payload.filteredNotes]};
    default:
      return state;
  }
};

function App() {
  const [state, dispatchFn] = useReducer(reducer, {
    show: false,
    addNote: false,
    notes: [
      {
        id: 1,
        title: "ReactJS - Web",
        body: "Planning to complete ReactJS with full effort by doing multiple projects at a time.",
        timestamp: Date(Date.now()),
        priority: 1,
      },
    ],
    filteredNotes:[{
      id: 1,
      title: "ReactJS - Web",
      body: "Planning to complete ReactJS with full effort by doing multiple projects at a time.",
      timestamp: Date(Date.now()),
      priority: 1,
    },]
  });

  const openTakeNote = () => {
    dispatchFn({ type: "show" });
  };
  const closeTakeNote = () => {
    dispatchFn({ type: "hide" });
  };
  const addNoteHandler = (note) => {
    dispatchFn({ type: "add", payload: { note: note } });
  };

  const filteredDataHandler = (data) => {
    if (data.length !== 0) {
      dispatchFn({type:"filter",payload:{filteredNotes:data}});
      // console.log(`Filtered Data received - ${data[0].title}`);
    } else {
      dispatchFn({type:"filter",payload:{filteredNotes:[]}});
      // console.log("No results found");
    }
  };

  return (
    <div style={{backgroundColor:"rgb(32, 32, 32)"}}>
    <AuthContextProvider>
      <ThemeContextProvider>
        <Headers data={state.notes} filteredData={filteredDataHandler} />
        {!state.show && <TakeNote onClick={openTakeNote} />}
        {state.show && (
          <AddNote onClick={closeTakeNote} onAdd={addNoteHandler} />
        )}
        <ShowNotes notes={state["filteredNotes"]} />
      </ThemeContextProvider>
    </AuthContextProvider>
    </div>
  );
}

export default App;
