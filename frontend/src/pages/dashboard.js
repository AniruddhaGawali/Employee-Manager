import React from "react";
import Navbar from "@/components/Navbar";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { EmployeeDataContext } from "./_app";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const { employeeData } = React.useContext(EmployeeDataContext);

  const [employeeAge, setEmployeeAge] = React.useState(null);
  const [employeeDepartment, setEmployeeDepartment] = React.useState(null);
  const [employeeFullTime, setEmployeeFullTime] = React.useState(null);
  const [employeeRemoteLocation, setEmployeeRemoteLocation] =
    React.useState(null);
  const [employeeContract, setEmployeeContract] = React.useState(null);

  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    var ageData = [];
    var departmentData = [];
    var full_timeData = {
      true: 0,
      false: 0,
    };

    var remote_location = {
      true: 0,
      false: 0,
    };

    var contract = {
      true: 0,
      false: 0,
    };

    const color = ["rgba(147, 51, 234,0.5)", "#fdceff"];
    const borderColor = ["rgba(147, 51, 234,1)", "#fe74fd "];

    employeeData.map((employee) => {
      var agebetween;
      if (employee.age >= 20 && employee.age < 30) {
        agebetween = "20-30";
      } else if (employee.age >= 30 && employee.age < 40) {
        agebetween = "30-40";
      } else if (employee.age >= 40 && employee.age < 50) {
        agebetween = "40-50";
      } else if (employee.age >= 50 && employee.age < 60) {
        agebetween = "50-60";
      } else if (employee.age >= 60 && employee.age < 70) {
        agebetween = "60-70";
      } else {
        agebetween = "0";
      }
      if (agebetween !== "0") {
        var x = ageData.findIndex((e) => e.tag === agebetween);
        if (x !== -1) {
          ageData[x].count += 1;
        } else {
          ageData.push({ tag: agebetween, count: 1 });
        }
      }
    });

    employeeData.map((employee) => {
      var x = departmentData.findIndex((e) => e.tag === employee.department);
      if (x !== -1) {
        departmentData[x].count += 1;
      } else {
        departmentData.push({ tag: employee.department, count: 1 });
      }
    });

    console.log(departmentData);

    employeeData.map((employee) => {
      if (employee.status.full_time) {
        full_timeData.true += 1;
      } else {
        full_timeData.false += 1;
      }
    });

    employeeData.map((employee) => {
      if (employee.status.remote_location) {
        remote_location.true += 1;
      } else {
        remote_location.false += 1;
      }
    });

    employeeData.map((employee) => {
      if (employee.status.contract) {
        contract.true += 1;
      } else {
        contract.false += 1;
      }
    });

    setEmployeeAge({
      labels: ageData.map((e) => e.tag),
      datasets: [
        {
          label: "Age",
          data: ageData.map((e) => e.count),
          borderColor: borderColor,
          backgroundColor: color,
        },
      ],
    });
    setEmployeeDepartment({
      labels: departmentData.map((e) => e.tag),
      datasets: [
        {
          label: "Department",
          data: departmentData.map((e) => e.count),
          borderColor: borderColor,
          backgroundColor: color,
        },
      ],
    });
    setEmployeeFullTime({
      labels: ["Full Time", "Part Time"],
      datasets: [
        {
          label: "Full Time",
          data: Object.values(full_timeData),
          borderColor: borderColor,
          backgroundColor: color,
        },
      ],
    });
    setEmployeeRemoteLocation({
      labels: ["Remote Location", "Office Location"],
      datasets: [
        {
          label: "Remote Location",
          data: Object.values(remote_location),
          borderColor: borderColor,
          backgroundColor: color,
        },
      ],
    });
    setEmployeeContract({
      labels: ["Contract", "Permanent"],
      datasets: [
        {
          label: "Contract",
          data: Object.values(contract),
          borderColor: borderColor,
          backgroundColor: color,
        },
      ],
    });
  }, [employeeData]);

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <Navbar onDashboard={true} />

        <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-center mt-20 gap-x-10 gap-y-20 p-10  min-[700px]:px-32 ">
          <div className=" grid grid-cols-1 min-[1000px]:grid-cols-2  col-span-3 gap-x-10 ">
            {employeeAge !== null ? (
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl font-semibold pb-5 ">
                  Age of Employee
                </h2>
                <Bar data={employeeAge} />
              </div>
            ) : null}
            {employeeDepartment !== null ? (
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl font-semibold pb-5">
                  Department of Employee
                </h2>
                <Bar data={employeeDepartment} />
              </div>
            ) : null}
          </div>

          {employeeFullTime !== null ? (
            <div className="flex flex-col items-center justify-center max-[1000px]:col-span-2 ">
              <h2 className="text-2xl font-semibold pb-5">
                No. Employee on Fulltime
              </h2>
              <Doughnut data={employeeFullTime} />
            </div>
          ) : null}

          {employeeRemoteLocation !== null ? (
            <div className="flex flex-col items-center justify-center max-[1000px]:col-span-2">
              <h2 className="text-2xl font-semibold pb-5">
                No. Employee on Remote Location
              </h2>
              <Doughnut data={employeeRemoteLocation} />
            </div>
          ) : null}

          {employeeContract !== null ? (
            <div className="flex flex-col items-center justify-center max-[1000px]:col-span-2">
              <h2 className="text-2xl font-semibold pb-5">
                No. Employee on Contract
              </h2>
              <Doughnut data={employeeContract} />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
