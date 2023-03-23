import React from "react";

import { FaUser } from "react-icons/fa";

const Card = (props) => {
  return (
    <>
      {console.log(props.data)}
      <section className="w-full flex flex-col items-start justify-center text-center border bg-purple-300/50 p-5 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 ease-in-out text-black/70">
        <div className="w-full h-56 bg-purple-500/60 rounded-lg flex items-center justify-center mb-10">
          <FaUser className="text-9xl bg-white p-3 rounded-full text-black/70" />
        </div>

        <div className="flex flex-col items-start pb-4 ml-2">
          <span className="text-lg font-medium">Name</span>
          <h3 className="text-xl capitalize font-semibold">
            {props.data.name}
          </h3>
        </div>
        <div className="flex flex-col items-start pb-4 ml-2">
          <span className="text-lg font-medium">Department</span>
          <h3 className="text-xl capitalize font-semibold">
            {props.data.department}
          </h3>
        </div>
        <div className="flex flex-col items-start pb-4 ml-2">
          <span className="text-lg font-medium">Email</span>
          <h3 className="text-xl lowercase font-semibold">
            {props.data.email}
          </h3>
        </div>
        <button className="w-full bg-white p-2 rounded-md text-purple-500 font-semibold hover:bg-purple-500/40 transition-all duration-200 ease-in-out hover:text-white active:bg-purple-500  ">
          More
        </button>
      </section>
    </>
  );
};

export default Card;
