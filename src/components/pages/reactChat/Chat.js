/** @format */

import React, { useEffect, useState } from "react";
import {  AiFillDelete } from "react-icons/ai";
import HOC from "../../layout/HOC";
import axios from "axios";
import { toast } from "react-toastify";
import Table from "react-bootstrap/Table";
import Spin from "../../../Component/Spinner";


const Chat = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  // All Complaints

  const Complaints = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "https://desh-deepak-backend.herokuapp.com/api/v1/complaints"
      );
      setData(data);
      console.log(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Network Issue");
    }
  };

  useEffect(() => {
    Complaints();
  }, [axios, setData, setLoading, toast]);
  //-------------------------------------------------------

  // Delete Complaint

  const deleteComplaint = async (id) => {
    try {
      const data = await axios.delete(
        `https://desh-deepak-backend.herokuapp.com/api/v1/complaints/${id}`
      );
      toast.success("Complaint Success Deleted Successfully");
      Complaints();
    } catch (err) {
      console.log(err);
      toast.error("Network Issue");
    }
  };

  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Complaints
          </span>
        </div>

        <div style={{ maxWidth: "100%", overflow: "auto" }}>
          <Table style={{ paddingTop: "5%" }}>
            <thead>
              <tr className=" border-b bg-green-300 shadow-xl text-gray-900">
                <th>User</th>
                <th> Complaint </th>

                <th>Actions</th>
              </tr>
            </thead>

            {loading ? (
              <Spin />
            ) : (
              <tbody>
                {data?.data?.map((i, index) => (
                  <tr key={index} style={{ marginTop: "1%" }}>
                    <td> {i.name}</td>
                    <td> {i.message}</td>
                    <td>
                      <AiFillDelete
                        color="red"
                        cursor="pointer"
                        onClick={(e) => deleteComplaint(i._id)}
                      />
                    </td>
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

export default HOC(Chat);
