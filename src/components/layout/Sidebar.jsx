/** @format */

import React from "react";
import { RiCloseLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { BiLogOutCircle, BiCategory } from "react-icons/bi";
import { TbDiscount } from "react-icons/tb";
import { FaProductHunt } from "react-icons/fa";
import { BsFillCartFill } from "react-icons/bs";

import { MdDashboardCustomize } from "react-icons/md";
import { toast } from "react-toastify";

const Sidebar = ({ hamb, setHamb }) => {
  const navigate = useNavigate();

  const nav = [
    {
      icon: <MdDashboardCustomize className="text-xl mr-3" />,
      link: "/adminDashboard",
      name: "Dashboard",
    },
    {
      icon: <FaProductHunt className="text-xl mr-3" />,
      link: "/venderProduct",
      name: "Products",
    },
    {
      icon: <BiCategory className="text-xl mr-3" />,
      link: "/vendorCategory",
      name: "Categories",
    },
    {
      icon: <BsFillCartFill className="text-xl mr-3" />,
      link: "/vendorSubCategory",
      name: "SubCategory",
    },
    {
      icon: <TbDiscount className="text-xl mr-3" />,
      link: "/VendorOrder",
      name: "Order",
    },
  ];

  const logOut = () => {
    navigate("/");
    toast.success("Log -Out Successfull");
  };
  return (
    <>
      <aside className="p-4 bg-green-200">
        {/* Top */}
        <div className="w-full md:hidden relative  p-2 mb-4">
          <RiCloseLine
            onClick={() => setHamb(!hamb)}
            className="text-3xl  absolute top-2 sm:hover:rotate-[228deg] transition-transform font-bold right-2 sm:hover:text-[22px] text-[rgb(241,146,46)] cursor-pointer"
          />
        </div>
        {/* Logo */}
        <figure className="flex  flex-col items-center">
          <span className="font-bold text-[rgb(241,146,46)] text-2xl">
            Vendor Panel
            {/* <img src={image} className="h-24" /> */}
          </span>
        </figure>
        {/* Nav-menu */}
        <nav className="py-6">
          {nav.map((nav) => {
            return (
              <Link to={nav.link} key={nav.name} className="">
                <span className="flex my-3 items-center cursor-pointer text-gray-900    tracking-wider p-2 rounded-sm">
                  {nav.icon} {nav.name}
                </span>
              </Link>
            );
          })}
          <span
            className="flex my-3 items-center cursor-pointer text-gray-900    tracking-wider p-2 rounded-sm"
            onClick={() => logOut()}
          >
            <BiLogOutCircle className="text-xl mr-3" /> Log-Out
          </span>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
