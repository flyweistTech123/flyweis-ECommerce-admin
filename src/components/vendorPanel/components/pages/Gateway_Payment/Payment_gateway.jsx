/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import axios from "axios";
import { Baseurl, Auth, showMsg } from "../../../../../Baseurl";

const Payment_gateway = () => {
    const [modalShow, setModalShow] = React.useState(false);
    const [data, setData] = useState([]);
    const [edit, setEdit] = useState(false);
    const [id, setId] = useState('')

    const fetchData = async () => {
        try {
            const { data } = await axios.get(`${Baseurl}api/admin/paymentgateways`, {
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
        const [gatewayname, setGatewayName] = useState("");
        const [apikey, SetApiKey] = useState("");
        const [secretkey, SetSecretKey] = useState("");
        const [isactive, SetIsActive] = useState("");
        const [livesandbox, Setlivesandbox] = useState("");


        useEffect(() => {
            const fetchGatwayDetails = async () => {
                try {
                    const response = await axios.get(`${Baseurl}api/admin/paymentgateways/${id}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    });
                    const { name, apiKey, secretKey, isActive, liveSandbox } = response.data.data;
                    setGatewayName(name);
                    SetApiKey(apiKey);
                    SetSecretKey(secretKey);
                    SetIsActive(isActive);
                    Setlivesandbox(liveSandbox)
                } catch (error) {
                    console.error('Error fetching Payment gateway  details:', error);
                }
            };
            fetchGatwayDetails();
        }, [id]);

        const postData = async (e) => {
            e.preventDefault();
            const postData = { // Define postData object here
                name: gatewayname,
                apiKey: apikey,
                secretKey: secretkey,
                isActive: isactive,
                liveSandbox: livesandbox,
            };
            try {
                const { data } = await axios.post(`${Baseurl}api/admin/paymentgateways`, postData, { // Use postData here
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                showMsg("Success", "Payment gateway Created!", "success");
                props.onHide();
                fetchData();
            } catch (error) {
                toast.error("Error to Add Payment gateway");
                console.error('Error adding Payment gateway:', error);
            }
        };





        const handlePutRequest = async (e) => {
            e.preventDefault();
            const data = {
                name: gatewayname,
                apiKey: apikey,
                secretKey: secretkey,
                isActive: isactive,
                liveSandbox: livesandbox,
            }

            try {
                const response = await axios.put(`${Baseurl}api/admin/paymentgateways/${id}`, data, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                // toast.success("User Updated successfully");
                showMsg("Success", "Payment gateway  Updated", "success");
                setModalShow(false);
                fetchData();
            } catch (error) {
                console.error('Error to updating Payment gateway :', error)
                toast.error("Error to updating Payment gateway ")
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
                        {edit ? "Edit Payment Gateway Credentials" : "Add Payment Gateway Credentials"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={edit ? handlePutRequest : postData}>
                        <Form.Group className="mb-3">
                            <Form.Label>Gateway Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Payment gateway name"
                                value={gatewayname}
                                onChange={(e) => setGatewayName(e.target.value)}
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
                            <Form.Label>Secret key</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter secret key"
                                value={secretkey}
                                onChange={(e) => SetSecretKey(e.target.value)}
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
            const { data } = await axios.delete(`${Baseurl}api/admin/paymentgateways/${id}`, {
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
                        Payment Gateway Credentials ( Total : {data?.length} )
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
                                <th>Payment Gateway Name</th>
                                <th>API Key</th>
                                <th>Secret Key</th>
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
                                    <td>{i.secretKey}</td>
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
export default HOC(Payment_gateway);
