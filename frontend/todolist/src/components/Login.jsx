import axios from "axios";
import React, { useState } from "react";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  let handleSubmit = (e) => {
    e.preventDefault();
    console.log(email + password);
  };
  let login = async () => {
    let data = await axios.post("http://localhost:2222/login", {
      email: email,
      password: password,
    });
    console.log(data.data.message);
    if (data.data.status == 400) {
      alert(data.data.message);
    } else {
      alert(data.data.message);
    }
    sessionStorage.setItem("token", data.data.token);
    auth();
  };
  let auth = async () => {
    let data = await axios.get("http://localhost:2222/auth", {
      headers: { token: sessionStorage.getItem("token") },
    });
    if (data.data.status == 200) {
      nav("/Home");
    } else {
      nav("/");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
      }}
    >
      <Card
        style={{
          width: "350px",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Card.Body>
          <h3
            className="text-center"
            style={{ marginBottom: "20px", color: "#333" }}
          >
            Login
          </h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100"
              style={{ backgroundColor: "#5a67d8", border: "none" }}
              onClick={() => {
                if (email !== "" && password !== "") {
                  login();
                }
              }}
            >
              Login
            </Button>
            <p className="text-center mt-3" style={{ fontSize: "14px" }}>
              Don't have an account?{" "}
              <a
                href="http://localhost:5173/Register"
                style={{ color: "#5a67d8", fontWeight: "bold" }}
              >
                Register
              </a>
            </p>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Login;
