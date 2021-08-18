import "./App.css";
import TakeNote from "./Components/Body/TakeNote";
import Headers from "./Components/Headers/Headers";
import AddNote from "./Components/Body/AddNote";
import { useEffect, useReducer, useState } from "react";
import ShowNotes from "./Components/Body/ShowNotes";
import ThemeContextProvider from "./Contexts/ThemeContext";
import AuthContextProvider from "./Contexts/AuthContext";
import { Alert } from "react-bootstrap";
import useHttp from "./Components/CustomHooks/use-http";

const ACTIONS = {
  SHOW: "show",
  HIDE: "hide",
  FILTER: "filter",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SHOW:
      return { ...state, show: true, notes: [...state.notes] };
    case ACTIONS.HIDE:
      return { ...state, show: false, notes: [...state.notes] };
    case ACTIONS.FILTER:
      return {
        notes: [...state.notes],
        filteredNotes: [...action.payload.filteredNotes],
      };
    default:
      return state;
  }
};

function App() {
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [notes, setNotes] = useState([]);
  const [filteredNotes,setFilteredNotes]=useState([]);

  const [state, dispatchFn] = useReducer(reducer, {
    show: false,
    notes: [],
    filteredNotes: [],
  });

  const openTakeNote = () => {
    dispatchFn({ type: "show" });
  };
  const closeTakeNote = () => {
    dispatchFn({ type: "hide" });
  };

  const addNoteFBHandler = (note) => {

    const responseData = (data) => {
      
    };
    const configData = {
      url: "https://notes-auth-development-default-rtdb.firebaseio.com/notes.json",
      mode: "no-cors",
      method: "POST",
      body: note,
      headers: {
        "Content-Type": "application/json",
      },
    };

    sendRequests(configData, responseData.bind(null),note);
    setVisibleAlert(true);
    setNotes(prevNotes=>prevNotes.concat(note))
    setFilteredNotes(prevNotes=>prevNotes.concat(note))
  };

  useEffect(() => {
    window.setTimeout(() => {
      setVisibleAlert(false);
    }, 2000);
  }, [visibleAlert]);


  const { isLoading, error, sendRequests } = useHttp();

  useEffect(() => {
    const responseData = (data) => {
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

      setNotes(notesFromFirebase);
      setFilteredNotes(notesFromFirebase);
    };
    const configData = {
      url: "https://notes-auth-development-default-rtdb.firebaseio.com/notes.json",
    };
    sendRequests(configData, responseData.bind(null));
  }, [sendRequests]);

  const filteredDataHandler = (data) => {
    if (data.length !== 0) {
      setFilteredNotes(data);
    } else {
      setFilteredNotes([])
      // setNotes([])
      // dispatchFn({ type: "filter", payload: { filteredNotes: [] } });
    }
  };

  return (
    <div style={{ backgroundColor: "rgb(32, 32, 32)" }}>
      <AuthContextProvider>
        <ThemeContextProvider>
          <Headers data={notes} filteredData={filteredDataHandler} />
          {visibleAlert && (
            <Alert variant="success">Note added successfully.!</Alert>
          )}
          {!state.show && <TakeNote onClick={openTakeNote} />}
          {state.show && (
            <AddNote onClick={closeTakeNote} onAdd={addNoteFBHandler} />
          )}
          <ShowNotes notes={filteredNotes} isLoading={isLoading} error={error} />
        </ThemeContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
