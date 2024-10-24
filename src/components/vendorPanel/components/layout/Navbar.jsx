/** @format */

import { RiMenu4Line } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = ({ hamb, setHamb }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className={
          hamb
            ? "flex  w-full justify-between  my-1 rounded-sm  p-4 py-3 shadow-md items-center  bg-[#444444] space-x-4"
            : "flex  w-full justify-between my-1 rounded-sm  p-4 py-3 shadow-md items-center  bg-[#444444] space-x-4"
        }
      >
        <RiMenu4Line
          onClick={() => setHamb(!hamb)}
          className="text-2xl font-bold text-[#fff] hover:scale-90 cursor-pointer"
        />

        <section className="flex sm:ml-auto justify-end sm:w-full items-center space-x-2  pr-2">
          <figcaption className="tracking-wider pl-1 font-semibold">
            <div style={{ display: "flex" }}>
              <div className="lg:text-base text-sm text-[#fff]  uppercase">
                Welcome Admin
              </div>
              <div
                onClick={() => navigate("/updateadminprofile")}
                className="cursor-pointer text-white"
              >
                <FaUserAlt
                  style={{ margin: "0 10px 0", height: "20px", width: "20px" }}
                />
              </div>
            </div>
          </figcaption>
        </section>
      </div>
    </>
  );
};

export default Navbar;
