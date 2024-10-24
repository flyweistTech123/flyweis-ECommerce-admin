/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { Baseurl, Auth, showMsg } from "../../../../../Baseurl";
import { IoSearch } from "react-icons/io5";


const Order = () => {
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow1, setModalShow1] = React.useState(false);
  const [orderId, setOrderId] = useState('')
  const [filterOption, setFilterOption] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    getAllItems();
  }, []);

  const getAllItems = async () => {
    try {
      const usersResponse = await axios.get(`${Baseurl}api/admin/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const vendorsResponse = await axios.get(`${Baseurl}api/admin/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const productsResponse = await axios.get(`${Baseurl}api/admin/products`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // const users = usersResponse.data.users.filter(user => user.userType === 'User ');
      // const vendors = vendorsResponse.data.users.filter(user => user.userType === 'Vendor');

      setAllItems({
        user: usersResponse.data.users.filter(user => user.userType === "User"),
        vendor: vendorsResponse.data.users.filter(user => user.userType === "Vendor"),
        product: productsResponse.data.products,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };





  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  const handleItemClick = (itemId) => {
    setSearchQuery(itemId);
  };




  const fetchData = async () => {
    try {
      let url = `${Baseurl}/api/admin/order`; // Default URL for fetching all orders

      // If filter option and search query are set, construct the URL with filter
      if (filterOption && searchQuery) {
        url = `${Baseurl}/api/admin/${filterOption}/order/${searchQuery}`;
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  function OrderModal(props) {
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
      const fetchOrderDetails = async () => {
        try {
          const response = await axios.get(`${Baseurl}/api/admin/order/${orderId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setOrderDetails(response.data.data);
        } catch (error) {
          console.error('Error fetching Order details:', error);
        }
      };
      fetchOrderDetails();
    }, [orderId]);

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Order Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {orderDetails && (
            <div className="orderdetailss">
              <h6 className="details">Customer Details</h6>
              <p><strong>Username:</strong> {orderDetails?.user?.userName}</p>
              <p><strong>User Mobile Number:</strong> {orderDetails?.user?.mobileNumber}</p>
              <p><strong>Address:</strong> {orderDetails?.shippingAddress?.addressLine1}</p>
              <p><strong>City:</strong> {orderDetails?.shippingAddress?.city}</p>
              <p><strong>State:</strong> {orderDetails?.shippingAddress?.state}</p>
              <p><strong>Pin Code: </strong> {orderDetails?.shippingAddress?.postalCode}</p>
              <p><strong>Country:</strong> {orderDetails?.shippingAddress?.country}</p>

              <h6 className="details">Product Details</h6>
              {orderDetails && orderDetails.products && orderDetails.products.map((product, index) => (
                <div key={index}>
                  <p><strong>#Product {index + 1}</strong></p>
                  <p><strong>Product Name:</strong> {product?.product?.productName}</p>
                  <strong>Product Image</strong>
                  {product?.product?.image && product.product.image.length > 0 && (
                    <img src={product.product.image[0].url} alt="Product Image" style={{ width: '120px' }} />
                  )}
                  <p><strong>Vendor Name:</strong> {product?.vendorId?.userName}</p>
                  <p><strong>Vendor Mobile Number:</strong> {product?.vendorId?.mobileNumber}</p>
                  <p><strong>Size:</strong> {product?.size}</p>
                  <p><strong>Quantity:</strong> {product?.quantity}</p>
                  <p><strong>Price:</strong> {product?.price}</p>
                </div>
              ))}

              <h6 className="details">Order Status and Payment Details</h6>
              <p><strong>Total Amount:</strong> {orderDetails?.totalAmount}</p>
              <p><strong>Order Status:</strong> {orderDetails?.status}</p>
              <p><strong>Payment Status:</strong> {orderDetails?.paymentStatus}</p>
              <p><strong>Tracking Number:</strong> {orderDetails?.trackingNumber}</p>
              <p><strong>Payment Method:</strong> {orderDetails?.paymentMethod}</p>
              <p><strong>Is Refund:</strong> {orderDetails?.isRefund ? 'Yes' : 'No'}</p>
              <p><strong>Refund Status:</strong> {orderDetails?.refundStatus}</p>
            </div>
          )}
        </Modal.Body>
      </Modal>
    );
  }


  function OrderStatusModal(props) {
    const [orderstatus, setOrderstatus] = useState("");

    useEffect(() => {
      const fetchOrderDetails = async () => {
        try {
          const response = await axios.get(`${Baseurl}/api/admin/order/${orderId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setOrderstatus(response.data.data.status);
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
          `${Baseurl}api/admin/order/${orderId}/status`,
          {
            status: orderstatus,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        fetchData();
        props.onHide();
        showMsg("Success", "Order Status Updated", "success")
      } catch (error) {
        toast.error("Error to Update Vendor Order");
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
          <Modal.Title id="contained-modal-title-vcenter">Update Order Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handlePut}>
            <Form.Group className="mb-3">
              <div style={{ display: "flex", gap: "20px" }}>
                <Form.Check
                  type="radio"
                  label="Pending"
                  name="status"
                  checked={orderstatus === "Pending"}
                  onChange={() => setOrderstatus("Pending")}
                />
                <Form.Check
                  type="radio"
                  label="Processing"
                  name="status"
                  checked={orderstatus === "Processing"}
                  onChange={() => setOrderstatus("Processing")}
                />
                <Form.Check
                  type="radio"
                  label="Shipped"
                  name="status"
                  checked={orderstatus === "Shipped"}
                  onChange={() => setOrderstatus("Shipped")}
                />
                <Form.Check
                  type="radio"
                  label="Delivered"
                  name="status"
                  checked={orderstatus === "Delivered"}
                  onChange={() => setOrderstatus("Delivered")}
                />
                <Form.Check
                  type="radio"
                  label="Cancelled"
                  name="status"
                  checked={orderstatus === "Cancelled"}
                  onChange={() => setOrderstatus("Cancelled")}
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

  const renderItemName = (item, filterOption) => {
    switch (filterOption) {
      case 'user':
        return item.userName;
      case 'vendor':
        return item.userName;
      case 'product':
        return item.productName;
      default:
        return '';
    }
  };

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
      link.setAttribute('download', 'Order.xlsx');

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
  }, [searchQuery]);

  return (
    <>
      <OrderModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <OrderStatusModal
        show={modalShow1}
        onHide={() => setModalShow1(false)}
      />
      <section>
        <div className="pb-4   w-full flex justify-between items-center Heading_Container">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Orders
          </span>
          <Button onClick={handleDownloadExcel}>Download Excel</Button>
          <div className="selectsearch">
            <select value={filterOption} onChange={handleFilterChange}>
              <option value="">Select Filter</option>
              <option value="user">User</option>
              <option value="vendor">Vendor</option>
              <option value="product">Product</option>
            </select>
            {filterOption && allItems[filterOption] && (
              <div className="selectsearch">
                <select onChange={(e) => handleItemClick(e.target.value)} className="mb-2">
                  <option value="">Select {filterOption}</option>
                  {allItems[filterOption].map((item) => (
                    <option key={item._id} value={item._id}>{renderItemName(item, filterOption)}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

        </div>
        {/* Add Form */}


        <div className="table-component">
          <Table>
            <thead>
              <tr>
                <th>User Name</th>
                <th>Vendor  Name</th>
                <th>Product</th>
                <th>Grand Total</th>
                <th>Payment Status</th>
                <th>Payment Method</th>
                <th>Order Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.orders?.map((i, index) => (
                <tr key={index}>
                  <td>{i?.user?.userName} </td>
                  <td>{i?.products[0]?.vendorId?.userName} </td>
                  <td>
                    <ul style={{ listStyle: "disc" }}>
                      {i.products?.map((item) => (
                        <li key={item._id}> {item?.product?.productName} </li>
                      ))}
                    </ul>
                  </td>
                  <td>{i?.totalAmount} </td>
                  <td>{i?.paymentStatus} </td>
                  <td>{i?.paymentMethod} </td>
                  <td>{i?.status} </td>
                  <td className="user121">
                    <i>
                      <button onClick={() => {
                        setOrderId(i?._id);
                        setModalShow(true);
                      }}>More Details</button>
                    </i>

                    <i
                      className="fa-solid fa-edit"
                      onClick={() => {
                        setOrderId(i?._id);
                        setModalShow1(true);
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

export default HOC(Order);
