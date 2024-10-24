/** @format */

import { useState, useEffect } from "react";
import axios from "axios";
import HOC from "../../layout/HOC";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

function Specification() {
  const [data, setData] = useState([]);
  const [popup, setPopup] = useState(false);

  const [specification, setS] = useState("");
  const [detail, setD] = useState("");

  const token = localStorage.getItem("token");

  const fetchdata = async () => {
    try {
      const { data } = await axios.get(
        "https://astrologer-panel.herokuapp.com/specification",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchdata();
  }, [axios, token]);

  const addSpec = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://astrologer-panel.herokuapp.com/specification",
        {
          specification,
          data: detail,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Specification added successFully");
      setPopup(false);
      fetchdata();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
        <span className="tracking-widest text-slate-900 font-semibold uppercase ">
          Specification
        </span>
        <button
          className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[rgb(241,146,46)] text-white tracking-wider "
          onClick={() => {
            setPopup(!popup);
          }}
        >
          Add Specification
        </button>
      </div>
      <section
        className={
          popup
            ? "fixed top-0 left-0 wcomp bg-[rgb(0,0,0,0.5)] transition-all duration-150 w-full flex justify-center items-center overflow-y-auto  h-screen "
            : "hidden"
        }
      >
        <div className="bg-slate-100 overflow-y-auto  lg:w-3/6  md:w-4/6 w-5/6 mx-auto  rounded-lg">
          <div className="flex sticky top-0 py-3 px-5 bg-slate-100 justify-between">
            <span className=" font-semibold text-[rgb(241,146,46)] ">
              Add Specification
            </span>
            <div className="text-[rgb(241,146,46)] py-0.5 text-2xl cursor-pointer font-medium tracking-wider">
              <IoMdClose
                onClick={() => {
                  setPopup(false);
                }}
              />{" "}
            </div>
          </div>

          <form className=" p-4" onSubmit={addSpec}>
            <div className="inline-flex  w-full flex-col">
              <label className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm">
                Specification
              </label>
              <input
                required
                type="text"
                onChange={(e) => setS(e.target.value)}
                className=" text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-[rgb(241,146,46)]"
              />
            </div>
            <div className="inline-flex  w-full flex-col">
              <label className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm">
                Detail
              </label>
              <input
                required
                type="text"
                onChange={(e) => setD(e.target.value)}
                className=" text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-[rgb(241,146,46)]"
              />
            </div>

            <br />
            <br />

            <button
              type="submit"
              className="bg-[rgb(241,146,46)] flex items-center justify-center cursor-pointer w-40 hover:bg-[rgb(241,146,46)] py-1 rounded-full"
            >
              Add
            </button>
          </form>
        </div>
      </section>

      {/* -------------------------------------------------------------------------  */}

      <div className=" wcomp overflow-y-auto">
        <table className="table-auto  w-full text-left whitespace-no-wrap">
          <thead>
            <tr className=" border-b bg-green-300 shadow-xl text-gray-900">
              <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                Specification
              </th>
              <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                Data
              </th>
              <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                Status
              </th>
              <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((i) => (
              <tr className="tracking-wider text-gray-900 ">
                <td className=" py-3 w-36 md:text-base text-sm ">
                  {" "}
                  {i.specification}{" "}
                </td>
                <td className=" py-3 w-36 md:text-base text-sm "> {i.data} </td>
                <td className=" py-3 w-36 md:text-base text-sm ">
                  {" "}
                  {i.status}{" "}
                </td>
                <td
                  className=" py-3 w-36 md:text-base text-sm "
               
                >
                <span style={{display : 'flex' , gap :'20px'}}>
                <AiFillDelete color = 'red' />
                  <AiFillEdit color = 'blue'  />
                </span>
             
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default HOC(Specification);
