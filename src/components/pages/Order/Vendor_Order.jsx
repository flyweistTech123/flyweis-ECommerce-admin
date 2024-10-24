/** @format */
import React, { useEffect } from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Baseurl, showMsg } from "../../../Baseurl";
import { FaEye } from "react-icons/fa";

const Vendor_Order = () => {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = React.useState(false);
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}api/vendor/order`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setData(data.orders);
      console.log(data.orders);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center Heading_Container">
          <span className="tracking-widest text-slate-900 font-semibold uppercase text-black">
            All Orders
          </span>
        </div>

        <div className="table-component">
          <Table>
            <thead>
              <tr>
                <th>UserName</th>
                <th>Products Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((i, index) => (
                <tr key={index}>
                  <td>{i?.user?.userName}</td>
                  <td>
                    {" "}
                    {i?.products?.map((p, index) => (
                      <p>{p?.product?.productName}</p>
                    ))}{" "}
                  </td>
                  <td>
                    <div
                      onClick={() =>
                        navigate(`/vendor_single_order_page/${i._id}`)
                      }
                    >
                      <FaEye
                        style={{
                          width: "30px",
                          height: "30px",
                          cursor: "pointer",
                        }}
                      />
                    </div>
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

export default HOC(Vendor_Order);
