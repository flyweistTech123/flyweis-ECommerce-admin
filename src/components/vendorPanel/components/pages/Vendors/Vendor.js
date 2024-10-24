/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import axios from "axios";
import { Baseurl, Auth, showMsg } from "../../../../../Baseurl";

const Users = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}api/v1/vender/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setData(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function MyVerticallyCenteredModal(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const payload = { name, email, phone, password };

    const addVendor = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          `${Baseurl}api/v1/vender/register`,
          payload
        );
        showMsg("Success", "Vendor Created !", "success");
        props.onHide();
        fetchData();
      } catch (e) {
        console.log(e);
        toast.success(e?.response?.data?.message);
      }
    };

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Vendor
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addVendor}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="tel"
                pattern="[0-9]{10}"
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="outline-success" type="submti">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  const statusChange = async (id) => {
    try {
      const { data } = await axios.put(
        `${Baseurl}api/v1/vender/status/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const msg = data.message;
      showMsg("Success", msg, "info");
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  const deleteData = async (id) => {
    try {
      const { data } = await axios.delete(
        `${Baseurl}api/v1/vender/status/${id}`,
        Auth
      );
      showMsg("Success", "Vendor Removed", "success");
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {/* ------------------------------------------------------------- */}

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      {/* ------------------------------------------------------------- */}

      <section>
        <div className="pb-4   w-full flex justify-between items-center  Heading_Container">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Vendors
          </span>
          <button
            onClick={() => {
              setModalShow(true);
            }}
          >
            Add Vendor
          </button>
        </div>

        <div className="table-component">
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile No.</th>
                <th>Email</th>
                <th>Approve/DisApprove</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((i, index) => (
                <tr key={index}>
                  <td>{i.name}</td>
                  <td>{i.phone}</td>
                  <td>{i.email}</td>
                  <td>
                    <div style={{ display: "flex", gap: "10px" }}>
                      {i.verified === true ? "Approved" : "DisApproved"}
                      <img
                        src="https://www.pngfind.com/pngs/m/212-2129306_change-icon-png-shake-hand-circle-icon-transparent.png"
                        alt=""
                        style={{ width: "40px", cursor: "pointer" }}
                        onClick={() => statusChange(i._id)}
                      />
                    </div>
                  </td>
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

export default HOC(Users);
