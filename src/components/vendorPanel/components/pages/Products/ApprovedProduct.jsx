/** @format */
import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { Baseurl, showMsg } from "../../../../../Baseurl";
import { FaBaby } from "react-icons/fa";

const ApprovedProduct = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [edit, setEdit] = useState(false);
  const [productId, setProductId] = useState('')

  function MyVerticallyCenteredModal(props) {
    const [categoryP, setP] = useState([]);
    const [subCategory, setSubCategory] = useState([]);




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
    const fetchSubCategory = async () => {
      try {
        const { data } = await axios.get(`${Baseurl}api/admin/subcategories`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSubCategory(data.subcategories);
        console.log(data.data);
      } catch (e) {
        console.log(e);
      }
    };


    useEffect(() => {
      if (props.show === true) {
        fetchCategory();
        fetchSubCategory();
        fetchSubCategorysDetails();
      }
    }, [props]);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [subCategoryId, setSubCategoryId] = useState("");
    const [originalprice, setOriginalPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [discountActive, setDiscountActive] = useState('')
    // const [ratings, setRating] = useState("");
    const [size, setSize] = useState("");
    const [colors, setColor] = useState("");
    const [Stock, setStock] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const [arr, setArr] = useState([]);
    const [colorArray, setColorArray] = useState([]);

    const fetchSubCategorysDetails = async () => {
      try {
        const response = await axios.get(`${Baseurl}/api/admin/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response);
        const { productName, description, originalPrice, discountActive, discount, categoryId, subCategoryId, color, size, stock, image } = response.data.data;
        setName(productName);
        setDescription(description);
        setOriginalPrice(originalPrice);
        setDiscount(discount)
        setDiscountActive(discountActive);
        setSubCategoryId(subCategoryId);
        setCategory(categoryId)
        setColor(color);
        setSize(size);
        setStock(stock);
        setImage(image);
      } catch (error) {
        console.error('Error fetching Product details:', error);
      }
    };

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
    fd.append("originalPrice", originalprice);
    fd.append("discount", discount);
    fd.append("discountActive", discountActive);
    fd.append("stock", Stock);
    fd.append("categoryId", category);
    fd.append("subCategoryId", subCategoryId);
    Array.from(image).forEach((img) => {
      fd.append("image", img);
    });


    for (let i = 0; i < arr.length; i++) {
      fd.append("size", arr[i]);
    }
    fd.append('size', arr)
    for (let i = 0; i < colorArray.length; i++) {
      fd.append("color", colorArray[i]);
    }



    const postData = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(`${Baseurl}api/admin/products`, fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        showMsg("Success", "Product Created !", "success");
        props.onHide();
        fetchData();
      } catch (e) {
        toast.error("Error to Add Product")
        console.log(e);
      }
    };

    const handlePutRequest = async (e) => {
      e.preventDefault();
      try {
        const formData = new FormData();

        // Append all fields including color and size arrays
        formData.append("productName", name);
        formData.append("description", description);
        formData.append("originalPrice", originalprice);
        formData.append("discount", discount);
        formData.append("discountActive", discountActive);
        formData.append("stock", Stock);
        formData.append("categoryId", category);
        formData.append("subCategoryId", subCategoryId);
        Array.from(image).forEach((img) => {
          formData.append("image", img);
        });
        const response = await axios.put(`${Baseurl}api/admin/products/${productId}`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        showMsg("Success", "Product Updated", "success");
        props.onHide();
        fetchData();
      } catch (error) {
        console.error('Error updating Product:', error);
        toast.error("Error updating Product");
      }
    }



    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {edit ? "Update Product" : "Add Product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {image && image.length > 0 && (
            <div>
              {Array.from(image).map((file, index) => (
                <img
                  key={index}
                  src={file instanceof File ? URL.createObjectURL(file) : file}
                  alt={`Image Preview ${index}`}
                  style={{ width: "100px", marginRight: "10px" }}
                />
              ))}
            </div>
          )}
          <Form onSubmit={edit ? handlePutRequest : postData}>
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
                value={name}
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
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Original Price</Form.Label>
              <Form.Control
                type="number"
                min={0}
                value={originalprice}
                onChange={(e) => setOriginalPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Discount</Form.Label>
              <Form.Control
                type="number"
                min={0}
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Discount Status</Form.Label>
              <div>
                <Form.Check
                  type="radio"
                  label="Active"
                  name="status"
                  checked={discountActive}
                  onChange={() => setDiscountActive(true)}
                />
                <Form.Check
                  type="radio"
                  label="Deactive"
                  name="status"
                  checked={!discountActive}
                  onChange={() => setDiscountActive(false)}
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                aria-label="Default select example"
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
              <Form.Label>Sub Category</Form.Label>
              <Form.Select
                aria-label="Sub category"
                value={subCategoryId}
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
              {edit ? "Update" : "Submit"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}api/admin/product/approved-vendors`, {
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
  const handleDownloadExcel = async () => {
    try {
      const response = await axios.get(`${Baseurl}api/admin/export/product`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        responseType: 'blob', // Receive binary data
      });

      // Create a temporary URL for the blob object
      const url = window.URL.createObjectURL(response.data);

      // Create a temporary link element
      const link = document.createElement('a');
      link.href = url;

      // Set the download attribute with the desired file name
      link.setAttribute('download', 'Product.xlsx');

      // Append the link to the document body
      document.body.appendChild(link);

      // Trigger a click on the link to start the download
      link.click();

      // Remove the link from the document body after download
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading Excel file:", error);
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
            All Approved Products
          </span>
          <button
            onClick={() => {
              setEdit(false);
              setModalShow(true);
              setProductId(null)
            }}
          >
            Add Product
          </button>
          <Button onClick={handleDownloadExcel}>Download Excel</Button>
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
                  {/* <td>{i.isProductVerified ? "Approved" : "Pending"}</td> */}
                  <td className="user121">
                    <i
                      class="fa-solid fa-trash"
                      onClick={() => deleteData(i._id)}
                    ></i>
                    <i
                      className="fa-solid fa-edit"
                      onClick={() => {
                        setId(i._id);
                        setEdit(true);
                        setModalShow(true);
                        setProductId(i._id)
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

export default HOC(ApprovedProduct);
