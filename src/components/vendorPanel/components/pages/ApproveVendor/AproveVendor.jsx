/** @format */

import React, { useCallback, useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";
import { Baseurl, Auth, showMsg } from "../../../../../Baseurl";

const AproveVendor = () => {
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [user, setUser] = useState('')

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}api/admin/approved-vendors`, {
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


  function UpdateVendorModal(props) {
    const [username, setUserName] = useState(props?.data?.userName || '');
    const [mobilenumber, setMobileNumber] = useState(props?.data?.mobileNumber || '');
    const [email, setEmail] = useState(props?.data?.email || '');
    const [isActive, setIsActive] = useState(props?.data?.isVendorVerified || '');
    const [userid, setUserID] = useState(props?.data?._id || '')



    const handleApproveAndProfileUpdate = async () => {
      // Validate input data
      if (!username || !mobilenumber || !email) {
        toast.error("Please provide all required fields.");
        return;
      }

      try {
        // Approve vendor
        await axios.put(
          `${Baseurl}api/admin/approve-vendor/${userid}`,
          { isVendorVerified: isActive },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // Update vendor profile
        const profileData = {
          userName: username,
          mobileNumber: mobilenumber,
          email: email,
        };

        const response = await axios.put(
          `${Baseurl}api/admin/update/${userid}`,
          profileData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 200) {
          showMsg("Success", "Vendor updated successfully", "success");
          setModalShow(false);
          fetchData();
        } else {
          toast.error("Failed to update vendor.");
        }
      } catch (error) {
        console.error('Error updating vendor:', error);
        toast.error("Error updating vendor");
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
            Edit Approved Vendor Profile/View
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleApproveAndProfileUpdate}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter mobile number"
                value={mobilenumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <div>
                <Form.Check
                  type="radio"
                  label="Active"
                  name="status"
                  checked={isActive}
                  onChange={() => setIsActive(true)}
                />
                <Form.Check
                  type="radio"
                  label="Deactive"
                  name="status"
                  checked={!isActive}
                  onChange={() => setIsActive(false)}
                />
              </div>
            </Form.Group>

            <Button variant="outline-success" type="submit">
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }


  const deleteData = async (id) => {
    try {
      const { data } = await axios.delete(`${Baseurl}api/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchData();
      const msg = data.message;
      showMsg("Success", msg, "success");
    } catch (e) {
      console.log(e);
    }
  };

  const handleDownloadExcel = async () => {
    try {
      const response = await axios.get(`${Baseurl}api/admin/export/customers`, {
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
      link.setAttribute('download', 'vendor.xlsx');

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

  return (
    <>
      <UpdateVendorModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        data={user}
      />
      <section>
        <div className="pb-4  w-full flex justify-between items-center Heading_Container">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Approve Vendor ( Total : {data?.length} )
          </span>
          <Button onClick={handleDownloadExcel}>Download Excel</Button>
        </div>
        {/* Add Form */}

        <div className="table-component">
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile No.</th>
                <th>Email</th>
                <th>User Type</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((i, index) => (
                <tr key={index}>
                  <td>{i.userName}</td>
                  <td>{i.mobileNumber}</td>
                  <td>{i.email}</td>
                  <td>{i.userType}</td>
                  <td>{i.isVendorVerified ? "active" : "Deactivate"}</td>
                  <td className="user121">
                    <i
                      className="fa-solid fa-trash"
                      onClick={() => deleteData(i._id)}
                    ></i>
                    <i
                      className="fa-solid fa-edit"
                      onClick={() => {
                        setUser(i);
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
export default HOC(AproveVendor);
