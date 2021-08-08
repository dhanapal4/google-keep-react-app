import {useRef} from 'react';

const AddNote=(props)=>{

    const titleRef=useRef('Title.');
    const bodyRef=useRef('Take a note...');

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
    }
    return(
    <div>
    <input type="text" placeholder="Title" onChange={onTitleChangeHandler} ref={titleRef}></input>
    <input type="text" placeholder="Take a note..." onChange={onBodyChangeHandler} ref={bodyRef}></input>
    <button onClick={onAddNoteHandler}>Save</button>
    <button onClick={onCloseHandler}>Close</button>
    </div>);
}

export default AddNote;