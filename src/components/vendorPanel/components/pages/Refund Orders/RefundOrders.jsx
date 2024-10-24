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

const RefundOrders = () => {
    const [data, setData] = useState([]);
    // const [id, setId] = useState("");
    const [modalShow, setModalShow] = React.useState(false);
    const [orderId, setOrderId] = useState('')


    const fetchData = async () => {
        try {
            const { data } = await axios.get(`${Baseurl}api/admin/refund-orders`, {
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
    const handle_update = (id) => {
        setOrderId(id);
        setModalShow(true);
    };

    function RefundStatusModal(props) {
        const [refundstatus, setRefundstatus] = useState("");

        useEffect(() => {
            const fetchOrderDetails = async () => {
                try {
                    const response = await axios.get(`${Baseurl}/api/admin/order/${orderId}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    });
                    setRefundstatus(response.data.data.refundStatus);
                } catch (error) {
                    console.error('Error fetching Order details:', error);
                }
            };
            fetchOrderDetails();
        }, [orderId]);

        const handlePut = async (e) => {
            e.preventDefault();
            try {
                await axios.put(
                    `${Baseurl}api/admin/refund-orders/${orderId}`,
                    {
                        refundStatus: refundstatus,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                fetchData();
                props.onHide();
                showMsg("Success", "Refund Status Updated", "success")
            } catch (error) {
                toast.error("Error to Update Refund Status");
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
                    <Modal.Title id="contained-modal-title-vcenter">Update Refund Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handlePut}>
                        <Form.Group className="mb-3">
                            <div style={{ display: "flex", gap: "20px" }}>
                                <Form.Check
                                    type="radio"
                                    label="Pending"
                                    name="status"
                                    checked={refundstatus === "Pending"}
                                    onChange={() => setRefundstatus("Pending")}
                                />
                                <Form.Check
                                    type="radio"
                                    label="Processing"
                                    name="status"
                                    checked={refundstatus === "Processing"}
                                    onChange={() => setRefundstatus("Processing")}
                                />
                                <Form.Check
                                    type="radio"
                                    label="Shipped"
                                    name="status"
                                    checked={refundstatus === "Completed"}
                                    onChange={() => setRefundstatus("Completed")}
                                />
                                <Form.Check
                                    type="radio"
                                    label="Delivered"
                                    name="status"
                                    checked={refundstatus === "Failed"}
                                    onChange={() => setRefundstatus("Failed")}
                                />
                            </div>
                        </Form.Group>
                        <Modal.Footer>
                            <Button type="submit">Update</Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <RefundStatusModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <section>
                <div className="pb-4  w-full flex justify-between items-center Heading_Container">
                    <span className="tracking-widest text-slate-900 font-semibold uppercase ">
                        All Refund Order ( Total : {data?.length} )
                    </span>
                </div>
                {/* Add Form */}

                <div className="table-component">
                    <Table>
                        <thead>
                            <tr>
                                <th>Customer Name</th>
                                <th>Vendor Name</th>
                                <th>Product Name</th>
                                <th>Total Amount</th>
                                <th>Order Status</th>
                                <th>Tracking Number</th>
                                <th>Refund Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((i, index) => (
                                <tr key={index}>
                                    <td>{i?.user?.userName}</td>
                                    <td>{i?.products[0]?.vendorId?.userName} </td>
                                    <td>
                                        <ul style={{ listStyle: "disc" }}>
                                            {i.products?.map((item) => (
                                                <li key={item._id}> {item?.product?.productName} </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>{i?.totalAmount} </td>
                                    <td>{i?.status} </td>
                                    <td>{i?.trackingNumber} </td>
                                    <td>{i?.refundStatus} </td>
                                    <td>
                                        <i
                                            className="fa-solid fa-edit"
                                            onClick={() => {
                                                setOrderId(i?._id);
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
export default HOC(RefundOrders);
