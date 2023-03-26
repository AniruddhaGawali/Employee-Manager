import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import React from "react";

const EmployeeDataContext = React.createContext(null);
const SetId = React.createContext(null);
const Cordinates = React.createContext(null);

export default function App({ Component, pageProps }) {
  const [employeeData, setEmployeeData] = React.useState(null);
  const [modelId, setModelId] = React.useState(null);
  const [cordinates, setCordinates] = React.useState(null);

  React.useEffect(() => {
    fetch("https://employee-manager-backend.up.railway.app/api/employee_data")
      .then((res) => res.json())
      .then((data) => {
        setEmployeeData(data);
      });
  }, []);

  React.useEffect(() => {
    if (modelId) {
      const e = employeeData?.find((employee) => employee._id === modelId);

      (async () => {
        const res = await fetch(
          "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" +
            e.address
        );
        const data = await res.json();
        console.log(data);
        setCordinates([data[0].lat, data[0].lon]);
      })();
    } else {
      setCordinates(null);
    }
  }, [modelId]);

  return (
    <Cordinates.Provider value={{ cordinates, setCordinates }}>
      <EmployeeDataContext.Provider value={{ employeeData, setEmployeeData }}>
        <SetId.Provider value={{ modelId, setModelId }}>
          <Component {...pageProps} />
        </SetId.Provider>
      </EmployeeDataContext.Provider>
    </Cordinates.Provider>
  );
}

export { EmployeeDataContext, SetId, Cordinates };
