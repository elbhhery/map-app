import { useState, useRef } from "react";
import { SmallNav } from "./ViewNavBar";
export default function BaseNavBar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showmenu, setShowmenu] = useState(true);

  return (
    <>
      <SmallNav />
      <nav
        className={`${
          showmenu ? "w-[313px]" : "w-[50px]"
        } absolute top-0 left-[72px] h-screen z-10 bg-white`}
      >
        <div className=" h-[50px] bg-[#F5EEE0]"></div>
        <div className="p-4 bg-[##FFFFFF]">
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

          <div className={`mt-10 mb-3  ${showmenu ? "" : "hidden"}`}>
            <p className="text-[18px] text-[#7E786F]">
              Search or use tool to creat your region
            </p>
          </div>

          <label
            htmlFor="search"
            className={`${showmenu ? "" : "hidden"} text-[#7E786F] font-bold`}
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
            <button
              className={`bg-[#7e786f] py-4 w-full text-[18.5px] text-[#ede7d9] mt-10 mb-2 rounded-[10px]`}
            >
              Apply outline as base image
            </button>
            <label className="text-[12px] text-[#7E786F]">
              You can always edit the the snap of the area later
            </label>
            <button className="mt-20 w-full text-[18.5px] text-[#f1e5d5] h-[62px] mb-2 bg-[#b8642b] hover:bg-[#e4ad89] hover:text-white rounded-[10px]">
              Confirm Area of interest
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
