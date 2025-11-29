import { useState, useRef, Fragment } from "react";
import { SmallNav } from "./ViewNavBar";

export default function BaseNavBar({
  areas,
  setAreas,
}: {
  areas: GeoJSON.GeoJsonObject[];
  setAreas: (areas: GeoJSON.GeoJsonObject[]) => void;
  clearAreas: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showmenu, setShowmenu] = useState(true);

  return (
    <>
      <aside className="lg:w-[385px] w-full fixed top-0 left-0 h-screen max-h-max z-20">
        <SmallNav />
        <nav
          className={`${
            showmenu ? "w-[313px]" : "w-[50px]"
          } absolute top-0 left-[72px] h-screen z-10 bg-white`}
        >
          <div className="h-[50px] bg-[#F5EEE0]"></div>

          <div
            className={`p-4 h-[680px] ${
              areas.length > 0 ? "flex" : ""
            } justify-between flex-col`}
          >
            {areas.length > 0 ? (
              <>
                <div>
                  {" "}
                  <div className="flex mt-3">
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
                  <div className="border-b border-[#7E786F] pb-3">
                    <h3 className="text-lg mt-7 pt-4 border-t border-[#7E786F]">
                      Defined Areas of interest
                    </h3>

                    {areas.map((geo, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center mt-3 py-1 text-sm"
                      >
                        <span className="flex items-center gap-1">
                          <i className="fa-solid fa-angle-right"></i>
                          <span className="w-4 h-4 bg-[#F5E5C3] inline-block mt-1"></span>
                          Area {i + 1}
                        </span>
                        <span className="flex gap-1 items-center">
                          <button
                            onClick={() => {
                              console.log(geo);
                              const newAreas = areas.filter(
                                (_, index) => index !== i
                              );
                              setAreas(newAreas);
                              localStorage.setItem(
                                "savedShapes",
                                JSON.stringify(newAreas)
                              );
                            }}
                            className="text-black px-2 py-1 rounded text-xs"
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                          <button>
                            {" "}
                            <i className="fa-solid fa-eye mr-2"></i>
                            <i className="fa-solid fa-ellipsis-vertical mr-2"></i>
                          </button>
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 flex justify-between">
                    <span>Define Objects</span>
                    <i className="fa-solid fa-plus text-2xl text-[#7E786F]"></i>
                  </p>
                </div>

                <div className="text-center px-6 py-2 border border-black">
                  <h2>Scope Defintion Finshed</h2>
                  <p className="bg-[#D4CEC4]">
                    Continue to object(s) detection workflow
                  </p>
                </div>
              </>
            ) : (
              <Fragment>
                <div className={`mt-10 mb-3  ${showmenu ? "" : "hidden"}`}>
                  <p className="text-[18px] text-[#7E786F]">
                    Search or use tool to create your region
                  </p>
                </div>

                <label
                  htmlFor="search"
                  className={`${
                    showmenu ? "" : "hidden"
                  } text-[#7E786F] font-bold`}
                >
                  Search Area
                </label>
                <div
                  className={`${
                    showmenu ? "" : "hidden"
                  } relative max-w-[287px] w-[287px] h-28 text-center`}
                >
                  <input
                    ref={inputRef}
                    type="text"
                    className="focus:border-none rounded-[10px] py-2 w-full px-3 mt-2 border border-[#7E786F]"
                    placeholder="Colonge City Proper"
                  />
                  <button className="bg-[#7e786f] py-4 w-full text-[18.5px] text-[#ede7d9] mt-10 mb-2 rounded-[10px]">
                    Apply outline as base image
                  </button>
                  <label className="text-[12px] text-[#7E786F]">
                    You can always edit the snap of the area later
                  </label>
                  <button className="mt-20 w-full text-[18.5px] text-[#f1e5d5] h-[62px] mb-2 bg-[#b8642b] hover:bg-[#e4ad89] hover:text-white rounded-[10px]">
                    Confirm Area of interest
                  </button>
                </div>
              </Fragment>
            )}
          </div>
        </nav>
      </aside>
    </>
  );
}
