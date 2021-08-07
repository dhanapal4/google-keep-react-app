
import classes from './TakeNote.module.css';

const TakeNote = (props) => {

const inputOnClick=()=>{
  console.log('Onclicked');
  props.onClick();
}

const onChangeHandler=()=>{}

  return <>
  <input className={classes["input-note"]} type="search" value="Take a note..." onChange={onChangeHandler} onClick={inputOnClick}></input>
  </>;
};

export default TakeNote;
