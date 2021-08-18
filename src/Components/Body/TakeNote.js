
import classes from './TakeNote.module.css';

const TakeNote = (props) => {

const inputOnClick=()=>{
  props.onClick();
}

const onChangeHandler=()=>{}

  return <div className={classes.takenote}>
  <input className={classes["input-note"]} type="search" value="Take a note..." onChange={onChangeHandler} onClick={inputOnClick}></input>

  </div>;
};

export default TakeNote;
