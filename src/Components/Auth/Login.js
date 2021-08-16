import { Alert } from "react-bootstrap";
import React, { useRef, useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { useFirebaseAuth } from "../../Contexts/FirebaseAuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useFirebaseAuth();
  const history=useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/")
    } catch {
      setError("Failed to Login.");
    }
    setLoading(false);
  };
  return (
    <Container
      className="d-flex align-items-center justify-content-center flex-column"
      style={{ minHeight: "100vh",maxWidth:"50%" }}
    >
      <Card className="w-100">
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required></Form.Control>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                required
              ></Form.Control>
            </Form.Group>
            <Button type="submit" className="w-100 mt-3" disabled={loading}>
              Login
            </Button>
          </Form>
          <div className="w-100 text-center mt-2">
              <Link to="/forgot-password">Forgot Password</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2" style={{ fontSize: "1rem" }}>
        <h6 className="text-white">
          Need an account? <Link to="/signup">Sign Up</Link>{" "}
        </h6>
      </div>
    </Container>
  );
}
