import React, { useEffect, useState } from "react";
import HOC from "../layout/HOC";
import { MdDashboardCustomize, MdOutlineLibraryBooks } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { Baseurl } from "../../Baseurl";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const dash = (data) => {
  console.log(data, "dsjkfhjkashfjk");
  return data;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const id = localStorage.getItem("userId");
  const fetchCategory = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}/api/vendor/count/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setData(data.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchCategory();
  }, []);
  const card = [
    {
      progress: "bg-green-400",
      title: "All Products",
      link: "/venderProduct",
      number: data?.products,
      icon: (
        <MdOutlineLibraryBooks className="text-2xl text-[rgb(241,147,48)]" />
      ),
    },
    {
      progress: "bg-green-400",
      title: "All Order",
      link: "/VendorOrder",
      number: data?.orders,
      icon: (
        <MdOutlineLibraryBooks className="text-2xl text-[rgb(241,147,48)]" />
      ),
    },
    {
      progress: "bg-yellow-400",
      title: "All Categories",
      link: "/vendorCategory",
      number: data.categories,
      icon: (
        <MdDashboardCustomize className="text-2xl text-[rgb(241,147,48)]" />
      ),
    },
    {
      progress: "bg-yellow-400",
      title: "All SubCategories",
      link: "/vendorSubCategory",
      number: data.subcategories,
      icon: (
        <MdDashboardCustomize className="text-2xl text-[rgb(241,147,48)]" />
      ),
    },
    // {
    //   progress: "bg-green-400",
    //   title: "All Notification",
    //   link: "/VendorOrder",
    //   number: data?.notifications,
    //   icon: (
    //     <MdOutlineLibraryBooks className="text-2xl text-[rgb(241,147,48)]" />
    //   ),
    // },
  ];
  return (
    <>
      <section className="grid md:grid-cols-3 grid-cols-2 gap-y-6 gap-x-4">
        {/* Card */}
        {card.map((card) => {
          return (
            <div className="px-5 py-8 bg-slate-200 hover:bg-green-200 space-y-2 shadow-xl flex flex-col  rounded-md">
              <div
                className="grid  justify-between grid-cols-4 cursor-pointer"
                onClick={() => navigate(card.link)}
              >
                <div className="flex flex-col col-span-3 space-y-1">
                  <span className="tracking-widest text-gray-900">
                    {card.title}
                  </span>
                  <span className="tracking-wider text-gray-700 text-xl md:text-2xl font-semibold">
                    {card.number}
                  </span>
                </div>
                {/* Icons */}
                <div className="flex rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-white justify-center items-center">
                  {card.icon}
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default HOC(Dashboard);
