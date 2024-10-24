/** @format */

import React, { useCallback, useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";
import { Baseurl, Auth, showMsg } from "../../../../../Baseurl";
import Modal from "react-bootstrap/Modal";
import { FaEye } from "react-icons/fa";
import { Button, Form } from "react-bootstrap";

const Complainttickets = () => {
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [modalShow, setModalShow] = React.useState(false);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}api/admin/tickets`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setData(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  //update vender profile
  const handle_updateStatus = (id) => {
    setId(id);
    setModalShow(true);
  };

  function MyVerticallyCenteredModal(props) {
    const [status, setStatus] = useState("");
    const [replyText, setReplyText] = useState("");

    const handleCloseTicket = async (e) => {
      e.preventDefault();
      try {
        await axios.put(
          `${Baseurl}api/admin/tickets/${id}/close`,
          {
            status: status,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        fetchData();
        props.onHide();
        showMsg("Success", "Ticket Closed", "success");
      } catch (error) {
        toast.error("Error to Ticket Closed");
      }
    };

    // const handleCloseTicket = async () => {
    //   try {
    //     await axios.put(
    //       `${awsUrl}/api/admin/tickets/65eed137add7762df40234d9/close`,
    //       {},
    //       {
    //         headers: {
    //           Authorization: `Bearer ${localStorage.getItem("token")}`,
    //         },
    //       }
    //     );
    //     // Perform any necessary actions after closing the ticket
    //   } catch (error) {
    //     console.error("Error closing ticket:", error);
    //   }
    // };

    const handleReplyTicket = async () => {
      try {
        await axios.put(
          `${Baseurl}api/admin/tickets/${id}/reply`,
          {
            message: replyText,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        fetchData();
        props.onHide();
        showMsg("Success", "Message Send", "success");

      } catch (error) {
        console.error("Error replying to ticket:", error);
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
          <Modal.Title id="contained-modal-title-vcenter">Closed / Reply</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCloseTicket}>
            <Form.Label>Close Ticket:</Form.Label>
            <Form.Group className="mb-3">
              <div style={{ display: "flex", gap: "20px" }}>
                <Form.Check
                  type="radio"
                  label="Close"
                  name="status"
                  checked={status === "close"}
                  onChange={() => setStatus("close")}
                />
              </div>
            </Form.Group>
            <Modal.Footer>
            </Modal.Footer>
          </Form>

          <div>
            <Button onClick={handleCloseTicket}>Close Ticket</Button>
            <Form.Group className="mb-3">
              <Form.Label>Reply:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
            </Form.Group>
            <Button onClick={handleReplyTicket}>Reply to Ticket</Button>
          </div>
        </Modal.Body>
      </Modal>
    );
  }


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <section>
        <div className="pb-4  w-full flex justify-between items-center Heading_Container">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Complaint Tickets ( Total : {data?.length} )
          </span>
        </div>
        {/* Add Form */}

        <div className="table-component">
          <Table>
            <thead>
              <tr>
                <th>User Name</th>
                <th>Vendor Name</th>
                <th>Product Name</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Status</th>
                <th>Replies</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => (
                <tr key={index}>
                  <td>{item?.user?.userName}</td>
                  <td>{item?.order?.products[0]?.vendorId?.userName}</td>
                  <td>{item?.order?.products.length > 0 ? item.order.products[0]?.product?.productName : 'N/A'}</td>
                  <td>{item?.subject}</td>
                  <td>{item?.message}</td>
                  <td>{item?.status}</td>
                  <td>
                    <ul style={{ listStyle: 'disc', paddingLeft: '20px' }}>
                      {item?.replies?.map((reply, idx) => (
                        <li key={idx}>{reply.message}</li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <div onClick={() => handle_updateStatus(item._id)}>
                      <i
                        className="fa-solid fa-edit"
                        style={{ cursor: 'pointer' }}
                      ></i>
                    </div>
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
export default HOC(Complainttickets);
