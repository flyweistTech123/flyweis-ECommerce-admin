/** @format */
import React, { useEffect } from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Baseurl, showMsg } from "../../../../../Baseurl";

const Sub = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState([]);
  const [image1, setImage1] = useState("");
  const [desc1, setDesc1] = useState("");
  const [category1, setCategory1] = useState("");
  const [CategoryId, setCategoryId] = useState('')

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}api/admin/subcategories`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setData(data.subcategories);
      console.log(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function MyVerticallyCenteredModal(props) {
    const [image, setImage] = useState("");
    const [desc, setDesc] = useState("");
    const [category, setCategory] = useState("");
    const [categoryP, setP] = useState([]);
    const [status, setStatus] = useState("")



    useEffect(() => {
      const fetchSubCategorysDetails = async () => {
        try {
          const response = await axios.get(`${Baseurl}/api/admin/subcategories/${CategoryId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          console.log(response);
          const { name, image, category, status } = response.data.data;
          setImage(image);
          setDesc(name);
          setCategory(category)
          setStatus(status)
        } catch (error) {
          console.error('Error fetching sub Category details:', error);
        }
      };
      fetchSubCategorysDetails();
    }, [CategoryId]);





    const fd = new FormData();
    fd.append("image", image);
    fd.append("name", desc);
    fd.append("category", category);
    fd.append("status", status);
    const postData = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          `${Baseurl}api/admin/subcategories`,
          fd,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        showMsg("Success", "Sub Category Created", "success");
        props.onHide();
        fetchData();
      } catch (e) {
        console.log(e);
      }
    };
    const handlePutRequest = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.put(`${Baseurl}api/admin/subcategories/${CategoryId}`, fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // toast.success("User Updated successfully");
        showMsg("Success", "Sub Category Updated", "success");
        setModalShow(false);
        fetchData();
      } catch (error) {
        console.error('Error to updating Sub Category:', error)
        toast.error("Error to updating Sub Category")
      }
    }

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
        setDesc(desc1)
        setImage(image1)
        setCategory(category1)
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
            {edit ? "Edit Sub Category" : "Add Sub Category"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {image && (
            <div>
              <img
                src={image instanceof File ? URL.createObjectURL(image) : image}
                alt="Category Preview"
                style={{ width: "100px" }}
              />
            </div>
          )}
          <Form onSubmit={edit ? handlePutRequest : postData}>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Sub Category</Form.Label>
              <Form.Select
                aria-selected={category}
                aria-label="Default select example"
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
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Sub category name ..."
                required
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <div style={{ display: 'flex', gap: '20px' }}>
                <Form.Check
                  type="radio"
                  label="On"
                  name="status"
                  checked={status}
                  onChange={() => setStatus(true)}
                />
                <Form.Check
                  type="radio"
                  label="Off"
                  name="status"
                  checked={!status}
                  onChange={() => setStatus(false)}
                />
              </div>
            </Form.Group>

            <Button variant="outline-success" type="submit">
              {edit ? "Update" : "Submit"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  const deleteData = async (id) => {
    try {
      const { data } = await axios.delete(
        `${Baseurl}api/admin/subcategories/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchData();
      showMsg("Success", "sub Category Removed !", "success");
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
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center Heading_Container">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Sub Categories
          </span>
          <button
            onClick={() => {
              setEdit(false);
              setModalShow(true);
              setCategoryId(null)
              setDesc1(null)
              setImage1(null)
              setCategory1(null)
            }}
          >
            Create New
          </button>
        </div>

        <div className="table-component">
          <Table>
            <thead>
              <tr>
                <th>Sub Category Image</th>
                <th>Sub Category Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((i, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={i.image}
                      alt="CategoryImage"
                      style={{ width: "100px" }}
                    />
                  </td>
                  <td> {i.name} </td>
                  <td className={i.status ? "category120" : "category121"} >
                    {i.status ? (
                      <button>On</button>
                    ) : (
                      <button>Off</button>
                    )}
                  </td>
                  <td className="user121">
                    <i
                      className="fa-solid fa-trash"
                      onClick={() => deleteData(i._id)}
                    ></i>
                    <i
                      className="fa-solid fa-edit"
                      onClick={() => {
                        setCategoryId(i._id);
                        setModalShow(true);
                        setEdit(true)
                        setDesc1(i.name)
                        setImage1(i.image)
                        setCategory1(i.category)
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

export default HOC(Sub);
