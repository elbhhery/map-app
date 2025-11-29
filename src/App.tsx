import { useState } from "react";
import "./App.css";
// import { Map } from "leaflet";
import AOI from "./components/BaseMap";
import BaseNavBar from "./components/BaseNavBar";
import MapSwitch from "./components/mapSwitch";
import ViewScreen from "./screens/ViewScreen";

function App() {
  const [viewMap, setViewMap] = useState("viewMap");
  const [selectedAreas, setSelectedAreas] = useState<GeoJSON.GeoJsonObject[]>(
    []
  );

  const renderScreen = () => {
    if (viewMap === "viewMap") {
      return <ViewScreen />;
    }

    if (viewMap === "BaseMap") {
      return (
        <>
          <BaseNavBar
            areas={selectedAreas}
            setAreas={setSelectedAreas}
            clearAreas={() => {
              setSelectedAreas([]);
              localStorage.removeItem("savedShapes");
            }}
          />{" "}
          <AOI setSelectedAreas={setSelectedAreas} />
        </>
      );
    }

    return <ViewScreen />;
  };

  return (
    <div className="relative z-10">
      {renderScreen()}
      <MapSwitch setViewMap={setViewMap} />
    </div>
  );
}

export default App;
