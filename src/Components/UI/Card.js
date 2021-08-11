import { ThemeContext } from '../../Contexts/ThemeContext';
import classes from './Card.module.css';

const Card=(props)=>{
    return(
        <ThemeContext.Consumer>
            {(context)=>{
                // console.log(context)

                return(
                    <div className={context.isLightTheme?classes.card:classes.cardDark}>{props.children}</div>)
            }}
        </ThemeContext.Consumer>
    );
}

export default Card;