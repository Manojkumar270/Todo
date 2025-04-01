import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Register() {
  const nav = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  let postData = async (e) => {
    try {
      e.preventDefault();
      let result = await axios.post("http://localhost:2222/newUser", data);
      if (result.status === 201) {
        alert("Registered Successfully");
        nav("/");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("User already exists");
        nav("/");
      } else {
        alert("An error occurred while adding the user. Please try again.");
      }
      console.error("Error posting user data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target.value);

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
            Register
          </h3>
          <Form onSubmit={postData}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                value={data.name}
                type="text"
                name="name"
                placeholder="Enter username"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                value={data.email}
                name="email"
                type="email"
                placeholder="Enter email"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                value={data.password}
                name="password"
                type="password"
                placeholder="Enter password"
                onChange={handleChange}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100"
              style={{ backgroundColor: "#5a67d8", border: "none" }}
            >
              Register
            </Button>
            <p className="text-center mt-3" style={{ fontSize: "14px" }}>
              Already have an account?{" "}
              <a
                href="http://localhost:5173/"
                style={{ color: "#5a67d8", fontWeight: "bold" }}
              >
                Login
              </a>
            </p>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Register;
