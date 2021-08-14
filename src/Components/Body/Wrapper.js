import Signup from "../Auth/signup";
import { Container } from "react-bootstrap";
import FirebaseAuthProvider from "../../Contexts/FirebaseAuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainPage from "../MainPage";
import Login from "../Auth/Login";
import App from "../../App";
const Wrapper = () => {
  return (
      <div>
    <Router>
      <FirebaseAuthProvider>
        <Switch>
            <div style={{backgroundColor:"#555"}} className="">
          <Route exact path="/" component={App} /></div>
          <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
          >
            <div className="w-100" style={{ maxWidth: "400px" }}>
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
            </div>
          </Container>
        </Switch>
      </FirebaseAuthProvider>
    </Router>
    </div>
  );
};

export default Wrapper;
