import React from "react";

import { FaUser } from "react-icons/fa";

import { SetId } from "@/pages/_app";

const Card = ({ data, setIsModelOn }) => {
  const { setModelId } = React.useContext(SetId);

  return (
    <>
      <section className="w-full flex flex-col items-start justify-center text-center border-4 border-purple-500/70 bg-purple-300/50 p-5 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 ease-in-out text-black/70 ">
        <div className="w-full h-56 bg-white rounded-lg flex items-center justify-center mb-10">
          <FaUser className="text-9xl bg-purple-500 p-3 rounded-full text-white" />
        </div>

        {console.log("data", data)}

        <div className="flex flex-col items-start pb-4 ml-2">
          <span className="text-lg font-medium">Name</span>
          <h3 className="text-xl capitalize font-semibold">{data.name}</h3>
        </div>
        <div className="flex flex-col items-start pb-4 ml-2">
          <span className="text-lg font-medium">Department</span>
          <h3 className="text-xl capitalize font-semibold">
            {data.department}
          </h3>
        </div>
        <div className="flex flex-col items-start pb-4 ml-2">
          <span className="text-lg font-medium">Email</span>
          <h3 className="text-xl lowercase font-semibold">{data.email}</h3>
        </div>
        <button
          onClick={() => {
            setIsModelOn(true);
            setModelId(data._id);
          }}
          className="w-full bg-white p-2 rounded-md text-purple-500 font-semibold hover:bg-purple-500/40 transition-all duration-200 ease-in-out hover:text-white active:bg-purple-500  opacity-90 hover:opacity-100 active:scale-95 "
        >
          More
        </button>
      </section>
    </>
  );
};

export default Card;
