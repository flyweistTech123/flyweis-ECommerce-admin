/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../layout/HOC";
import { Button, Form, Modal, Table } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Baseurl, Auth, showMsg } from "../../../../Baseurl";

const DeliveryPartner = () => {
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}api/v1/driver/alldriver`);
      setData(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${Baseurl}api/v1/driver/${id}`);
      showMsg("Success", "Removed !", "success");
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  function MyVerticallyCenteredModal(props) {
    const [status, setStatus] = useState("");

    const postHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          `${Baseurl}api/v1/driver/status/${id}`,
          {
            status,
          }
        );

        showMsg("Success", "updated !", "success");
        props.onHide();
        fetchData();
      } catch (e) {
        console.log(e);
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
            Edit Status
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postHandler}>
            <Form.Select
              aria-label="Default select example"
              className="mb-3"
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Open this select menu</option>
              <option value="Approve">Approve</option>
              <option value="Disapprove">Disapprove</option>
            </Form.Select>

            <Button variant="outline-success" type="submit">
              Submit{" "}
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
        <div className="pb-4 Heading_Container  w-full flex justify-between items-center">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Delivery Partner's ( Total : {data?.message?.length})
          </span>
        </div>

        <div sclassName="table-component">
          <Table>
            <thead>
              <tr>
                <th>SNo.</th>
                <th> Name</th>
                <th> Phone</th>
                <th> Email</th>
                <th>Status</th>
                <th>Order</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.message?.map((i, index) => (
                <tr key={index}>
                  <td> #{index + 1} </td>
                  <td> {i.Name} </td>
                  <td> {i.phone} </td>
                  <td> {i.email} </td>
                  <td> {i.status} </td>
                  <td>
                    <Button onClick={() => navigate(`/deliveryOrder/${i._id}`)}>
                      View
                    </Button>
                  </td>
                  <td>
                    <span className="d-flex gap-2">
                      <i
                        className="fa-solid fa-trash"
                        onClick={() => deleteHandler(i._id)}
                      />
                      <i
                        className="fa-solid fa-pen-to-square"
                        onClick={() => {
                          setId(i._id);
                          setModalShow(true);
                        }}
                      ></i>
                    </span>
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

export default HOC(DeliveryPartner);
