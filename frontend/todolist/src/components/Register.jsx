import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const nav = useNavigate();

  let handleSubmit = (e) => {
    e.preventDefault();
    console.log(name + email + password);
  };
  return (
    <div>
      <center>
        <Form
          style={{ width: "300px", marginTop: "200px" }}
          onSubmit={handleSubmit}
        >
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>UserName</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter userName"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              //   onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            onClick={() => {
              handleSubmit;
            }}
          >
            Submit
          </Button>
          <p style={{ marginTop: "20px" }}>
            Already have an Account ?{" "}
            <a href="http://localhost:5173/?"> Login</a>
          </p>
        </Form>
      </center>
    </div>
  );
}

export default Register;
