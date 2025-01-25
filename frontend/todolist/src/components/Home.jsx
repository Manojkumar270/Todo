import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

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
    if (data.data.status == 200) {
      alert(data.data.message);
      getData();
    } else {
      alert("you don't have access");
      nav("/");
    }
  };
  useEffect(() => {
    auth();
  }, []);

  return (
    <>
      <center style={{ marginTop: "100px" }}>
        <h1>ToDo List</h1>

        <InputGroup className="mb-3">
          <Form.Control
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
          hover
          variant="light"
          className="table"
          size="sm"
        >
          <thead className="thead">
            <tr>
              <th>No</th>
              <th style={{ width: "400px" }}>Tasks</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, id) => {
              return (
                <>
                  <tr className="trow">
                    <td className="count">{(count = count + 1)}</td>
                    <td className="taskbox">
                      {item.update ? (
                        <></>
                      ) : (
                        <p
                          className="task"
                          style={{
                            textDecoration: item.completed
                              ? "line-through"
                              : "none",
                            color: item.completed ? "black" : "green",
                          }}
                        >
                          {" "}
                          {item.task}
                        </p>
                      )}

                      {item.update ? (
                        <input
                          required
                          className="updateinput"
                          type="text"
                          onChange={(e) => {
                            setUpdate(e.target.value);
                          }}
                        />
                      ) : (
                        <></>
                      )}
                      {item.update ? (
                        <>
                          <button
                            className="okbtn"
                            onClick={() => change(item._id)}
                          >
                            Ok
                          </button>
                        </>
                      ) : (
                        <></>
                      )}
                      <input
                        className="checkbox"
                        type="checkbox"
                        onChange={() => {
                          console.log(item.task);
                          toggleCompletion(item._id);
                        }}
                      />
                    </td>

                    <td>
                      <Button
                        className="tdb"
                        variant="primary"
                        id="button-addon2"
                        onClick={() => updateData(item._id)}
                      >
                        Update
                      </Button>
                    </td>
                    <td>
                      <Button
                        className="tdb"
                        variant="outline-danger"
                        id="button-addon2"
                        onClick={() => deleteData(item._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>
        <Button
          variant="outline-danger"
          id="button-addon2"
          onClick={() => {
            sessionStorage.clear();
            nav("/");
          }}
        >
          LogOut
        </Button>
      </center>
    </>
  );
}

export default Home;
