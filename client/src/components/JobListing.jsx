import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import JobCard from "./JobCard";

const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter, jobs } =
    useContext(AppContext);
  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  //Fonction quand on coche une catégorie
  //Si elle était déjà cochée → on la décoche
  // Si elle ne l’était pas → on la coche
  const handleCategoryChange = (category) => {
    // (prev) signifie : « Donne-moi la liste actuelle » (ce qu’il y avait avant)
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : // Prends tout ce qu’il y a dans prev, et ajoute category à la fin
          [...prev, category]
    );
  };

  const handleLocationChange = (location) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((c) => c !== location)
        : [...prev, location]
    );
  };

  useEffect(
    () => {
      // Pour chaque emploi, cette fonction dit :
      // Si aucune catégorie n’est cochée , alors OK, montre-le.
      // Sinon, montre-le seulement s’il fait partie d’une des catégories cochées .
      const matchesCategory = (job) =>
        selectedCategories.length === 0 ||
        selectedCategories.includes(job.category);

      const matchesLocation = (job) =>
        selectedLocations.length === 0 ||
        selectedLocations.includes(job.location);

      const matchesTitle = (job) =>
        searchFilter.title === "" ||
        job.title.toLowerCase().includes(searchFilter.title.toLowerCase());

      const matchesSearchLocation = (job) =>
        searchFilter.location === "" ||
        job.location
          .toLowerCase()
          .includes(searchFilter.location.toLowerCase());

      /**
 * On applique les filtres :
.slice() → copie de la liste originale
.reverse() → pour montrer les plus récents en premier
.filter() → garde seulement les emplois qui correspondent à tous les critères
 */
      const newFilteredJobs = jobs
        .slice()
        .reverse()
        .filter(
          (job) =>
            matchesCategory(job) &&
            matchesLocation(job) &&
            matchesTitle(job) &&
            matchesSearchLocation(job)
        );

      setFilteredJobs(newFilteredJobs);
      setCurrentPage(1);
    },
    //useEffect se lance chaque fois que l’une de ces valeurs change.
    [jobs, selectedCategories, selectedLocations, searchFilter]
  );

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
                <input
                  className="scale-125"
                  type="checkbox"
                  onChange={() => {
                    handleCategoryChange(category);
                  }}
                  checked={selectedCategories.includes(category)}
                />
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
                <input
                  className="scale-125"
                  type="checkbox"
                  onChange={() => {
                    handleLocationChange(location);
                  }}
                  checked={selectedLocations.includes(location)}
                />
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
          {filteredJobs
            .slice((currentPage - 1) * 6, currentPage * 6)
            .map((job, index) => (
              <JobCard key={index} job={job} />
            ))}
        </div>

        {/* Pagination */}

        {filteredJobs.length > 0 && (
          <div className="flex items-center justify-center space-x-2 mt-10">
            <a href="#job-list">
              <img
                onClick={() => {
                  setCurrentPage(Math.max(currentPage - 1), 1);
                }}
                src={assets.left_arrow_icon}
                alt="left arrow icon"
              />
            </a>

            {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map(
              (_, index) => (
                <a key={index} href="#job-list">
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
                  setCurrentPage(
                    Math.min(
                      currentPage + 1,
                      Math.ceil(filteredJobs.length / 6)
                    )
                  );
                }}
                src={assets.right_arrow_icon}
                alt="right arrow icon"
              />
            </a>
          </div>
        )}
      </section>
    </div>
  );
};

export default JobListing;
