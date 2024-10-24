/** @format */

import React from "react";
import { RiCloseLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { BsFillCartFill } from "react-icons/bs";
import { BiLogOutCircle, BiCategory } from "react-icons/bi";
import { MdDashboardCustomize } from "react-icons/md";
import { BsFillChatDotsFill } from "react-icons/bs";
import { TbDiscount } from "react-icons/tb";
import { AiFillMessage } from "react-icons/ai";
import { FiImage } from "react-icons/fi";
import { RiSecurePaymentLine } from "react-icons/ri";
import { FaProductHunt, FaUserCircle } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";




const Sidebar = ({ hamb, setHamb }) => {
  const navigate = useNavigate();

  const nav = [
    {
      icon: <MdDashboardCustomize className="text-xl mr-3 rounded-full " />,
      link: "/vendorDashboard",
      name: "Dashboard",
    },
    // {
    //   icon: <i className="fa-solid fa-user text-xl mr-3"></i>,
    //   link: "/ven",
    //   name: "Vendors",
    // },
    {
      icon: <FaUserCircle className="text-xl mr-3" />,
      link: "/users",
      name: "Users",
    },
    {
      icon: <FaUserCircle className="text-xl mr-3" />,
      link: "/pendingVendor",
      name: "Pending Vendor",
    },
    {
      icon: <FaUserCircle className="text-xl mr-3" />,
      link: "/approveVendor",
      name: "Approve Vendor",
    },
    {
      icon: <FiImage className="text-xl mr-3" />,
      link: "/ban",
      name: "Banner",
    },
    // {
    //   icon: <FiImage className="text-xl mr-3" />,
    //   link: "/subAdmin",
    //   name: "Sub-Admin",
    // },
    {
      icon: <BiCategory className="text-xl mr-3" />,
      link: "/category",
      name: "Categories",
    },
    {
      icon: <BiCategory className="text-xl mr-3" />,
      link: "/subcategory",
      name: "Sub Category",
    },
    {
      icon: <FaProductHunt className="text-xl mr-3 rounded-full " />,
      link: "/pendingproduct",
      name: "Pending Products"
    },
    {
      icon: <FaProductHunt className="text-xl mr-3 rounded-full " />,
      link: "/approvegproduct",
      name: "Approve Products",
    },
    {
      icon: <AiFillMessage className="text-xl mr-3 rounded-full " />,
      link: "/msg",
      name: "Notification",
    },
    {
      icon: <TbDiscount className="text-xl mr-3" />,
      link: "/dis",
      name: "Discount",
    },
    // {
    //   icon: <BsFillChatDotsFill className="text-xl mr-3" />,
    //   link: "/complaint",
    //   name: "Help&Support",
    // },
    {
      icon: <BsFillCartFill className="text-xl mr-3" />,
      link: "/order",
      name: "Orders",
    },
    {
      icon: <BsFillCartFill className="text-xl mr-3" />,
      link: "/refundorders",
      name: "Refund Orders",
    },
    {
      icon: <BsFillCartFill className="text-xl mr-3" />,
      link: "/payment",
      name: "Payment",
    },
    {
      icon: <BsFillCartFill className="text-xl mr-3" />,
      link: "/wallet",
      name: "Wallet",
    },

    {
      icon: <BsFillCartFill className="text-xl mr-3" />,
      link: "/refer",
      name: "Refer and Earn",
    },

    {
      icon: <BiSupport  className="text-xl mr-3" />,
      link: "/complainttickets",
      name: "Complaint tickets",
    },
    {
      icon: <RiSecurePaymentLine className="text-xl mr-3"  size={50}/>,
      link: "/shiprocketcredentials",
      name: "Shiprocket Credentials",
    },
    {
      icon: <RiSecurePaymentLine className="text-xl mr-3"  size={50}/>,
      link: "/payment_gateway",
      name: "Payment gateway Credentials",
    },
    // {
    //   icon: <BsFillCartFill className="text-xl mr-3" />,
    //   link: "/deliveryPartner",
    //   name: "Delivery Partner",
    // },
    // {
    //   icon: <BsFillCartFill className="text-xl mr-3" />,
    //   link: "/privacy",
    //   name: "Privacy Policy",
    // },
    // {
    //   icon: <BsFillCartFill className="text-xl mr-3" />,
    //   link: "/term",
    //   name: "Terms",
    // },
  ];

  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <aside className="p-4 h-auto">
        {/* Top */}
        <div className="w-full md:hidden relative  p-2 mb-4">
          <RiCloseLine
            onClick={() => setHamb(!hamb)}
            className="text-3xl  absolute top-2 sm:hover:rotate-[228deg] transition-transform font-bold right-2 sm:hover:text-[22px] text-[#fff])] cursor-pointer"
          />
        </div>
        <p
          style={{
            textAlign: "center",
            fontWeight: "900",
            fontSize: "2rem",
            color: "#fff",
          }}
        >
          Admin Panel
        </p>
        {/* Nav-menu */}
        <nav className="py-2">
          {nav.map((nav) => {
            return (
              <Link
                to={nav.link}
                key={nav.name}
                className=""
                style={{ textTransform: "uppercase", textDecoration: "none" }}
              >
                <span className="flex my-3 items-center cursor-pointer text-[#fff]    tracking-wider p-2 rounded-sm">
                  {nav.icon} {nav.name}
                </span>
              </Link>
            );
          })}
          <span
            className="flex my-3 items-center cursor-pointer text-[#fff]    tracking-wider p-2 rounded-sm"
            onClick={() => logOut()}
          >
            <BiLogOutCircle className="text-xl mr-3 rounded-full " /> LogOut
          </span>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
