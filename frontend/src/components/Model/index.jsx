import React, { useEffect } from "react";
import dynamic from "next/dynamic";

import { RxCross2 } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { TbTrashFilled } from "react-icons/tb";

import Form from "./form";

import { SetId, EmployeeDataContext } from "@/pages/_app";

const Map = dynamic(() => import("./map"), {
  ssr: false,
});

const Model = ({ isOpen, setOpen }) => {
  const { modelId } = React.useContext(SetId);
  const { setEmployeeData } = React.useContext(EmployeeDataContext);

  const [isEdit, setIsEdit] = React.useState(false);

  return (
    <div className={`${isOpen ? "inherit" : "hidden"}`}>
      <div className="fixed bg-white w-11/12 sm:w-2/3 h-5/6 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-10 shadow-2xl rounded-lg overflow-x-scroll">
        <span className="absolute right-5 top-5">
          <RxCross2
            onClick={() => {
              setIsEdit(false);
              setOpen(false);
            }}
            className="text-4xl cursor-pointer bg-purple-500 text-[#fee7ff] rounded-md opacity-90 hover:opacity-100 active:scale-90 transition-all duration-200"
          />
        </span>
        {modelId ? (
          <>
            <span className="absolute right-32 top-5">
              <MdEdit
                onClick={() => setIsEdit(!isEdit)}
                className="text-4xl p-1 cursor-pointer bg-purple-500 text-[#fee7ff] rounded-md opacity-90 hover:opacity-100 active:scale-90 transition-all duration-200"
              />
            </span>
            <span className="absolute right-20 top-5">
              <TbTrashFilled
                onClick={async () => {
                  if (
                    window.confirm(
                      "Are you sure you want to delete this employee?"
                    )
                  ) {
                    await fetch(
                      "https://employee-manager-backend.up.railway.app/api/delete_employee",
                      {
                        method: "DELETE",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ id: modelId }),
                      }
                    )
                      .then((res) => res.json())
                      .then((data) => {
                        console.log(data);
                      })
                      .catch((err) => {
                        console.log(err);
                      });

                    await fetch(
                      "https://employee-manager-backend.up.railway.app/api/employee_data"
                    )
                      .then((res) => res.json())
                      .then((data) => {
                        setEmployeeData(data);
                      });

                    setOpen(false);
                  }
                }}
                className="text-4xl p-1 cursor-pointer bg-purple-500 text-[#fee7ff] rounded-md opacity-90 hover:opacity-100 active:scale-90 transition-all duration-200"
              />
            </span>
          </>
        ) : null}
        <Form
          isOpen={isOpen}
          isEdit={modelId ? isEdit : true}
          setIsEdit={setIsEdit}
          setOpen={setOpen}
        />
        {/* maps */}

        {/* {console.log(cordinates)} */}
        {isEdit || modelId === null ? null : <Map />}
      </div>

      <div className="fixed w-screen h-screen top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] -z-1  bg-black/40 backdrop-blur-sm" />
    </div>
  );
};

export default Model;
