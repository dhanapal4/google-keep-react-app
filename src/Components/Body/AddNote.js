import {useRef} from 'react';

const AddNote=(props)=>{

    const titleRef=useRef('Title.');
    const bodyRef=useRef('Take a note...');

    const onCloseHandler=()=>{
        props.onClick();
    }
    const onChangeHandler=(event)=>{
        titleRef.current.value=event.target.value;
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
    <input type="text" placeholder="Title" onChange={onChangeHandler} ref={titleRef}></input>
    <input type="text" placeholder="Take a note..." onChange={onChangeHandler} ref={bodyRef}></input>
    <button onClick={onAddNoteHandler}>Save</button>
    <button onClick={onCloseHandler}>Close</button>
    </div>);
}

export default AddNote;