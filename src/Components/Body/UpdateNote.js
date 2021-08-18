
import React from 'react';
import reactDom from 'react-dom';
import classes from './UpdateNote.module.css';


const UpdateNote=(props)=>{
    const note=props.viewNote.note;
    if(!props.viewNote.open){
        return null;
    }
    return reactDom.createPortal(
        <>
        <div className={classes.overlay} onClick={props.onClose}></div>
        <div className={classes.modal}>
            <h3>{note.title}</h3>
            <h5>{note.body}</h5>
            <div className={classes.close}><p onClick={props.onClose}>Close</p></div>
        </div>
        </>,document.getElementById('portal')
    );}

    export default UpdateNote;
