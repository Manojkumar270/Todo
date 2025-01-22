import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

import axios from "axios";

function Home() {
  const [data, setData] = useState([]);
  const [task, setTask] = useState("");
  let count = 0;

  let getDtata = async () => {
    let data = await axios.get("http://localhost:2222/get");
    console.log(data.data.task);
    setData(data.data.task);
  };

  useEffect(() => {
    getDtata();
  }, []);

  let postData = async () => {
    await axios.post("http://localhost:2222/post", { task: task });
    console.log(task);
    getDtata();
  };

  let deleteData = async (id) => {
    await axios.delete("http://localhost:2222/delete/" + id);
    getDtata();
  };

  let toggleCompletion = async (id) => {
    await axios.put("http://localhost:2222/complete/" + id);
    getDtata();
  };

  return (
    <>
      <center style={{ marginTop: "100px" }}>
        <h1>ToDo List</h1>

        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Add Task"
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
                      </p>{" "}
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
                        variant="outline-primary"
                        id="button-addon2"
                      >
                        Update
                      </Button>
                    </td>
                    <td>
                      <Button
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
      </center>
    </>
  );
}

export default Home;
