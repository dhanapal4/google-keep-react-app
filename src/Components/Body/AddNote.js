import {useRef,useEffect} from 'react';
import classes from './AddNote.module.css';

const AddNote=(props)=>{

    const titleRef=useRef('Title.');
    const bodyRef=useRef('Take a note...');

    //Focusing on Input field at first renders - component.
    useEffect(()=>{
    titleRef.current.focus()
    },[]);

    const onCloseHandler=()=>{
        props.onClick();
    }
    const onTitleChangeHandler=(event)=>{
        titleRef.current.value=event.target.value;
    }
    const onBodyChangeHandler=(event)=>{
        bodyRef.current.value=event.target.value;
    }
    const onAddNoteHandler=()=>{
        props.onAdd({
            id:Math.random(),
            title:titleRef.current.value,
            body:bodyRef.current.value,
            timestamp:Date(Date.now()),
            priority:1
        });
        
        props.onClick();
    }
    return(
    <div className={classes.addnote}>
    <input type="text" placeholder="Title" onChange={onTitleChangeHandler} ref={titleRef}></input>
    <input type="text" placeholder="Take a note..." onChange={onBodyChangeHandler} ref={bodyRef}></input>
    <div className={classes.buttons}>
    <p onClick={onAddNoteHandler}>Save</p>
    <p onClick={onCloseHandler}>Close</p>
    </div>
    </div>);
}

export default AddNote;