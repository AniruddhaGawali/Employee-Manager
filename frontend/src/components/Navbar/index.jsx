import React from "react";
import { BiSearch } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";

const Navbar = ({ search, setSearch }) => {
  const [OnFocus, setOnFocus] = React.useState(false);

  return (
    <>
      <nav className="bg-purple-600/75 w-8/12 mx-10 mt-10 rounded-full p-2 flex items-center justify-between">
        <div className="flex items-center justify-center">
          <div className="text-xl h-10  font-bold text-purple-600 bg-white w-fit  rounded-l-full px-3 py-2 flex text-center items-center justify-center ">
            {OnFocus ? <BiSearch className="text-purple-600 text-3xl" /> : "E"}
          </div>

          <div className=" w-[3px] h-10 bg-white ml-2" />
          <div className="flex items-center justify-center ml-3">
            <input
              type="text"
              onFocus={() => setOnFocus(true)}
              onBlur={() => setOnFocus(false)}
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              placeholder="Search"
              className="py-1 ml-2 bg-transparent font-medium text-xl h-fit w-52 focus:outline-none focus-visible:outline-none text-white placeholder-white"
            />
          </div>
        </div>
        <div className="flex items-center">
          <span className={`${search.length > 0 ? "flex" : "hidden"}`}>
            <RxCross2
              onClick={() => setSearch("")}
              className="text-3xl cursor-pointer text-white mr-2"
            />
          </span>
          <div className="text-lg font-bold text-purple-600 bg-white w-fit  rounded-r-full px-3 py-2 flex text-center items-center justify-center cursor-pointer">
            Dashboard
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
