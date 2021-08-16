import { Alert } from "react-bootstrap";
import React, { useRef, useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { useFirebaseAuth } from "../../Contexts/FirebaseAuthContext";
import { Link, useHistory } from "react-router-dom";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser,updateEmail, updatePassword } = useFirebaseAuth();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises=[];
    if(emailRef.current.value!==currentUser.email){
        promises.push(updateEmail(emailRef.current.value));
    }
    if(passwordRef.current.value){
        promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises).then(()=>{
        history.push("/")
    }).catch(()=>{
        setError('Failed to update account')
    }).finally(()=>{
        setLoading(false)
    })

  };
  return (
    <Container
      className="d-flex align-items-center justify-content-center flex-column"
      style={{ minHeight: "100vh", maxWidth: "50%" }}
    >
      <Card className="w-100">
        <Card.Body className="w-auto">
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                defaultValue={currentUser.email}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep the same"
              ></Form.Control>
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Leave blank to keep the same"
              ></Form.Control>
            </Form.Group>
            <Button type="submit" className="w-100 mt-3" disabled={loading}>
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2" style={{ fontSize: "1rem" }}>
        <h6 className="text-white">
          <Link to="/">Cancel</Link>{" "}
        </h6>
      </div>
    </Container>
  );
}
