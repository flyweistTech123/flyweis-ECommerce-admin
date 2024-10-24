import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import axios from "axios";
import { Baseurl } from "../../../Baseurl";
import { useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

function Single_order_product() {
  const [order, setOrder] = useState({});
  const [modalShow, setModalShow] = React.useState(false);

  //param
  const { id } = useParams();
  const single_order = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}api/vendor/order/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setOrder(data.data);
      console.log(data.data, "jai maa kali");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    single_order();
  }, []);

  //   models
  function MyVerticallyCenteredModal(props) {
    const [status, setStatus] = useState("");

    const handlePost = async (e) => {
      e.preventDefault();
      try {
        await axios.post(`${Baseurl}api/vendor/order/${id}/status`, {
          status: status,
        });
        single_order();
        props.onHide();
        toast.error("Order Update is successful", {
          position: "top-right",
        });
      } catch (error) {
        toast.error(error?.response?.data?.message);
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
          <Modal.Title id="contained-modal-title-vcenter">Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handlePost}>
            <Form.Select onChange={(e) => setStatus(e.target.value)}>
              <option>Open this select menu</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </Form.Select>

            <Modal.Footer>
              <Button type="submit">Submit</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <div style={{ color: "black", border: "1px solid black" }}>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <div>
          <p>UserName : {order?.user?.userName}</p>
          <p>Mobile Number : {order?.user?.mobileNumber}</p>
        </div>
        <div>
          <Button variant="primary" onClick={() => setModalShow(true)}>
            UpDate Status
          </Button>
        </div>
      </div>

      {order?.products?.map((item, i) => (
        <div
          style={{
            width: "90%",
            margin: "auto",
            display: "flex",
            justifyContent: "space-between",
            padding: "20px",
          }}
        >
          <div
            style={{
              width: "30%",

              padding: "10px",
              backgroundColor: "black",
            }}
          >
            {order?.products?.map((item, i) => (
              <img
                src={item?.product?.image?.[0]?.url}
                style={{ padding: "10px" }}
                alt="image not fount"
              />
            ))}
          </div>
          <div
            style={{
              width: "40%",
              padding: "10px",
            }}
          >
            <p>Product Name : {item?.product?.productName}</p>
            {/* <p>{item.vendorId.userName}</p>
              <p>{item.vendorId.mobileNumber}</p> */}
            <p>Product size : {item?.size}</p>
            <p>Product Quantity : {item?.quantity}</p>
            <p>Product Price : {item?.price}</p>
          </div>
        </div>
      ))}
      <div style={{ display: "flex" }}>
        <div style={{ margin: "20px" }}>
          <p>Total Amount : {order.totalAmount}</p>
          <p>Payment Status : {order.paymentStatus}</p>
          <p>Order Tracking : {order.trackingNumber}</p>
        </div>
        <div style={{ marginLeft: "30%" }}>
          <h4>Shipping Address</h4>
          <p>{order?.shippingAddress?.fullName}</p>
          <p>{order?.shippingAddress?.phone}</p>
          <p>{order?.shippingAddress?.addressLine1}</p>
          <p>{order?.shippingAddress?.city}</p>
          <p>{order?.shippingAddress?.state}</p>
          <p>{order?.shippingAddress?.postalCode}</p>
          <p>{order?.shippingAddress?.country}</p>
        </div>
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}

export default HOC(Single_order_product);
