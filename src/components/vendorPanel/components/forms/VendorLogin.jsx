/** @format */

import React, { useState } from "react";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { AiFillPhone } from "react-icons/ai";
import { BiLogInCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import axios from "axios";
import { Baseurl, showMsg } from "../../../../Baseurl";

const VendorLogin = () => {
  const [pass, setPass] = useState(false);
  const [inputpass, setInputpass] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setpassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${Baseurl}api/admin/login`, {
        email: phone,
        password: password,
      });
      localStorage.setItem("token", data?.token);
      localStorage.setItem("userId", data?.data?._id);
      showMsg("Success", "Welcome Admin", "success");
      setLoading(false);
      navigate("/vendorDashboard");
    } catch (err) {
      console.log(err);
      toast.error(
        err?.response?.data?.message
          ? err?.response?.data?.message
          : "SomeThing is wrong"
      );

      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center bg-[#242424]">
        <form
          className="shadow-2xl w-96 mx-3 sm:mx-0 sm:w-4/5 md:w-4/6 lg:w-4/5 xl:w-1/2 flex flex-col items-center bg-[#444444] p-5 md:py-10 "
          onSubmit={submitHandler}
        >
          <p className="text-3xl text-[#fff]"> Admin Panel </p>
          <section className="py-7 space-y-6">
            {/* Email */}
            <div
              className="shadow-2xl sm:w-96  space-x-4 flex items-center w-64  p-2 rounded-md"
              style={{
                color: "#fff",
                borderColor: "#242424",
                background: "#242424",
              }}
            >
              <input
                type="email"
                placeholder="Email address"
                required
                onChange={(e) => setPhone(e.target.value)}
                className="outline-none px-0.5  bg-transparent tracking-wider w-full"
              />
              <AiFillPhone className="text-xl " />
            </div>
            {/* Password */}
            <div
              className="shadow-2xl sm:w-96  space-x-4 flex items-center w-64  p-2 rounded-md"
              style={{
                color: "#fff",
                borderColor: "#242424",
                background: "#242424",
              }}
            >
              <input
                type={inputpass ? "text" : "password"}
                placeholder="password"
                name="password"
                required
                onChange={(e) => setpassword(e.target.value)}
                className="outline-none px-0.5  bg-transparent tracking-wider w-full"
              />
              <span
                onClick={() => {
                  setPass(!pass);
                  setInputpass(!inputpass);
                }}
                className="text-xl cursor-pointer hover:scale-90 "
              >
                {pass ? <VscEyeClosed /> : <VscEye />}
              </span>
            </div>

            <button
              type="submit"
              className="py-2 cursor-pointer tracking-wider bg-[#242424] text-[#fff] flex justify-center items-center w-full rounded-md font-medium   "
            >
              {loading ? (
                <Oval height={30} secondaryColor="#fff" color="#fff" />
              ) : (
                <div className="flex items-center">
                  <span className="flex items-center justify-center">
                    LOG In
                  </span>
                  <BiLogInCircle className="pl-1.5 text-2xl" />
                </div>
              )}
            </button>
            <button
              onClick={() => navigate("/vendorLogin")}
              className="py-2 cursor-pointer tracking-wider bg-[#242424] text-[#fff] flex justify-center items-center w-full rounded-md font-medium   "
            >
              <div className="flex items-center">
                <span className="flex items-center justify-center">
                  Vendor Login
                </span>
                <BiLogInCircle className="pl-1.5 text-2xl" />
              </div>
            </button>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p
                onClick={() => navigate("/adminRegister")}
                className="cursor-pointer text-white"
              >
                New Admin Register
              </p>
            </div>
          </section>
        </form>
      </div>
    </>
  );
};

export default VendorLogin;
