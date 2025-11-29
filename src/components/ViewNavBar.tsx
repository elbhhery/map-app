import L from "leaflet";
import { useRef, useEffect, useState } from "react";
import shp from "shpjs";
import logo from "../assets/icons/arrow03.png";
//
export function SmallNav() {
  return (
    <nav className="lg:h-screen h-20 bg-black/70 lg:w-fit flex w-full bottom-0 flex-row lg:flex-col absolute lg:justify-between justify-center gap-8 lg:gap-0 items-center lg:relative z-50">
      <div className="lg:w-[72px] lg:pt-[9px] flex flex-row lg:flex-col items-center gap-6 lg:gap-0">
        {" "}
        <img src={logo} alt="" className="w-10" />
        <i className="fa-solid fa-house rounded-2xl lg:mt-5 lg:mb-6 text-3xl text-[#dcc89d]"></i>
        <i className="fa-solid fa-border-all text-3xl text-[#dcc89d]"></i>{" "}
      </div>
      <div className="lg:w-[72px] flex flex-row lg:flex-col items-center lg:mb-14 gap-6 lg:gap-0">
        {" "}
        <i className="fa-solid fa-user lg:mb-8 text-3xl text-[#dcc89d]"></i>
        <i className="fa-solid fa-gear text-3xl text-[#dcc89d]"></i>
      </div>
    </nav>
  );
}
//
interface ViewNavBarProps {
  mapRef: React.RefObject<L.Map | null>;
}
export default function ViewNavBar({ mapRef }: ViewNavBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showmenu, setShowmenu] = useState(true);
  const [placeholder, setPlaceholder] = useState(false);
  useEffect(() => {
    if (placeholder && inputRef.current) {
      inputRef.current.focus();
    }
  });
  // handleSearch
  const handleSearch = async () => {
    if (!inputRef.current) return console.log("inputRef is null");
    if (!mapRef.current)
      return console.log("mapRef is null, wait for map to load");

    const query = inputRef.current.value;
    if (!query) return;

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        query
      )}`,
      { headers: { "User-Agent": "my-app" } }
    );

    const data = await res.json();
    if (data.length === 0) return alert("Location not found");

    const { lat, lon } = data[0];
    mapRef.current.flyTo([parseFloat(lat), parseFloat(lon)], 10);
  };
  // handleFileUpload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];

    try {
      const arrayBuffer = await file.arrayBuffer();

      const geojson = await shp(arrayBuffer);

      console.log("GeoJSON data:", geojson);

      if (mapRef.current) {
        const layer = L.geoJSON(geojson).addTo(mapRef.current);
        mapRef.current.fitBounds(layer.getBounds());
      }
    } catch (err) {
      console.error("Error reading shapefile:", err);
      alert("Failed to load Shapefile");
    }
  };

  return (
    <aside className="lg:w-[385px] w-full fixed top-0 left-0 h-screen! z-20">
      {/*  */}
      <SmallNav />
      <nav
        className={`${
          showmenu ? "lg:w-[313px]!" : "lg:w-[50px]!"
        } absolute lg:left-[72px] bottom-22 w-full h-20 lg:h-screen lg:bottom-0 left-0 z-10 bg-white`}
      >
        <div className=" h-[50px] bg-[#F5EEE0] hidden lg:block"></div>
        <div className="p-4 bg-[#FFFFFF] flex lg:block items-center">
          <div className="lg:flex mt-3 hidden">
            <i
              onClick={() => setShowmenu(!showmenu)}
              className={`fa-solid fa-arrow-left mr-2 text-2xl text-gray-200 ${
                showmenu ? "" : "rotate-180"
              } `}
            ></i>
            <p
              className={`text-orange-400 pl-3 border-l border-gray-400  ${
                showmenu ? "" : "hidden"
              } `}
            >
              Define Area Of Interest
            </p>
          </div>
          <div
            className={`mt-10 mb-3  ${
              showmenu ? "" : "hidden!"
            } hidden lg:block`}
          >
            <p className="text-[18px]">
              <span className="font-bold">Define the areas(s) </span>
              where you will apply your object count & detection model
            </p>
          </div>

          <label htmlFor="search" className={`${showmenu ? "" : "hidden"}`}>
            Search Area:
          </label>
          <div
            className={`${
              showmenu ? "" : "hidden"
            } lg:relative max-w-[287px] w-[287px] lg:h-28 `}
          >
            <input
              ref={inputRef}
              type="text"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className={`bg-[#f3ead9] ${
                placeholder === true ? "z-10 h-1/2! pl-4" : ""
              } lg:absolute top-2 ml-3 lg:ml-0 left-0 lg:w-full lg:h-full p-4 h-auto border-none focus:border focus:border-black outline-none rounded-[10px] text-[#857f76]`}
            />

            <div
              onClick={() => {
                setPlaceholder(true);
                inputRef.current?.focus();
              }}
              className={`p-4 rounded-[10px] ${
                placeholder ? "opacity-0 pointer-events-none" : "opacity-100"
              } lg:flex items-center gap-4 text-[18.5px] font-normal text-[#7E786F] mt-2 absolute top-2 left-0 hidden`}
            >
              <span>
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>
              <p>
                {" "}
                <span className="font-bold text-[#7e786f]">Search</span>
                <span className="normal">
                  {" "}
                  for a city, town… <br /> or{" "}
                  <span className="font-bold">draw</span> area on map
                </span>
              </p>
            </div>
          </div>

          <div className={`lg:mt-6 ${showmenu ? "" : "hidden"}`}>
            <label className="lg:h-[67px] h-[60px] lg:pl-4 p-2 text-[#7e786f] bg-[#f5eee0] w-full rounded-[10px] text-left flex items-center gap-4 cursor-pointer">
              <i className="fa-regular fa-file mr-4"></i>
              Uploading a shape file
              <input
                type="file"
                accept=".shp,.shx,.dbf,.prj,.zip"
                className="hidden"
                onChange={(e) => handleFileUpload(e)}
              />
            </label>
          </div>
        </div>
      </nav>
    </aside>
  );
}
