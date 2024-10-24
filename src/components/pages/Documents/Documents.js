/** @format */

import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { AiFillEdit, AiFillDelete, AiFillEye } from "react-icons/ai";
import HOC from "../../layout/HOC";
import axios from "axios";
import { toast } from "react-toastify";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Spin from "../../../Component/Spinner";

const Documents = () => {
  const [modalShow, setModalShow] = React.useState(false);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const Users = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "https://desh-deepak-backend.herokuapp.com/api/v1/admin/getUsers"
      );
      setData(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Network Issue");
      setLoading(false);
    }
  };

  useEffect(() => {
    Users();
  }, [axios, setLoading, setData, toast]);

  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Users
          </span>
        </div>
        <div style={{ maxWidth: "100%", overflow: "auto" }}>
          <Table style={{ paddingTop: "5%" }}>
            <thead>
              <tr className=" border-b bg-green-300 shadow-xl text-gray-900">
                <th>Image</th>
                <th>Name</th>
                <th>Mobile No.</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            {loading ? (
              <Spin />
            ) : (
              <tbody>
                {data?.users?.map((i, index) => (
                  <tr key={index} style={{ marginTop: "1%" }}>
                    <td>
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjIZZgK7627JesDPhNdTSESc9PHFn626zVBA0g_Bs&s"
                        className="img-fluid img-thumbnail"
                      />
                    </td>
                    <td>{i.name}</td>
                    <td> {i.phone}</td>
                    <td> {i.email}</td>
                    <td> {i.role}</td>
                  </tr>
                ))}
              </tbody>
            )}
          </Table>
        </div>
      </section>
    </>
  );
};

export default HOC(Documents);
