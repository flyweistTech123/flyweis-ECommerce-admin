import React from "react";
import HOC from "../../layout/HOC";

function RatingReview() {
  return (
    <>
      <div className=" wcomp overflow-y-auto">
        <table className="table-auto  w-full text-left whitespace-no-wrap">
          <thead>
            <tr className=" border-b bg-green-300 shadow-xl text-gray-900">
              <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                Rating
              </th>
              <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                Review
              </th>
              <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            return (
            <tr className="tracking-wider text-gray-900 ">
              <td className=" py-3 w-36 md:text-base text-sm ">
                <p>hello</p>
              </td>
              <td className="px-4 py-3 md:text-base text-sm">
                <p>hello</p>
              </td>
              <td className="px-4 py-3  space-x-3">
                <p>hello</p>
              </td>
            </tr>
            );
          </tbody>
        </table>
      </div>
    </>
  );
}

export default HOC(RatingReview);
