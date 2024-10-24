/** @format */
import React, { useEffect } from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

import axios from "axios";
import { Baseurl, showMsg } from "../../../../../Baseurl";

const Payment = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // State for filter status


  const fetchData = async () => {
    try {
      const response = await axios.get(`${Baseurl}api/admin/payment`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setData(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching payment data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const filteredData = data.filter((item) => {
    if (filterStatus === "all") {
      return true; // Show all data
    } else {
      return item?.order?.paymentStatus === filterStatus;
    }
  });


  function MyVerticallyCenteredModal(props) {
    const [status, setStatus] = useState("");

    const postData = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.put(
          `${Baseurl}api/admin/payment/${id}`,
          { status: status },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        showMsg("Success", "Status Edit", "success");
        props.onHide();
        fetchData();
      } catch (e) {
        console.log(e);
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
            {"Set Sta"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postData}>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <select
                class="form-select form-select-lg mb-3"
                aria-label=".form-select-lg example"
                placeholder="status  ..."
                required
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option selected>Open this select menu</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Failed">Failed</option>
              </select>
            </Form.Group>

            <Button variant="outline-success" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }



  const handleDownloadExcel = async () => {
    try {
      const response = await axios.get(`${Baseurl}api/admin/export/payment`, {
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
      link.setAttribute('download', 'Transactions.xlsx');

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


  const handleDownloadStatus = (pdfLink) => {
    const link = document.createElement("a");

    // Set the href attribute to the PDF link
    link.href = pdfLink;

    // Set the download attribute with the desired file name
    link.download = "invoice.pdf";

    // Append the link to the document body
    document.body.appendChild(link);

    // Trigger a click on the link to start the download
    link.click();

    // Remove the link from the document body
    document.body.removeChild(link);
  };




  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <section>
        <div className="pb-4 w-full flex justify-between items-center Heading_Container">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Payments
          </span>
          <div>
            {/* Filter dropdown */}
            <Form.Select onChange={handleFilterChange} value={filterStatus}>
              <option value="all">All</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Failed">Failed</option>
            </Form.Select>
          </div>
          <Button onClick={handleDownloadExcel}>Download Excel</Button>
        </div>

        <div className="table-component">
          <Table>
            <thead>
              <tr>
                <th>User</th>
                <th>Order</th>
                <th>Amount</th>
                <th>Payment Method</th>
                <th>Payment Status</th>
                <th>Download Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData?.map((i, index) => (
                <tr key={index}>
                  <td>{i?.order?.user?.userName ? i?.order?.user?.userName : "N/A"}</td>
                  <td>
                    {/* Displaying order details */}
                    {i?.order?.products?.map((product, idx) => (
                      <div key={idx}>
                        {product?.productName}
                      </div>
                    ))}
                  </td>
                  <td>{i?.amount}</td>
                  <td>{i?.paymentMethod}</td>
                  <td>{i?.order.paymentStatus}</td>
                  <td>
                    <Button onClick={() => handleDownloadStatus(i.pdfLink)}>
                      Download Invoice
                    </Button>
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

export default HOC(Payment);
