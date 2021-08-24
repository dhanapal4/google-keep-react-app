import { useEffect, useState } from "react";
import classes from "./AddNote.module.css";

const AddNote = (props) => {
  const [title,setTitle]=useState("");
  const [body,setBody]=useState("");
  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isBodyValid, setIsBodyValid] = useState(true);

  //Focusing on Input field at first renders - component.
//   useEffect(() => {
//   }, []);

  const onCloseHandler = () => {
    props.onClick();
  };
  const onTitleChangeHandler = (event) => {
    setTitle(event.target.value);
    if(title.trim()!=="" && body.trim()!=="" ){
      setIsTitleValid(true)
    }
  };
  const onBodyChangeHandler = (event) => {
    setBody(event.target.value);
    if(body.trim()!=="" && title.trim()!==""){
        setIsBodyValid(true)
    }
  };
  const onAddNoteHandler = () => {
    if (
      title.trim() === ""
    ) {
      setIsTitleValid(false);
      return;
    }
    if (
      body.trim() === ""
    ) {
      setIsBodyValid(false)
      return;
    }
    setIsTitleValid(true);
    setIsBodyValid(true)
    props.onAdd({
      id: Math.random(),
      title: title,
      body: body,
      timestamp: Date(Date.now()),
      priority: 1,
    });

    props.onClick();
  };

  const onClickHandler = (input) => {
    // if(input==="title"){
      setIsTitleValid(true);
      setIsBodyValid(true)
    // }
  };

  const onBlurHandler=()=>{
    //   if(titleRef.current.value.trim()==="" || bodyRef.current.value.trim()==="")
    //   {setIsValid(false);}
  }

  return (
    <div className={(isTitleValid&&isBodyValid) ? classes["addnote"] : classes["addnote-invalid"]}>
      <input
        type="text"
        placeholder="Title"
        onChange={onTitleChangeHandler}
        onClick={onClickHandler.bind(this, "title")}
        onBlur={onBlurHandler}
        value={title}
      ></input>
      {!isTitleValid && <p>Please enter title to proceed.</p>}
      <input
        type="text"
        placeholder="Take a note..."
        onChange={onBodyChangeHandler}
        onClick={onClickHandler.bind(this, "body")}
        onBlur={onBlurHandler}
        value={body}
      ></input>
      {!isBodyValid && <p>Please enter notes to proceed.</p>}
      <div className={classes.buttons}>
        <p onClick={onAddNoteHandler} className={classes.disabledButton} tooltip="save">Save</p>
        <p onClick={onCloseHandler}>Close</p>
      </div>
    </div>
  );
};

export default AddNote;
