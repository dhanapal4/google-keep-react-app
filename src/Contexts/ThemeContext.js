import React from 'react';

//Context created to manage Theme across components
export const ThemeContext=React.createContext();


//Class component.
class ThemeContextProvider extends React.Component{

    //state
    state={
        isLightTheme:true,
        light:{syntax:'#555',ui:'#ddd',bg:'#eee'},
        dark:{syntax:'#ddd',ui:'#333',bg:'#555'}
    };

    toggleTheme=()=>{
        this.setState({isLightTheme:!this.state.isLightTheme});
    }

    render(){
        return (
            <ThemeContext.Provider value={{...this.state,toggleTheme:this.toggleTheme}}>
                {this.props.children}
            </ThemeContext.Provider>
        );
    }
}

export default ThemeContextProvider;
