import "@/styles/globals.css";
import React from "react";

const EmployeeDataContext = React.createContext(null);

export default function App({ Component, pageProps }) {
  const [employeeData, setEmployeeData] = React.useState(null);

  React.useEffect(() => {
    fetch("https://employee-manager-backend.up.railway.app/api/employee_data")
      .then((res) => res.json())
      .then((data) => {
        setEmployeeData(data);
      });
  }, []);

  return (
    <EmployeeDataContext.Provider value={{ employeeData, setEmployeeData }}>
      <Component {...pageProps} />
    </EmployeeDataContext.Provider>
  );
}

export { EmployeeDataContext };
