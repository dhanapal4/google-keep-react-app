import Signup from "../Auth/signup";
import { Container } from "react-bootstrap";
import FirebaseAuthProvider from "../../Contexts/FirebaseAuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainPage from "../MainPage";
import Login from "../Auth/Login";
import App from "../../App";
import PrivateRoute from "../Auth/PrivateRoute";
import ForgotPassword from "../Auth/ForgotPassword";
import UpdateProfile from "../Auth/UpdateProfile";
const Wrapper = () => {
  return (
      <div style={{backgroundColor:"rgb(32, 32, 32)"}} >
    <Router>
      <FirebaseAuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={App} />
          <PrivateRoute path="/update-profile" component={UpdateProfile} />
          
          {/* <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
          > */}
            {/* <div className="w-100" style={{ maxWidth: "400px" }}> */}
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword}/>
            {/* </div> */}
          {/* </Container> */}
        </Switch>
      </FirebaseAuthProvider>
    </Router>
    </div>
  );
};

export default Wrapper;
