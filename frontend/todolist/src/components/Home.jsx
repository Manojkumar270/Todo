import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { Card } from "react-bootstrap";

import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);
  const [task, setTask] = useState("");
  const [update, setUpdate] = useState("");
  const nav = useNavigate();
  let count = 0;

  let getData = async () => {
    let data = await axios.get("http://localhost:2222/get");
    console.log(data.data.task);
    setData(data.data.task);
  };

  let postData = async () => {
    await axios.post("http://localhost:2222/post", { task: task });
    console.log(task);
    setTask("");
    getData();
  };

  let deleteData = async (id) => {
    await axios.delete("http://localhost:2222/delete/" + id);
    getData();
  };

  let toggleCompletion = async (id) => {
    await axios.put("http://localhost:2222/complete/" + id);
    getData();
  };
  let updateData = async (id) => {
    await axios.put("http://localhost:2222/update/" + id);
    console.log(data);

    getData();
  };

  let change = async (id) => {
    try {
      await axios.put("http://localhost:2222/change/" + id, { task: update });
      getData();
    } catch (error) {
      console.log(error.message);
    }
  };

  let auth = async () => {
    let data = await axios.get("http://localhost:2222/auth", {
      headers: { token: sessionStorage.getItem("token") },
    });
    if (data.data.status != 200) {
      alert("you don't have access");
      nav("/");
    }
  };
  useEffect(() => {
    auth();
    getData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        padding: "20px",
      }}
    >
      <Card
        style={{
          width: "700px",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          backgroundColor: "transparent",
        }}
      >
        <Card.Body>
          <h1
            className="text-center"
            style={{ color: "#333", marginBottom: "20px" }}
          >
            ToDo List
          </h1>

          <InputGroup className="mb-3">
            <Form.Control
              style={{ backgroundColor: "transparent" }}
              placeholder="Add Task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <Button
              className="addbtn"
              type="button"
              variant="success"
              onClick={() => postData()}
            >
              Add
            </Button>
          </InputGroup>

          <Table
            responsive
            bordered
            // hover
            variant="light"
            className="table"
            size="sm"
            style={{ backgroundColor: "transparent" }}
          >
            <thead
              style={{ backgroundColor: "transparent" }}
              // className="thead bg-primary text-white"
            >
              <tr>
                <th style={{ backgroundColor: "transparent" }}>No</th>
                <th style={{ width: "300px", backgroundColor: "transparent" }}>
                  Tasks
                </th>
                <th style={{ backgroundColor: "transparent" }}>Update</th>
                <th style={{ backgroundColor: "transparent" }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, id) => {
                count += 1;
                return (
                  <tr className="trow" key={item._id}>
                    <td
                      style={{ backgroundColor: "transparent" }}
                      className="count"
                    >
                      {count}
                    </td>
                    <td
                      style={{
                        backgroundColor: "transparent",
                        color: "black",
                        display: "flex",
                      }}
                      className="taskbox"
                    >
                      {item.update ? (
                        <>
                          <input
                            placeholder="task"
                            required
                            className="updateinput form-control"
                            type="text"
                            onChange={(e) => setUpdate(e.target.value)}
                          />
                          <button
                            className="btn btn-success btn-sm mt-1"
                            style={{ marginLeft: "10px" }}
                            onClick={() => change(item._id)}
                          >
                            Ok
                          </button>
                        </>
                      ) : (
                        <p
                          className="task"
                          style={{
                            textDecoration: item.completed
                              ? "line-through"
                              : "none",
                            color: item.completed ? "black" : "white",
                            fontSize: "16px",
                          }}
                        >
                          {item.task}
                        </p>
                      )}

                      <input
                        onChange={() => toggleCompletion(item._id)}
                        className="checkbox"
                        type="checkbox"
                        checked={item.completed}
                        style={{ marginLeft: "10px" }}
                      />
                    </td>

                    <td style={{ backgroundColor: "transparent" }}>
                      <Button
                        className="tdb"
                        variant="primary"
                        size="sm"
                        onClick={() => updateData(item._id)}
                      >
                        Update
                      </Button>
                    </td>
                    <td style={{ backgroundColor: "transparent" }}>
                      <Button
                        className="tdb"
                        variant="danger"
                        size="sm"
                        onClick={() => deleteData(item._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <div className="text-center">
            <Button
              variant="danger"
              id="button-addon2"
              onClick={() => {
                sessionStorage.clear();
                nav("/");
              }}
              className="mt-3"
            >
              Log Out
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Home;
