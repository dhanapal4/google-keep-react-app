
import React from 'react';
import reactDom from 'react-dom';
import classes from './UpdateNote.module.css';


const UpdateNote=(props)=>{
    console.log('modal')
    console.log(`${props.note.title}`);
    return reactDom.createPortal(
        <>
        <div className={classes.overlay} onClick={props.onClose}></div>
        <div className={classes.modal}>
            <h3>{props.note.title}</h3>
            <h5>{props.note.body}</h5>
            <div className={classes.close}><p onClick={props.onClose}>Close</p></div>
        </div>
        </>,document.getElementById('portal')
    );}

    export default UpdateNote;
