import React from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Card from "@/components/Card";

import Model from "@/components/Model";

import { ToastContainer } from "react-toastify";

import { IoIosAddCircle } from "react-icons/io";

import { EmployeeDataContext } from "./_app";
import { SetId } from "./_app";

export default function Home() {
  const { employeeData } = React.useContext(EmployeeDataContext);
  const { setModelId } = React.useContext(SetId);

  const [employeeDataSet, setEmployeeDataSet] = React.useState(employeeData);
  const [search, setSearch] = React.useState("");
  const [isModelOn, setIsModelOn] = React.useState(false);

  React.useEffect(() => {
    setEmployeeDataSet(employeeData);
  }, [employeeData]);

  React.useEffect(() => {
    if (search) {
      const filteredData = employeeData.filter((employee) => {
        return (
          employee.name.toLowerCase().includes(search.toLowerCase()) ||
          employee.department.toLowerCase().includes(search.toLowerCase())
        );
      });
      setEmployeeDataSet(filteredData);
    } else {
      setEmployeeDataSet(employeeData);
    }
  }, [search]);

  return (
    <>
      <Head>
        <title>Employee Manager</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
          integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
          crossorigin=""
        />
      </Head>
      <main className=" flex flex-col items-center justify-center">
        <Navbar search={search} setSearch={setSearch} />
        <div className="grid grid-cols-3 mt-32 gap-10 w-10/12 items-center justify-center pb-10">
          {employeeDataSet ? (
            employeeDataSet.map((employee, key) => (
              <Card key={key} data={employee} setIsModelOn={setIsModelOn} />
            ))
          ) : (
            <div className="text-2xl">Loading...</div>
          )}
        </div>

        <div>
          <button
            onClick={() => {
              setIsModelOn(true);
              setModelId(null);
            }}
            className="fixed bottom-10 right-10 bg-purple-500 text-white p-2 rounded-full font-semibold shadow-lg z-5 opacity-90 hover:opacity-100 active:scale-90 transition-all duration-200"
          >
            <IoIosAddCircle className="text-5xl" />
          </button>
        </div>
        <Model isOpen={isModelOn} setOpen={setIsModelOn} />
      </main>
      <ToastContainer />
    </>
  );
}
