import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

import { Cordinates } from "@/pages/_app";

const Map = () => {
  const { cordinates } = React.useContext(Cordinates);

  return (
    <>
      {cordinates ? (
        <div className="flex flex-col items-start justify-center rounded-lg p-5 px-10">
          <h3 className="font-semibold text-2xl pb-5">Location on Map</h3>
          <MapContainer
            center={cordinates}
            zoom={13}
            scrollWheelZoom={false}
            style={{
              height: "400px",
              width: "100%",
            }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={cordinates}></Marker>
          </MapContainer>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
};

export default Map;
