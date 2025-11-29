import { MapContainer } from "react-leaflet";
import { Marker } from "react-leaflet";
import { TileLayer } from "react-leaflet";
import { Popup } from "react-leaflet";
import { BasicToolsControl } from "./BaseMap";
export default function MapView() {
  //   const position = [51.505, -0.09];
  return (
    <>
      <MapContainer
        center={[51.5, 7]}
        zoom={10}
        zoomControl={false}
        style={{ height: "100vh", width: "100%" }}
        className="absolute top-0 z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <BasicToolsControl />
      </MapContainer>
    </>
  );
}
