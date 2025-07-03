import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import JobCard from "./JobCard";

const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter, jobs } =
    useContext(AppContext);
  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className="container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8">
      {/* Side Bar  */}
      <div className="w-full lg:w-1/4 bg-white px-4">
        {/* Search filter from Hero  */}

        {isSearched &&
          (searchFilter.title !== "" || searchFilter.location !== "") && (
            <>
              <h3 className="font-medium text-lg mb-4">Current Search : </h3>
              {/* the &&() ma3neha then() */}
              <div className="mb-4 text-gray-600">
                {searchFilter.title && (
                  <span className="inline-flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-1 rounded-full">
                    {searchFilter.title}
                    <img
                      onClick={(e) =>
                        setSearchFilter((prev) => ({ ...prev, title: "" }))
                      }
                      className="cursor-pointer"
                      src={assets.cross_icon}
                      alt="cross"
                    />
                  </span>
                )}

                {searchFilter.location && (
                  <span className="ml-1 inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 px-4 py-1 rounded-full">
                    {searchFilter.location}
                    <img
                      onClick={(e) =>
                        setSearchFilter((prev) => ({ ...prev, location: "" }))
                      }
                      className="cursor-pointer"
                      src={assets.cross_icon}
                      alt="cross"
                    />
                  </span>
                )}
              </div>
            </>
          )}

        <button
          onClick={(e) => {
            setShowFilter((prev) => !prev);
          }}
          className="px-6 py-2 rounded-full border border-gray-400 lg:hidden"
        >
          {showFilter ? "close" : "Filters"}
        </button>

        {/*  category filter */}

        {/* max-lg:hidden signifie :Cacher (hidden) cet élément quand la largeur de l'écran est inférieure à lg (1024px) */}
        <div className={showFilter ? "" : "max-lg:hidden"}>
          <h4 className="font-medium text-lg py-4">Search By Category</h4>
          {/* space-y-4 : ajoute un espacement vertical (gap ) de 1rem entre chaque <li> enfant. */}
          <ul className="space-y-4 text-gray-600">
            {JobCategories.map((category, index) => (
              <li className="flex gap-2 items-center" key={index}>
                {/* scale-125: agrandit la checkbox à 1.25x sa taille normale  */}
                <input className="scale-125" type="checkbox" name="" id="" />
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Location filter */}

        <div className={showFilter ? "" : "max-lg:hidden"}>
          <h4 className="font-medium text-lg py-4 pt-14">Search By Location</h4>
          {/* space-y-4 : ajoute un espacement vertical (gap ) de 1rem entre chaque <li> enfant. */}
          <ul className="space-y-4 text-gray-600">
            {JobLocations.map((location, index) => (
              <li className="flex gap-2 items-center" key={index}>
                {/* scale-125: agrandit la checkbox à 1.25x sa taille normale  */}
                <input className="scale-125" type="checkbox" name="" id="" />
                {location}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Job List */}
      <section className="w-full lg:w-3/4 text-gray-800 max-lg:px-4">
        <h3 className="font-medium text-3xl py-2" id="job-list">
          Recent added jobs
        </h3>
        <p className="mb-8">Get your dream job right now !</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {jobs
            .slice((currentPage - 1) * 6, currentPage * 6)
            .map((job, index) => (
              <JobCard key={index} job={job} />
            ))}
        </div>

        {/* Pagination */}

        {jobs.length > 0 && (
          <div className="flex items-center justify-center space-x-2 mt-10">
            <a href="#job-list">
              <img
              onClick={() => { setCurrentPage(Math.max(currentPage-1),1) }}
              src={assets.left_arrow_icon} alt="left arrow icon" />
            </a>

            {Array.from({ length: Math.ceil(jobs.length / 6) }).map(
              (_, index) => (
                <a href="#job-list">
                  <button
                    onClick={() => {
                      setCurrentPage(index + 1);
                    }}
                    className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${
                      currentPage === index + 1
                        ? "bg-fuchsia-100 text-fuchsia-500"
                        : "text-gray-500"
                    }`}
                  >
                    {index + 1}
                  </button>
                </a>
              )
            )}

            <a href="#job-list">
              <img
              onClick={() => { 
                setCurrentPage(Math.min(currentPage+1,Math.ceil(jobs.length/6)))
               }}
               src={assets.right_arrow_icon} alt="right arrow icon" />
            </a>
          </div>
        )}
      </section>
    </div>
  );
};

export default JobListing;
