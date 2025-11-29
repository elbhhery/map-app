import mapBase from "../assets/icons/map1.png";
import MapView from "../assets/icons/map2.png";
export default function MapSwitch({
  setViewMap,
}: {
  setViewMap: (page: string) => void;
}) {
  return (
    <div className=" absolute top-160 right-20 flex gap-4">
      <div
        onClick={() => setViewMap("BaseMap")}
        className=" cursor-pointer relative"
      >
        <img src={MapView} alt="" className="w-25 opacity-60" />
        <span className=" absolute bottom-1 left-1 text-white">Base image</span>
      </div>
      <div
        onClick={() => setViewMap("viewMap")}
        className=" cursor-pointer relative"
      >
        <img src={mapBase} alt="" className="w-25 opacity-60" />
        <span className=" absolute bottom-1 left-1">Map View</span>
      </div>
    </div>
  );
}
