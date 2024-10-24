/** @format */

import { AiFillDelete } from "react-icons/ai";
import HOC from "../../layout/HOC";

const Books = [
  {
    astro: "AstrologerName",
    user: "Sumit",
    time: "06 : 45 PM",
  },
  {
    astro: "Sumit",
    user: "Sumit",
    time: "06 : 45 PM",
  },
  {
    astro: "Shivam",
    user: "Sumit",
    time: "06 : 45 PM",
  },
  {
    astro: "Rakesh",
    user: "Sumit",
    time: "06 : 45 PM",
  },
  {
    astro: "AstrologerName",
    user: "Sumit",
    time: "06 : 45 PM",
  },
  {
    astro: "AstrologerName",
    user: "Sumit",
    time: "06 : 45 PM",
  },
];

const Booking = () => {
  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Bookings
          </span>
        </div>

        <div className=" wcomp overflow-y-auto">
          <table className="table-auto  w-full text-left whitespace-no-wrap">
            <thead>
              <tr className=" border-b bg-green-300 shadow-xl text-gray-900">
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Astrologer
                </th>
                <th className="px-4 py-3 title-font tracking-widest rounded-tr-lg font-medium md:text-base text-sm  ">
                  User
                </th>
                <th className="px-4 py-3 title-font tracking-widest rounded-tr-lg font-medium md:text-base text-sm  ">
                  Time Slot
                </th>
                <th className="px-4 py-3 title-font tracking-widest rounded-tr-lg font-medium md:text-base text-sm  ">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody style={{ color: "black" }}>
              {Books.map((i, index) => (
                <tr className="tracking-wider text-gray-900" key={index}>
                  <td className=" py-3 w-36 md:text-base text-sm ">
                    {i.astro}
                  </td>
                  <td className=" py-3 w-36 md:text-base text-sm ">
                    {i.user}
                  </td>
                  <td className=" py-3 w-36 md:text-base text-sm ">
                    {" "}
                    {i.time}
                  </td>
                  <td className="py-3 w-36 md:text-base text-sm ">
                    <span style={{ display: "flex", gap: "20px" }}>
                      <AiFillDelete cursor="pointer" color="red" />{" "}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default HOC(Booking);
