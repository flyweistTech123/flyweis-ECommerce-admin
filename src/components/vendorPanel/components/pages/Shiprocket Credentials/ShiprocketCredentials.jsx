/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import axios from "axios";
import { Baseurl, Auth, showMsg } from "../../../../../Baseurl";

const ShiprocketCredentials = () => {
    const [modalShow, setModalShow] = React.useState(false);
    const [data, setData] = useState([]);
    const [edit, setEdit] = useState(false);
    const [id, setId] = useState('')

    const fetchData = async () => {
        try {
            const { data } = await axios.get(`${Baseurl}api/admin/ShiprocketCredentials`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setData(data.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    function PaymentGatwayModal(props) {
        const [name, setName] = useState("");
        const [apikey, SetApiKey] = useState("");
        const [isactive, SetIsActive] = useState("");
        const [livesandbox, Setlivesandbox] = useState("");


        useEffect(() => {
            const fetchShipRocketDetails = async () => {
                try {
                    const response = await axios.get(`${Baseurl}api/admin/ShiprocketCredentials/${id}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    });
                    const { name, apiKey, isActive, liveSandbox } = response.data.data;
                    setName(name);
                    SetApiKey(apiKey);
                    SetIsActive(isActive);
                    Setlivesandbox(liveSandbox)
                } catch (error) {
                    console.error('Error fetching Shiprocket Credentials  details:', error);
                }
            };
            fetchShipRocketDetails();
        }, [id]);

        const postData = async (e) => {
            e.preventDefault();
            const postData = {
                name: name,
                apiKey: apikey,
                isActive: isactive,
                liveSandbox: livesandbox,
            };
            try {
                const { data } = await axios.post(`${Baseurl}api/admin/ShiprocketCredentials`, postData, { // Use postData here
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                showMsg("Success", "Shiprocket Credentials Created!", "success");
                props.onHide();
                fetchData();
            } catch (error) {
                toast.error("Error to Add Shiprocket Credentials");
                console.error('Error adding Shiprocket Credentials:', error);
            }
        };





        const handlePutRequest = async (e) => {
            e.preventDefault();
            const data = {
                name: name,
                apiKey: apikey,
                isActive: isactive,
                liveSandbox: livesandbox,
            }

            try {
                const response = await axios.put(`${Baseurl}api/admin/ShiprocketCredentials/${id}`, data, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                // toast.success("User Updated successfully");
                showMsg("Success", "Shiprocket Credentials  Updated", "success");
                setModalShow(false);
                fetchData();
            } catch (error) {
                console.error('Error to updating Shiprocket Credentials :', error)
                toast.error("Error to updating Shiprocket Credentials ")
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
                        {edit ? "Edit Shiprocket Credentials" : "Add Shiprocket Credentials"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={edit ? handlePutRequest : postData}>
                        <Form.Group className="mb-3">
                            <Form.Label>Shiprocket Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter shiprocket name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>API Key</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter api key"
                                value={apikey}
                                onChange={(e) => SetApiKey(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Live Sandbox</Form.Label>
                            <div style={{ display: "flex", gap: "20px" }}>
                                <Form.Check
                                    type="radio"
                                    label="LIVE"
                                    name="live"
                                    checked={livesandbox === "LIVE"}
                                    onChange={() => Setlivesandbox("LIVE")}
                                />
                                <Form.Check
                                    type="radio"
                                    label="SANDBOX"
                                    name="live"
                                    checked={livesandbox === "SANDBOX"}
                                    onChange={() => Setlivesandbox("SANDBOX")}
                                />
                            </div>

                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <div style={{ display: "flex", gap: "20px" }}>
                                <Form.Check
                                    type="radio"
                                    label="Active"
                                    name="status"
                                    checked={isactive === true}
                                    onChange={() => SetIsActive(true)}
                                />
                                <Form.Check
                                    type="radio"
                                    label="Deactive"
                                    name="status"
                                    checked={isactive === false}
                                    onChange={() => SetIsActive(false)}
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
            const { data } = await axios.delete(`${Baseurl}api/admin/ShiprocketCredentials/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            fetchData();
            const msg = data.message;
            showMsg("Success", "delete successfully", "success")
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <PaymentGatwayModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <section>
                <div className="pb-4  w-full flex justify-between items-center Heading_Container">
                    <span className="tracking-widest text-slate-900 font-semibold uppercase ">
                        Shiprocket Credentials ( Total : {data?.length} )
                    </span>
                    <button
                        onClick={() => {
                            setEdit(false);
                            setModalShow(true);
                            setId(null)
                        }}
                    >
                        Add Credentials
                    </button>
                </div>
                {/* Add Form */}

                <div className="table-component">
                    <Table>
                        <thead>
                            <tr>
                                <th>Shiprocket Name</th>
                                <th>API Key</th>
                                <th>Live Sandbox</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((i, index) => (
                                <tr key={index}>
                                    <td>{i.name}</td>
                                    <td>{i.apiKey}</td>
                                    <td>{i.liveSandbox}</td>
                                    <td>{i.isActive ? "active" : "Deactivate"}</td>
                                    <td className="user121">
                                        <i
                                            className="fa-solid fa-trash"
                                            onClick={() => deleteData(i._id)}
                                        ></i>
                                        <i
                                            className="fa-solid fa-edit"
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

                    {/* <button onClick={() => setModalShow(true)}>nuu</button> */}
                </div>
            </section>
        </>
    );
};
export default HOC(ShiprocketCredentials);
