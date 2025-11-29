import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useRef, useEffect } from "react";
import { BasicToolsControl } from "../components/BaseMap";
import ViewNavBar from "../components/ViewNavBar.tsx";

export default function ViewScreen() {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      console.log("Map is ready:", mapRef.current);
    }
  }, []);

  return (
    <div className="relative w-full h-screen">
      <MapContainer
        center={[51.5, 7]}
        zoom={10}
        zoomControl={false}
        style={{ height: "100vh", width: "100%" }}
        className="absolute top-0 z-0"
        ref={mapRef}
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

      <ViewNavBar mapRef={mapRef} />
    </div>
  );
}
