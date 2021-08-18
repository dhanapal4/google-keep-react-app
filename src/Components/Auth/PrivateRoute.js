import { Redirect, Route } from "react-router-dom";
import { useFirebaseAuth } from "../../Contexts/FirebaseAuthContext";

//privateroute is just a wrapper around the current route
export default function PrivateRoute({component:Component,...rest}) {
  const { currentUser } = useFirebaseAuth();
  return (
    <Route
      {...rest}
      render={props => {
        return currentUser ? (
          <Component {...props} />
        ) : 
          <Redirect to="/login" />
        
      }}
    ></Route>
  );
};

