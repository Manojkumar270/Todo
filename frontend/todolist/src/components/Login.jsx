import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  let handleSubmit = (e) => {
    e.preventDefault();
    console.log(name + password);
  };

  let goHome = () => {
    nav("/Home");
  };
  return (
    <div>
      <center>
        <Form
          style={{ width: "300px", marginTop: "200px" }}
          onSubmit={handleSubmit}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>UserName</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter userName"
              onChange={(e) => setName(e.target.value)}
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
          {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
          <Button
            variant="primary"
            type="submit"
            onClick={() => {
              goHome();
            }}
          >
            Submit
          </Button>
          <p style={{ marginTop: "20px" }}>
            Don't have an Account ?{" "}
            <a href="http://localhost:5173/Register">Register</a>
          </p>
        </Form>
      </center>
    </div>
  );
}

export default Login;
