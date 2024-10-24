/** @format */
import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { Baseurl, showMsg } from "../../../../../Baseurl";
import { FaBaby } from "react-icons/fa";

const PendingProduct = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState("");

  const handle_updateVendor = (id) => {
    setId(id);
    setModalShow(true);
  };


  function MyVerticallyCenteredModal(props) {
    const [status, setStatus] = useState("");

    const handlePut = async (e) => {
      e.preventDefault();
      try {
        await axios.put(
          `${Baseurl}api/admin/product/approve-vendor/${id}`,
          {
            isProductVerified: status,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        fetchData();
        props.onHide();
        showMsg("Success", "Product Status Updated", "success")
      } catch (error) {
        toast.error("Error to Update Product Status");
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
          <Form onSubmit={handlePut}>
            <Form.Group className="mb-3">
              <div style={{ display: "flex", gap: "20px" }}>
                <Form.Check
                  type="radio"
                  label="Active"
                  name="status"
                  checked={status}
                  onChange={() => setStatus(true)}
                />
                <Form.Check
                  type="radio"
                  label="Deactive"
                  name="status"
                  checked={!status}
                  onChange={() => setStatus(false)}
                />
              </div>
            </Form.Group>
            {/* <Form.Select onChange={(e) => setStatus(e.target.value)}>
              <option>Open this select menu</option>
              <option value={true}>True</option>
              <option value={false}>False</option>
            </Form.Select> */}

            <Modal.Footer>
              <Button type="submit">Submit</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}api/admin/product/pending-vendors`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setData(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteData = async (id) => {
    try {
      const { data } = await axios.delete(
        `${Baseurl}api/admin/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      showMsg("Success", "Product removed !", "info");
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

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
            All Pending Products
          </span>
        </div>

        <div className="table-component">
          <Table>
            <thead>
              <tr>
                <th>Product Image</th>
                <th>Product Name</th>
                <th>Description</th>
                <th>Original Price</th>
                <th>Discount Price</th>
                <th>Discount</th>
                <th>Size Available</th>
                <th>Ratings</th>
                <th>Category </th>
                <th>Stock</th>
                <th>Number of Reviews</th>
                <th>Color Available</th>
                {/* <th>isProductVerified</th> */}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item) => (
                <tr key={item._id}>
                  <td>
                    {item.image && item.image[0] && (
                      <img
                        src={item.image[0].url}
                        style={{ maxWidth: "100px" }}
                        alt=""
                      />
                    )}
                  </td>
                  <td>{item.productName}</td>
                  <td>{item.description}</td>
                  <td>₹{item.originalPrice}</td>
                  <td>₹{item.discountPrice}</td>
                  <td>₹{item.discount}</td>
                  <td>
                    <ul>
                      {item.size?.map((sizeItem, index) => (
                        <li key={index}>{sizeItem}</li>
                      ))}
                    </ul>
                  </td>
                  <td>{item.rating}</td>
                  <td>{item.categoryId?.name}</td>
                  <td>{item.stock}</td>
                  <td>{item.numOfReviews}</td>
                  <td>
                    {item.color?.map((colorItem, index) => (
                      <p key={index}>{colorItem}</p>
                    ))}
                  </td>
                  {/* <td>{item.isProductVerified ? "Approved" : "Pending"}</td> */}
                  <td className="user121">
                    <i
                      className="fa-solid fa-trash"
                      onClick={() => deleteData(item._id)}
                    ></i>
                    <i
                      className="fa-solid fa-edit"
                      onClick={() => handle_updateVendor(item._id)}
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

export default HOC(PendingProduct);
