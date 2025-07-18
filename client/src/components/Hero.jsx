import { useContext, useRef } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Hero = () => {
  const {setSearchFilter, setIsSearched} = useContext(AppContext);

  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const onSearch = () => {
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });
    setIsSearched(true);

  };

  return (
    <div className="container 2xl:px-20 mx-auto my-10">
      <div className="bg-gradient-to-r from-fuchsia-800 to-fuchsia-950 text-white text-center py-16 mx-2 rounded-xl">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4">
          🚀 Kickstart Your Career with 500,000+ Jobs
        </h2>
        <p className="mb-8 max-w-xl mx-auto text-sm font-light px-5">
          Ready for your next big opportunity? Explore the best job openings now
          and take the first step toward a future full of possibilities!{" "}
        </p>
        <div className="flex items-center justify-content-between bg-white rounded text-gray-600 max-w-xl pl-4 sm:mx-auto">
          <div className="flex items-center">
            <img
              className="h-4 sm:h-5"
              src={assets.search_icon}
              alt="search icon"
            />
            <input
              type="text"
              placeholder="Search For Jobs"
              className="max-sm:text-xs p-2 rounded outline-none w-full"
              ref={titleRef}
            />
          </div>

          <div className="flex items-center">
            <img
              className="h-4 sm:h-5"
              src={assets.location_icon}
              alt="location icon"
            />
            <input
              type="text"
              placeholder="Location"
              className="max-sm:text-xs p-2 rounded outline-none w-full"
              ref={locationRef}
            />
          </div>

          <button
            onClick={onSearch}
            className="bg-fuchsia-300 px-6 py-2 rounded-full text-white m-1"
          >
            Search
          </button>
        </div>
      </div>

      {/* trusted by */}
      <div className="border border-gray-400 shadow-md mx-2 mt-5 p-6 rounded-md flex">
        <div className="flex items-center justify-center gap-10 lg:gap-16 flex-wrap">
          <p className="font-normal">Trusted By</p>
          <img className="h-14" src={assets.xiaomi} alt="" />
          <img className="h-14" src={assets.ibm} alt="" />
          <img className="h-14" src={assets.oracle} alt="" />
          <img className="h-14" src={assets.bmw} alt="" />
          <img className="h-14" src={assets.netflix} alt="" />
          <img className="h-14" src={assets.etsy} alt="" />
          <img className="h-14" src={assets.dell} alt="" />
          <img className="h-14" src={assets.line} alt="" />
          <img className="h-14" src={assets.levis} alt="" />
          <img className="h-14" src={assets.lg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
