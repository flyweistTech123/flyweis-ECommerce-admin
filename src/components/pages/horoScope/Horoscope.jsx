import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import HOC from "../../layout/HOC";
import { AiOutlineEdit } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";

function Horoscope() {
  const [id, setId] = useState("");
  const [popup, setPopup] = useState(false);
  const [data, setData] = useState([]);

  
  const [editH, setEditH] = useState(false);
  const [date, setD] = useState("");
  const [horoScope, setH] = useState("");
  const [profession, setP] = useState("");
  const [emotion, setE] = useState("");
  const [health, setHH] = useState("");
  const [travel, setT] = useState("");
  const [love, setL] = useState("");
  const [luck, setLK] = useState("");

  const token = localStorage.getItem("token");

  const fetchdata = async () => {
    try {
      const { data } = await axios.get(
        "https://astrologer-panel.herokuapp.com/horoscope",
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

  const addHor = async (e) => {
    e.preventDefault();
    const FormData = {
      date,
      horoScope,
      profession,
      emotion,
      health,
      travel,
      love,
      luck,
    };
    try {
      const { data } = await axios.post(
        "https://astrologer-panel.herokuapp.com/horoscope",
        FormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("horoscope added successfully");
      setPopup(false);
      fetchdata();
    } catch (err) {
      console.log(err);
    }
  };

  const editHor = async (e) => {
    e.preventDefault();
    const FormData = {
      date,
      horoScope,
      profession,
      emotion,
      health,
      travel,
      love,
      luck,
    };
    try {
      const { data } = await axios.put(
        `https://astrologer-panel.herokuapp.com/horoscope/${id}`,
        FormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("horoscope Edited successfully");
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
          HoroScope
        </span>
        <button
          className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[rgb(241,146,46)] text-white tracking-wider "
          onClick={() => {
            setEditH(false);
            setPopup(!popup);
          }}
        >
          Add HoroScope
        </button>
      </div>

      {/* Add HoroScope */}

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
              {editH ? "Edit horoscope" : "Add Horoscope"}
            </span>
            <div className="text-[rgb(241,146,46)] py-0.5 text-2xl cursor-pointer font-medium tracking-wider">
              <IoMdClose
                onClick={() => {
                  setPopup(false);
                }}
              />{" "}
            </div>
          </div>

          <form
            className="grid  grid-cols-1 gap-x-7 gap-y-4 p-4"
            style={{ height: "80vh" }}
            onSubmit={editH ? editHor : addHor}
          >
            {/* Date */}
            <div className="inline-flex  w-full flex-col">
              <label className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm">
                Date
              </label>
              <input
                required
                type="date"
                onChange={(e) => setD(e.target.value)}
                className=" text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-[rgb(241,146,46)]"
              />
            </div>
            <div className="inline-flex  w-full flex-col">
              <label className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm">
                Horocope
              </label>
              <input
                required
                type="text"
                onChange={(e) => setH(e.target.value)}
                className=" text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-[rgb(241,146,46)]"
              />
            </div>
            <div className="inline-flex  w-full flex-col">
              <label className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm">
                Profession
              </label>
              <input
                required
                type="text"
                onChange={(e) => setP(e.target.value)}
                className=" text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-[rgb(241,146,46)]"
              />
            </div>
            <div className="inline-flex  w-full flex-col">
              <label className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm">
                Emotions
              </label>
              <input
                required
                type="text"
                onChange={(e) => setE(e.target.value)}
                className=" text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-[rgb(241,146,46)]"
              />
            </div>
            <div className="inline-flex  w-full flex-col">
              <label className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm">
                health
              </label>
              <input
                required
                type="text"
                onChange={(e) => setHH(e.target.value)}
                className=" text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-[rgb(241,146,46)]"
              />
            </div>
            <div className="inline-flex  w-full flex-col">
              <label className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm">
                Travel
              </label>
              <input
                required
                type="text"
                onChange={(e) => setT(e.target.value)}
                className=" text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-[rgb(241,146,46)]"
              />
            </div>
            <div className="inline-flex  w-full flex-col">
              <label className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm">
                Love
              </label>
              <input
                required
                type="text"
                onChange={(e) => setL(e.target.value)}
                className=" text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-[rgb(241,146,46)]"
              />
            </div>

            <div className="inline-flex  w-full flex-col">
              <label className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm">
                Luck
              </label>
              <input
                required
                type="text"
                onChange={(e) => setLK(e.target.value)}
                className=" text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-[rgb(241,146,46)]"
              />
            </div>

            <button
              type="submit"
              className="bg-[rgb(241,146,46)] flex items-center justify-center cursor-pointer w-40 hover:bg-[rgb(241,146,46)] py-1 rounded-full my-4 "
            >
              {editH ? "Edit Horoscope" : "Add Horoscope"}
            </button>
          </form>
        </div>
      </section>

      {/* ------------------------------- */}

      {/* Data  */}

      <div className=" wcomp overflow-y-auto">
        <table className="table-auto  w-full text-left whitespace-no-wrap">
          <thead>
            <tr className=" border-b bg-green-300 shadow-xl text-gray-900">
              <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                Date
              </th>
              <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                HoroScope
              </th>
              <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                Profession
              </th>
              <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                Emotion
              </th>
              <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                Health
              </th>
              <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                Travel
              </th>
              <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                Love
              </th>
              <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                Luck
              </th>
              <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                Actions
              </th>
            </tr>
          </thead>
          <tbody style={{ color: "black" }}>
            {data?.data?.map((i) => (
              <tr className="tracking-wider text-gray-900 ">
                <td className=" py-3 w-36 md:text-base text-sm "> {i.date} </td>
                <td className=" py-3 w-36 md:text-base text-sm ">
                  {" "}
                  {i.horoScope}{" "}
                </td>
                <td className=" py-3 w-36 md:text-base text-sm ">
                  {" "}
                  {i.profession}{" "}
                </td>
                <td className=" py-3 w-36 md:text-base text-sm ">
                  {" "}
                  {i.emotion}{" "}
                </td>
                <td className=" py-3 w-36 md:text-base text-sm ">
                  {" "}
                  {i.health}{" "}
                </td>
                <td className=" py-3 w-36 md:text-base text-sm ">
                  {" "}
                  {i.travel}{" "}
                </td>
                <td className=" py-3 w-36 md:text-base text-sm "> {i.love} </td>
                <td className=" py-3 w-36 md:text-base text-sm "> {i.luck} </td>
                <td className=" py-3 w-36 md:text-base text-sm ">
                  {" "}
                  <AiOutlineEdit
                    onClick={() => {
                      setEditH(true);
                      setPopup(!popup);
                      setId(i._id);
                    }}
                  />{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default HOC(Horoscope);
