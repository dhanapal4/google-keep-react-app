import React, { useState } from 'react';

export const AuthContext=React.createContext();

const AuthContextProvider=(props)=>{

    const [authState,setAuthState]=useState({
        isAuthenticated:false
    });

    const toggleAuth=()=>{
        setAuthState(prevAuthState=>{return {isAuthenticated:!prevAuthState.isAuthenticated}});
    }

    return (
        <AuthContext.Provider value={{...authState,toggleAuth:toggleAuth}}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;