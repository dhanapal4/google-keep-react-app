import { Alert } from "react-bootstrap";
import React, { useRef, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useFirebaseAuth } from "../../Contexts/FirebaseAuthContext";
import { Link } from "react-router-dom";

const ForgotPassword=()=> {
  const emailRef = useRef();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useFirebaseAuth();
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions.");
    } catch {
      setError("Failed to reset password.");
    }
    setLoading(false);
  };
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Password Reset</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required></Form.Control>
            </Form.Group>

            <Button type="submit" className="w-100 mt-3" disabled={loading}>
              Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-2">
            <Link to="/login">Login</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2" style={{ fontSize: "1rem" }}>
        <h6 className="text-white">
          Need an account? <Link to="/signup">Sign Up</Link>{" "}
        </h6>
      </div>
    </>
  );
}

export default ForgotPassword;
