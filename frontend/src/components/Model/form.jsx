import React from "react";
import { SetId } from "@/pages/_app";
import { EmployeeDataContext } from "@/pages/_app";

import { toast } from "react-toastify";

const Form = ({ isOpen, isEdit, setIsEdit, setOpen }) => {
  const { modelId, setModelId } = React.useContext(SetId);
  const { employeeData, setEmployeeData } =
    React.useContext(EmployeeDataContext);

  const [name, setName] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [age, setAge] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [isContact, setIsContact] = React.useState(false);
  const [isFullTime, setIsFullTime] = React.useState(false);
  const [isRemote, setIsRemote] = React.useState(false);

  React.useEffect(() => {
    if (!isOpen) {
      setName("");
      setDepartment("");
      setEmail("");
      setAge("");
      setPhone("");
      setAddress("");
      setIsContact(false);
      setIsFullTime(false);
      setIsRemote(false);
      setModelId(null);
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (modelId) {
      const data = employeeData.find((item) => item._id === modelId);
      setName(data.name);
      setDepartment(data.department);
      setEmail(data.email);
      setAge(data.age);
      setPhone(data.phone);
      setAddress(data.address);
      setIsContact(data.status.contract);
      setIsFullTime(data.status.full_time);
      setIsRemote(data.status.remote_location);
    }
  }, [modelId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      _id: modelId,
      name,
      department,
      email,
      age,
      phone,
      address,
      status: {
        contract: isContact,
        full_time: isFullTime,
        remote_location: isRemote,
      },
    };

    if (modelId) {
      await fetch(
        `https://employee-manager-backend.up.railway.app/api/edit_employee`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )
        .then((response) => response.json())
        .then(async (data) => {
          if (data.isSuccess) {
            toast.success("Edit Employee Succesfull", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setIsEdit(!isEdit);

            await fetch(
              "https://employee-manager-backend.up.railway.app/api/employee_data"
            )
              .then((res) => res.json())
              .then((data) => {
                setEmployeeData(data);
              });
          } else {
            toast.error("Edit Employee Unsuccesfull", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        })

        .catch((error) => {
          console.error(error);
          toast.error(
            "Add New Employee Unsuccesfull, May be due to serve Problems",
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
        });
    } else {
      await fetch(
        "https://employee-manager-backend.up.railway.app/api/add_employee",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )
        .then((response) => response.json())
        .then(async (data) => {
          if (data.isSuccess) {
            toast.success("Add New Employee Succesfull", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });

            await fetch(
              "https://employee-manager-backend.up.railway.app/api/employee_data"
            )
              .then((res) => res.json())
              .then((data) => {
                setEmployeeData(data);
              });

            setOpen(false);
          } else {
            toast.error("Add New Employee Unsuccesfull", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        })

        .catch((error) => {
          console.error(error);
          toast.error(
            "Add New Employee Unsuccesfull, May be due to serve Problems",
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
        });
    }
  };

  return (
    <>
      <div className="p-10">
        <h2 className="text-4xl font-bold">
          {modelId ? "Update Employee" : "Add New Employee"}
        </h2>

        <form className="grid grid-cols-2 gap-6 mt-10 ">
          <div className="flex flex-col mt-5">
            <label
              htmlFor="name"
              className={
                !isEdit ? "text-xl pl-2" : "text-2xl font-semibold mb-0 p-1 "
              }
            >
              Name
            </label>

            <input
              type="text"
              name="name"
              id="name"
              value={name}
              disabled={!isEdit}
              onChange={(e) => setName(e.target.value)}
              className={`border-2 border-purple-500/70 p-2 rounded-md focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-purple-500/70 ${
                !isEdit
                  ? "border-none outline-none text-2xl font-semibold bg-transparent pt-0"
                  : ""
              }`}
            />
          </div>

          <div className="flex flex-col mt-5">
            <label
              htmlFor="department"
              className={
                !isEdit ? "text-xl pl-2" : "text-2xl font-semibold mb-0 p-1 "
              }
            >
              Department
            </label>

            <input
              type="text"
              name="department"
              id="department"
              value={department}
              disabled={!isEdit}
              onChange={(e) => setDepartment(e.target.value)}
              className={`border-2 border-purple-500/70 p-2 rounded-md focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-purple-500/70 ${
                !isEdit
                  ? "border-none outline-none text-2xl font-semibold bg-transparent"
                  : ""
              }`}
            />
          </div>

          <div className="flex flex-col mt-5">
            <label
              htmlFor="email"
              className={
                !isEdit ? "text-xl pl-2" : "text-2xl font-semibold mb-0 p-1 "
              }
            >
              Email
            </label>

            <input
              type="email"
              name="email"
              id="email"
              value={email}
              disabled={!isEdit}
              onChange={(e) => setEmail(e.target.value)}
              className={`border-2 border-purple-500/70 p-2 rounded-md focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-purple-500/70 ${
                !isEdit
                  ? "border-none outline-none text-2xl font-semibold bg-transparent"
                  : ""
              }`}
            />
          </div>
          <div className="flex flex-col mt-5">
            <label
              htmlFor="age"
              className={
                !isEdit ? "text-xl pl-2" : "text-2xl font-semibold mb-0 p-1 "
              }
            >
              Age
            </label>

            <input
              type="age"
              name="age"
              id="age"
              value={age}
              disabled={!isEdit}
              onChange={(e) => setAge(e.target.value)}
              className={`border-2 border-purple-500/70 p-2 rounded-md focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-purple-500/70 ${
                !isEdit
                  ? "border-none outline-none text-2xl font-semibold bg-transparent"
                  : ""
              }`}
            />
          </div>
          <div className="flex flex-col mt-5">
            <label
              htmlFor="phone"
              className={
                !isEdit ? "text-xl pl-2" : "text-2xl font-semibold mb-0 p-1 "
              }
            >
              Phone
            </label>

            <input
              type="phone"
              name="phone"
              id="phone"
              value={phone}
              disabled={!isEdit}
              onChange={(e) => setPhone(e.target.value)}
              className={`border-2 border-purple-500/70 p-2 rounded-md focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-purple-500/70 ${
                !isEdit
                  ? "border-none outline-none text-2xl font-semibold bg-transparent"
                  : ""
              }`}
            />
          </div>
          <div></div>
          <div className="flex flex-col mt-5 col-span-2">
            <label
              htmlFor="Address"
              className={
                !isEdit ? "text-xl pl-2" : "text-2xl font-semibold mb-0 p-1 "
              }
            >
              Address
            </label>

            <input
              type="Address"
              name="Address"
              id="Address"
              value={address}
              disabled={!isEdit}
              onChange={(e) => setAddress(e.target.value)}
              className={`border-2 border-purple-500/70 p-2 rounded-md focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-purple-500/70 ${
                !isEdit
                  ? "border-none outline-none text-2xl font-semibold bg-transparent"
                  : ""
              }`}
            />
          </div>

          <div className="flex ml-1 mt-1 col-span-2 items-center justify-start">
            <input
              type="checkbox"
              name="Is on Contract"
              id="Contract"
              checked={isContact}
              disabled={!isEdit}
              onChange={(e) => setIsContact(e.target.checked)}
              className=" form-checkbox h-5 w-5 text-blue-600 border-2 border-purple-500/70 p-2 rounded-md focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-purple-500/70"
            />

            <label
              htmlFor="contract"
              className="text-xl font-semibold mb-0 p-1 pl-3"
            >
              Is on Contract
            </label>
          </div>

          <div className="flex ml-1 mt-1 col-span-2 items-center justify-start">
            <input
              type="checkbox"
              name="Is  fulltime"
              id="fulltime"
              checked={isFullTime}
              disabled={!isEdit}
              onChange={(e) => setIsFullTime(e.target.checked)}
              className=" form-checkbox h-5 w-5 text-blue-600 border-2 border-purple-500/70 p-2 rounded-md focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-purple-500/70"
            />

            <label
              htmlFor="fulltime"
              className="text-xl font-semibold mb-0 p-1 pl-3"
            >
              Is Fulltime
            </label>
          </div>

          <div className="flex ml-1 mt-1 col-span-2 items-center justify-start">
            <input
              type="checkbox"
              name="Is Remote Location"
              id="remote_location"
              checked={isRemote}
              disabled={!isEdit}
              onChange={(e) => setIsRemote(e.target.checked)}
              className=" form-checkbox h-5 w-5 text-blue-600 border-2 border-purple-500/70 p-2 rounded-md focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-purple-500/70"
            />

            <label
              htmlFor="remote_location"
              className="text-xl font-semibold mb-0 p-1 pl-3"
            >
              Remote Location
            </label>
          </div>

          {isEdit ? (
            <div className="flex ml-1 mt-1 col-span-2 items-center justify-start">
              <button
                className="bg-purple-500 text-white font-bold py-2 px-4 rounded hover:bg-[#fe74fd] active:bg-[#f540f1] transition-all duration-200 "
                onClick={handleSubmit}
              >
                {modelId ? "Update Employee" : "Add Employee"}
              </button>
            </div>
          ) : null}
        </form>
      </div>
    </>
  );
};

export default Form;
