import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { createAccount } from "../Services/DataService";

const CreateAccount = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const handleUser = (e) => setUsername(e.target.value);
  // const handlePassword = (e) => setPassword(e.target.value);
  const handleSubmit = () => {
    let userData = {
       id:0,
       username,
       password,
    };
    createAccount(userData);
    console.log(userData)
  };
  return (
    <div>
      <h1 className="text-center">Create Account</h1>
      <Form>
        <Form.Group className="mb-3" controlId="Username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter Username"
            onChange={({target}) => setUsername(target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={({target}) => setPassword(target.value)}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default CreateAccount;
