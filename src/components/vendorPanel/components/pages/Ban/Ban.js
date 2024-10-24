/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { toast } from "react-toastify";
import { Baseurl, showMsg } from "../../../../../Baseurl";

const Ban = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState([]);
  const [bannerId, setBannerId] = useState('')


  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}api/admin/offers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setData(data.data);
      // console.log(data, "data offers");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteData = async (id) => {
    try {
      const { data } = await axios.delete(`${Baseurl}api/admin/offers/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const msg = data.message;
      showMsg("Success", msg, "success");
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  function MyVerticallyCenteredModal(props) {
    const [image, setImage] = useState("");
    const [desc, setDesc] = useState("");
    const [category, setCategory] = useState("");
    const [product, setProduct] = useState("");
    const [title, setTitle] = useState("");
    const [code, setCode] = useState("");
    const [discountPercentage, setDiscountPercentage] = useState("");
    const [validFrom, setValidForm] = useState("");
    const [validTo, setValidTo] = useState("");


    useEffect(() => {
      const fetchBannersDetails = async () => {
        try {
          const response = await axios.get(`${Baseurl}/api/admin/offers/${bannerId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          const { title, image, product, description, code, discountPercentage, validFrom, validTo, category } = response.data.data;
          setTitle(title);
          console.log(validTo, "hogi rhi ye bhajj")
          setImage(image);
          setProduct(product);
          setDesc(description);
          setCode(code);
          setDiscountPercentage(discountPercentage);
          setValidForm(validFrom);
          setValidTo(validTo);
          setCategory(category)
        } catch (error) {
          console.error('Error fetching Banner details:', error);
        }
      };
      fetchBannersDetails();
    }, [bannerId]);


    const formdata = new FormData();
    formdata.append("product", product);
    formdata.append("category", category);
    formdata.append("title", title);
    formdata.append("description", desc);
    formdata.append("code", code);
    formdata.append("discountPercentage", discountPercentage);
    formdata.append("validFrom", validFrom);
    formdata.append("validTo", validTo);
    formdata.append("image", image);

    const postData = async (e) => {
      e.preventDefault();


      try {
        const { data } = await axios.post(
          `${Baseurl}api/admin/offers`,
          formdata,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        fetchData();
        props.onHide();
        showMsg("Success", "Banner Created ! ", "success");
      } catch (e) {
        console.log(e);
      }
    };


    const handlePutRequest = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.put(`${Baseurl}api/admin/offers/${bannerId}`, formdata, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        showMsg("Success", "Banner Updated", "success");
        setModalShow(false);
        fetchData();
      } catch (error) {
        console.error('Error to updating Banner:', error)
        toast.error("Error to updating Banner")
      }
    }

    const [showProduct, setShowProduct] = useState([]);
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${Baseurl}api/admin/products`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setShowProduct(data.products);
      } catch (e) {
        console.log(e);
      }
    };
    const [categoryP, setP] = useState([]);
    const fetchCategory = async () => {
      try {
        const { data } = await axios.get(`${Baseurl}api/admin/categories`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setP(data.categories);
      } catch (e) {
        console.log(e);
      }
    };


    useEffect(() => {
      if (props.show === true) {
        fetchData();
        fetchCategory();
      }
    }, [props]);

    return (
      <Modal
        {...props}
        size="lg-down"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {edit ? "Edit Banner" : "Add Banner"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {image && (
            <div>
              <img
                src={image instanceof File ? URL.createObjectURL(image) : image}
                alt="Category Preview"
                style={{ width: "200px" }}
              />
            </div>
          )}
          <Form
            style={{
              color: "black",
              margin: "auto",
            }}
            onSubmit={edit ? handlePutRequest : postData}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Banner"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                aria-label="Select category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Open this select menu</option>
                {categoryP?.map((i, index) => (
                  <option value={i._id} key={index}>
                    {" "}
                    {i.name}{" "}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setProduct(e.target.value)}
              >
                <option>Open this select menu</option>
                {showProduct?.map((i, index) => (
                  <option value={i._id} key={index}>
                    {" "}
                    {i.productName}{" "}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                required
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Discount Percentage</Form.Label>
              <Form.Control
                type="text"
                placeholder="discountPercentage"
                required
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Valid From</Form.Label>
              <Form.Control
                type="date"
                placeholder="Date ..."
                required
                value={validFrom.slice(0, 10)}
                onChange={(e) => setValidForm(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Valid To</Form.Label>
              <Form.Control
                type="date"
                placeholder="discountPercentage"
                required
                value={validTo}
                onChange={(e) => setValidTo(e.target.value)}
              />
            </Form.Group>

            <Button variant="outline-success" type="submit">
              {edit ? "Update" : "Submit"}
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
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
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center Heading_Container">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Banner
          </span>
          <button
            onClick={() => {
              setEdit(false);
              setModalShow(true);
              setBannerId(null)
            }}
          >
            Create New
          </button>
        </div>

        <div className="table-component">
          <Table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Image</th>
                {/* <th>product</th>
                <th>category</th> */}
                {/* <th>Description</th> */}
                <th>Code</th>
                <th>Discount Percentage</th>
                <th>Valid From</th>
                <th>Valid To</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((i, index) => (
                <tr key={index}>
                  <td> {i.title} </td>
                  <td>
                    <img
                      src={i.image}
                      alt="bannerImage"
                      style={{ width: "100px" }}
                    />
                  </td>
                  {/* <td> {i.product} </td> */}
                  {/* <td> {i.category} </td> */}
                  {/* <td> {i.description} </td> */}
                  <td> {i.code} </td>
                  <td> {i.discountPercentage}%</td>
                  <td> {i.validFrom.slice(0, 10)} </td>
                  <td> {i.validTo.slice(0, 10)} </td>
                  <td className="user121">
                    <i
                      className="fa-solid fa-trash"
                      onClick={() => deleteData(i._id)}
                    ></i>
                    <i
                      className="fa-solid fa-edit"
                      onClick={() => {
                        setBannerId(i._id);
                        setModalShow(true);
                        setEdit(true)

                      }}
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

export default HOC(Ban);
