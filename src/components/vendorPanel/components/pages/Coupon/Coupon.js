/** @format */

import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { toast } from "react-toastify";
import { Baseurl, Auth, showMsg } from "../../../../../Baseurl";

const Coupon = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}api/admin/coupon`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setData(data.data);
      console.log(data.data, "coupon data");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function MyVerticallyCenteredModal(props) {
    const [couponCode, setCouponCode] = useState("");
    const [image, setImage] = useState();
    const [activationDate, setAD] = useState("");
    const [expirationDate, setEd] = useState("");
    const [discount, setDiscount] = useState("");
    const [discountType, setDiscountType] = useState("");
    const [discription, setDiscription] = useState("");

    const postData = async (e) => {
      e.preventDefault();
      const formdata = new FormData();
      formdata.append("code", couponCode);
      formdata.append("description", discription);
      formdata.append("discountType", discountType);
      formdata.append("discountValue", discount);
      formdata.append("startDate", activationDate);
      formdata.append("expiryDate", expirationDate);
      formdata.append("image", image);

      try {
        const { data } = await axios.post(
          `${Baseurl}api/admin/coupon`,
          formdata,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        props.onHide();
        fetchData();
        showMsg("Success", "Coupon Created", "success");
      } catch (e) {
        console.log(e);
        alert(e?.response?.data?.message);
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
            Add Coupon
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postData}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Coupon Code</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setCouponCode(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Coupon Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Activation Date</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => setAD(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => setEd(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Coupon Discription</Form.Label>
              <Form.Control
                type="text"
                value={discription}
                onChange={(e) => setDiscription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Discount</Form.Label>
              <Form.Control
                type="number"
                min={1}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Discount Type</Form.Label>
              <Form.Control
                type="text"
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value)}
                placeholder="percentage..."
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  const deleteData = async (id) => {
    try {
      await axios.delete(`${Baseurl}api/admin/coupon/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchData();
      showMsg("Success", "Coupon Removed !", "success");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <section>
        <div className="pb-4  w-full flex justify-between items-center Heading_Container">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Coupons
          </span>
          <button onClick={() => setModalShow(true)}>Add Coupon</button>
        </div>

        <div className="table-component">
          <Table>
            <thead>
              <tr>
                <th>Coupon Image</th>
                <th>Coupon Code</th>

                <th>Activation Date</th>
                <th>Expiry Date</th>
                <th>Discount</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {data?.map((i, index) => (
                <tr key={index}>
                  <td>
                    <img src={i?.image} style={{ width: "50%" }}></img>
                  </td>
                  <td> {i.code} </td>
                  <td> {new Date(i.startDate).toLocaleDateString()} </td>
                  <td> {new Date(i.expiryDate).toLocaleDateString()} </td>
                  <td> {i.discountValue} </td>
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

export default HOC(Coupon);
