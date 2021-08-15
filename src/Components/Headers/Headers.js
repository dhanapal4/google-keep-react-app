import { Button } from "react-bootstrap";
import { useContext, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { ThemeContext } from "../../Contexts/ThemeContext";
import classes from "./Headers.module.css";
import { Alert } from "bootstrap";
import { useFirebaseAuth } from "../../Contexts/FirebaseAuthContext";
import { Link,useHistory } from "react-router-dom";

const Headers = (props) => {
  const toBeFilteredData = props.data;
  const onChangeHandler = (event) => {
    console.log(event.target.value);
    console.log(props.data);
    var filter = toBeFilteredData.filter((data) =>
      data.title.toLowerCase().includes(event.target.value.toLowerCase())
    );
    console.log(`Filtered :- ${filter.length}`);
    // if (filter.length === 0) return null;
    props.filteredData(filter);
  };

  const authContext = useContext(AuthContext);
  console.log(authContext);
  const { isAuthenticated } = authContext;
  const [error,setError]=useState('');
  const {currentUser,logout}=useFirebaseAuth();
  const history=useHistory();

  const handleLogout=async ()=>{
    setError('');

    try{
      await logout();
      history.push('/login');
    }catch{
      setError('Failed to log out')
    }

  }

  return (
    <ThemeContext.Consumer>
      {(context) => {
        // console.log(context);
        // console.log(`${context.isLightTheme}`);
        // console.log(`${context.toggleTheme}`);
        return (
          <>
            <header className={classes.headers}>
              <div className={classes.logo}>
                {/* <svg focusable="false" viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg> */}
                <svg focusable="false" width="30px" viewBox="0 0 24 24">
                  <path
                    fill="white"
                    d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
                  ></path>
                </svg>
                <img
                  height="50px"
                  src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
                  alt="Keep logo"
                ></img>
                <h2>Keep</h2>
              </div>
              <div className={classes.searchbox}>
                <svg
                  focusable="false"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="white"
                    d="M20.49,19l-5.73-5.73C15.53,12.2,16,10.91,16,9.5C16,5.91,13.09,3,9.5,3S3,5.91,3,9.5C3,13.09,5.91,16,9.5,16 c1.41,0,2.7-0.47,3.77-1.24L19,20.49L20.49,19z M5,9.5C5,7.01,7.01,5,9.5,5S14,7.01,14,9.5S11.99,14,9.5,14S5,11.99,5,9.5z"
                  ></path>
                  <path d="M0,0h24v24H0V0z" fill="none"></path>
                </svg>
                <input
                  type="search"
                  name="Search"
                  placeholder="Search"
                  onChange={onChangeHandler}
                ></input>
              </div>
              <svg
                onClick={context.toggleTheme}
                width="30px"
                focusable="false"
                viewBox="0 0 24 24"
              >
                <path
                  fill="white"
                  d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"
                ></path>
              </svg>
              {/* {isAuthenticated && (
                <img
                  className={classes.photo_avatar}
                  src="https://lh3.googleusercontent.com/ogw/ADea4I4Bl3yNr7AyCZqPmARU5Dh5G9eibJ_GXQtrQiiDNGQ=s32-c-mo"
                  alt="Display pic"
                ></img>
              )} */}
              {/* <div className="w-100 text-center mt-2"></div> */}
              
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong>{currentUser.email&&currentUser.email}
          <Link to="/update-profile" className="btn btn-secondary text-white">Profile</Link>
              <Button variant="secondary" onClick={handleLogout}>Log out</Button>
            </header>
            <hr />
          </>
        );
      }}
    </ThemeContext.Consumer>
  );
};

export default Headers;
