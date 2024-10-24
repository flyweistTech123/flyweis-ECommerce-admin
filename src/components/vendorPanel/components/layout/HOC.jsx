import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const HOC = (Wcomponenet) => {
  return function Component() {
    const [hamb, setHamb] = useState(false);
    return (
      <>
        <section className="flex overflow-x-hidden relative">
          {/* Sidebar */}
          <div
            className={
              hamb
                ? " absolute top-0 z-30 md:w-auto shadow-md  bg-[#444444]  w-60 transition-all md:-left-full left duration-150  h-auto overflow-y-auto  left-0 "
                : " md:w-72 z-30 bg-[#444444] shadow-md  md:static absolute top-0 -left-full   transition-all duration-150  overflow-y-auto h-auto"
            }
          >
            <Sidebar hamb={hamb} setHamb={setHamb} />
          </div>
          {/* Components & Navbar */}
          <div
            className={
              hamb
                ? " transition-all px-4 py-2 bg-[#2C2C2C] duration-150 w-full h-screen"
                : " w-full h-screen  px-4 py-2  bg-[#2C2C2C] z-50 transition-all duration-150 "
            }
          >
            <Navbar hamb={hamb} setHamb={setHamb} />
            <div className="my-6 text-[#000] h-[87%] wcomp overflow-y-auto overflow-x-auto">
              <Wcomponenet />
            </div>
          </div>
        </section>
      </>
    );
  };
};

export default HOC;
