/** @format */

import React from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const naviagte = useNavigate();

  const varifyOTP = async () => {
    naviagte("/resetPassword");
  };

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center bg-slate-100">
        <form className="shadow-2xl w-96 mx-3 sm:mx-0 sm:w-4/5 md:w-4/6 lg:w-4/5 xl:w-1/2 flex flex-col items-center bg-white p-5 md:py-10 rounded-tl-3xl rounded-br-3xl">
          <p className="text-3xl">Verify OTP</p>
          <section className="py-7 space-y-6">
            {/* Email */}
            <div className="shadow-2xl sm:w-96 border border-[rgb(241,146,46)] space-x-4 flex items-center w-64  p-2 rounded-md">
              <input
                type="text"
                placeholder="Verify OTP"
                required
                maxLength='4'
                className="outline-none px-0.5  bg-transparent tracking-wider w-full"
              />
              <AiOutlineMessage className="text-xl " />
            </div>
            <button
              type="submit"
              onClick={() => varifyOTP()}
              className="py-2 cursor-pointer tracking-wider bg-orange-600 flex justify-center items-center w-full rounded-md font-medium   "
            >
              <div className="flex items-center">
                <span className="flex items-center justify-center">
                  {" "}
                  Verify OTP{" "}
                </span>
              </div>
            </button>
          </section>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
