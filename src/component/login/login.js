import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './login.css'

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  /**
   *  For the sake of simplicity, we'll compare the input with hardcoded values
   */
  const handleSignIn = (event) => {
    event.preventDefault();
    if (username === "admin@test.com" && password === "password") {
      // Authentication successful
      localStorage.setItem("isLoggedIn", "true");
      setLoggedIn(true);
    } else {
      // Authentication failed
      alert("Invalid username or password");
    }
  };

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    if (loggedInStatus === "true") {
      setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/loggedin");
    }
  }, [isLoggedIn, navigate]);

  if (isLoggedIn) {
    return <div>You are logged in!</div>;
  }

  return (
    <Container fluid>
      <Row>
        <Col sm={8}></Col>
        <Col sm={4}>
          <Form onSubmit={handleSignIn} className='loginform'>
            <Form.Group className="mb-3" >
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="email"
                value={username}
                onChange={handleUsernameChange}
                
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Sign In
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
