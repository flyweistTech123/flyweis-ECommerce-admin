/** @format */
import React, { useEffect, useState } from "react";
// import HOC from "../../layout/HOC";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { Baseurl, showMsg } from "../../../Baseurl";
import { FaBaby } from "react-icons/fa";

const VenderProduct = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [edit, setEdit] = useState(false);

  function MyVerticallyCenteredModal(props) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [subCategoryId, setSubCategoryId] = useState("");
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [discountActive, setDiscountActive] = useState("");
    const [size, setSize] = useState("");
    const [colors, setColor] = useState("");
    const [Stock, setStock] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [image, setImage] = useState("");
    const [arr, setArr] = useState([]);
    const [colorArray, setColorArray] = useState([]);

    const arrSelector = () => {
      setArr((prev) => [...prev, size]);
      setSize("");
    };

    const arrRemover = (index) => {
      setArr((prev) => prev.filter((_, i) => i !== index));
    };

    const colorSelector = () => {
      setColorArray((prev) => [...prev, colors]);
      setColor("");
    };

    const colorRemover = (index) => {
      setColorArray((prev) => prev.filter((_, i) => i !== index));
    };

    const fd = new FormData();
    fd.append("productName", name);
    fd.append("description", description);
    fd.append("originalPrice", price);
    fd.append("discount", discount);
    fd.append("discountActive", discountActive);
    fd.append("stock", Stock);
    fd.append("categoryId", categoryId);
    fd.append("subCategoryId", subCategoryId);
    Array.from(image).forEach((img) => {
      fd.append("image", img);
    });

    console.log(arr, "arr size of data");

    for (let i = 0; i < arr.length; i++) {
      fd.append("size[]", arr[i]);
    }
    for (let i = 0; i < colorArray.length; i++) {
      fd.append("color[]", colorArray[i]);
    }

    const postData = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(`${Baseurl}api/vendor/products`, fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        showMsg("Success", "Product Created !", "success");
        props.onHide();
        fetchData();
      } catch (e) {
        console.log(e);
      }
    };

    const putHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.put(
          `${Baseurl}api/vendor/products/${id}`,
          fd,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        showMsg("Success", "Product Updated !", "success");
        props.onHide();
        fetchData();
      } catch (e) {
        console.log(e);
      }
    };

    // api call category or subcategory
    const [categoryP, setP] = useState([]);
    const [subCategory, setSubCategory] = useState([]);

    const fetchCategory = async () => {
      try {
        const { data } = await axios.get(`${Baseurl}api/vendor/categories`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setP(data.categories);
      } catch (e) {
        console.log(e);
      }
    };

    const fetchSubCategory = async () => {
      try {
        const { data } = await axios.get(
          `${Baseurl}api/vendor/subcategories/categoryId/${categoryId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setSubCategory(data.data);
        console.log(data.data);
      } catch (e) {
        console.log(e);
      }
    };

    useEffect(() => {
      if (categoryId) {
        fetchSubCategory();
      }
    }, [categoryId]);

    useEffect(() => {
      if (props.show === true) {
        fetchCategory();
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
            {edit ? "Update" : "Add Product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={edit ? putHandler : postData}>
            <Form.Group className="mb-3">
              <Form.Label>Product Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setImage(e.target.files)}
                multiple
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingTextarea"
                label="Description"
                className="mb-3"
              >
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                min={0}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Discount</Form.Label>
              <Form.Control
                type="number"
                min={0}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Discount Active</Form.Label>
              {/* <Form.Control
                type="number"
                min={0}
                onChange={(e) => setPrice(e.target.value)}
              /> */}
              <Form.Select onChange={(e) => setDiscountActive(e.target.value)}>
                <option>Open this select menu</option>
                <option value={true}>True</option>
                <option value={false}>False</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setCategoryId(e.target.value)}
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
              <Form.Label>Sub Category</Form.Label>
              <Form.Select
                aria-label="Sub category"
                onChange={(e) => setSubCategoryId(e.target.value)}
              >
                <option>Open this select menu</option>
                {subCategory?.map((i, index) => (
                  <option value={i._id} key={index}>
                    {" "}
                    {i.name}{" "}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                min={0}
                value={Stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Color</Form.Label>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <div style={{ width: "90%", margin: "0" }}>
                  <Form.Control
                    type="text"
                    onChange={(e) => setColor(e.target.value)}
                    value={colors}
                  />
                </div>
                <i
                  className="fa-solid fa-plus"
                  onClick={() => colorSelector(size)}
                  style={{ cursor: "pointer" }}
                ></i>
              </div>
              <ul className="mt-2">
                {colorArray?.map((i, index) => (
                  <li
                    key={index}
                    onClick={() => colorRemover(index)}
                    style={{ listStyle: "disc" }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                      }}
                    >
                      {i}{" "}
                      <i
                        className="fa-solid fa-minus ml-2 "
                        style={{ cursor: "pointer" }}
                      ></i>
                    </span>
                  </li>
                ))}
              </ul>
            </Form.Group>
            {/* <Form.Group className="mb-3">
              <Form.Label>Ratings</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setRating(e.target.value)}
              />
            </Form.Group> */}

            <Form.Group className="mb-3">
              <Form.Label>Size</Form.Label>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <div style={{ width: "90%", margin: "0" }}>
                  <Form.Control
                    type="text"
                    onChange={(e) => setSize(e.target.value)}
                    value={size}
                  />
                </div>
                <i
                  className="fa-solid fa-plus"
                  onClick={() => arrSelector(size)}
                  style={{ cursor: "pointer" }}
                ></i>
              </div>
              <ul className="mt-2">
                {arr?.map((i, index) => (
                  <li
                    key={index}
                    onClick={() => arrRemover(index)}
                    style={{ listStyle: "disc" }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                      }}
                    >
                      {i}{" "}
                      <i
                        className="fa-solid fa-minus ml-2 "
                        style={{ cursor: "pointer" }}
                      ></i>
                    </span>
                  </li>
                ))}
              </ul>
            </Form.Group>

            <Button variant="outline-success" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}api/vendor/products`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(data.products, "data products");
      setData(data.products.reverse());
    } catch (e) {
      console.log(e);
    }
  };

  const deleteData = async (id) => {
    try {
      const { data } = await axios.delete(
        `${Baseurl}api/vendor/products/${id}`,
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
          <span className="tracking-widest text-slate-900 font-semibold uppercase text-black">
            All Products
          </span>
          <button
            onClick={() => {
              setEdit(false);
              setModalShow(true);
            }}
          >
            Add Product
          </button>
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((i, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={i.image?.[0]?.url}
                      style={{ maxWidth: "100px" }}
                      alt=""
                    />
                  </td>
                  <td>{i.productName} </td>
                  <td>{i.description}</td>
                  <td>₹{i.originalPrice}</td>
                  <td>₹{i.discountPrice}</td>
                  <td>₹{i.discount}</td>
                  <td>
                    <ul>
                      {i.size?.map((item) => (
                        <li key={index}> {item} </li>
                      ))}
                    </ul>
                  </td>
                  <td>{i.rating}</td>
                  <td>{i.categoryId?.name} </td>
                  <td>{i.stock} </td>
                  <td> {i.numOfReviews} </td>
                  <td>
                    {" "}
                    {i.color.map((i, index) => (
                      <p key={index}>{i}</p>
                    ))}{" "}
                  </td>
                  <td>
                    <i
                      class="fa-solid fa-trash"
                      onClick={() => deleteData(i._id)}
                    ></i>
                    <i
                      className="fa-solid fa-pen-to-square"
                      onClick={() => {
                        setId(i._id);
                        setEdit(true);
                        setModalShow(true);
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

export default HOC(VenderProduct);
