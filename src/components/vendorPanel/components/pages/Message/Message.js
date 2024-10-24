/** @format */
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { FloatingLabel, FormControl } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { Baseurl, showMsg, Auth } from "../../../../../Baseurl";

const MSG = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}api/admin/notifications`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setData(data.data.reverse());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteData = async (id) => {
    try {
      const { data } = await axios.delete(
        `${Baseurl}api/admin/notifications/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(data);
      toast.success("Notification Deleted");
      showMsg("Success", "Notification Deleted", "success");
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  function MyVerticallyCenteredModal(props) {
    const [message, setMessage] = useState("");
    const [total, setTotal] = useState("");
    const [title, setTitle] = useState("");
    const [sendTo, setSendTo] = useState(''); // Default value set to 'User'
    const [userId, setUserId] = useState("");
    const [user, setUser] = useState([]);

    const postData = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          `${Baseurl}api/admin/notifications`,
          {
            _id: userId,
            content: message,
            sendTo: sendTo,
            total: total,
            title: title,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        showMsg("Success", "Notification Created !", "success");
        props.onHide();
        fetchData();
      } catch (e) {
        console.log(e);
        toast.error("Error to Create Notification")
      }
    };

    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${Baseurl}api/admin/users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(data.users);
      } catch (err) {
        console.log(err);
      }
    };

    useEffect(() => {
      if (props.show === true) {
        fetchData();
      }
    }, [props]);

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Notification
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postData}>
            <Form.Group className="mb-3">
              <Form.Label>Send To</Form.Label>
              <div>
                <Form.Check
                  type="radio"
                  label="ALL"
                  name="status"
                  value="ALL"
                  checked={total === "ALL"}
                  onChange={(e) => setTotal(e.target.value)}
                />
                <Form.Check
                  type="radio"
                  label="SINGLE"
                  name="status"
                  value="SINGLE"
                  checked={total === "SINGLE"}
                  onChange={(e) => setTotal(e.target.value)}
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => {
                  setSendTo(e.target.value);
                  // Reset userId when user type changes
                  setUserId("");
                }}
                value={sendTo}
              >
                <option>Select the Type of user</option>
                {["Admin", "User", "Vendor"].map((type, index) => (
                  <option value={type} key={index}>
                    {type}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            {total === "SINGLE" && (
              <Form.Group className="mb-3">
                <Form.Label>Select the {sendTo}</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => setUserId(e.target.value)}
                  value={userId}
                >
                  <option>Select the individual {sendTo}</option>
                  {user
                    .filter((u) => u.userType === sendTo)
                    .map((user, index) => (
                      <option value={user._id} key={index}>
                        {user.userName}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Notification Title</Form.Label>
              <FormControl
                as="input"
                placeholder="Enter the Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>


            <Form.Group className="mb-3">
              <FloatingLabel controlId="floatingTextarea2" label="Enter Notification content">
                <Form.Control
                  as="textarea"
                  placeholder="Enter the Notification"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>

            <Button variant="outline-success" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }


  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <section>
        <div className="pb-4 w-full flex justify-between items-center Heading_Container">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Notification
          </span>
          <button
            onClick={() => {
              setModalShow(true);
            }}
          >
            Add Notification
          </button>
        </div>
        {/* Add Form */}

        <div className="table-component">
          <Table>
            <thead>
              <tr>
                <th>User ID/ Recipient</th>
                <th>Title</th>
                <th>Content</th>
                <th>Status</th>
                <th>CreatedAt</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((i, index) => (
                <tr key={index}>
                  <td>{i.recipient}</td>
                  <td>{i.title}</td>
                  <td>{i.content}</td>
                  <td>{i.status}</td>
                  <td> {i.createdAt.slice(0, 10)} </td>
                  <td>
                    <i
                      className="fa-solid fa-trash"
                      onClick={() => deleteData(i._id)}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </section>
    </>
  );
};

export default HOC(MSG);
