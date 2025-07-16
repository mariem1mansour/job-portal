import React, { useContext, useEffect, useRef, useState } from "react";
import Quill from "quill";
import { JobCategories, JobLocations } from "../assets/assets";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const AddJob = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Paris");
  const [category, setCategory] = useState("Cybersecurity");
  const [level, setLevel] = useState("Entry Level");
  const [salary, setSalary] = useState(0);
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const { backendUrl, companyToken } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const description = quillRef.current.root.innerHTML;

      const { data } = await axios.post(
        backendUrl + "/api/company/post-job",
        {
          title,
          description,
          salary,
          location,
          category,
          level,
        },
        {
          headers: { token: companyToken },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setTitle("");
        setSalary(0);
        quillRef.current.root.innerHTML = "";
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    //initialisation de quill une seule fois
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);
  return (
    <form
      onSubmit={onSubmitHandler}
      className="container p-4 flex flex-col w-full items-start gap-4"
    >
      <div className="w-full">
        <p className="mb-2">Job Title</p>
        <input
          // max-w-lg  signifie :"Limite la largeur maximale de cet élément à la taille lg"
          className="w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded"
          type="text"
          placeholder="Enter The Job Title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
          required
        />
      </div>

      <div className="w-full max-w-lg">
        <p className="mb-2">Job Description</p>
        <div className="" ref={editorRef}></div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div className="">
          <p className="mb-2">Job Category</p>
          <select
            className="w-full px-3 py-2 border-2 border-gray-300 rounded"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            {JobCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="">
          <p className="mb-2">Job Location</p>
          <select
            className="w-full px-3 py-2 border-2 border-gray-300 rounded"
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          >
            {JobLocations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div className="">
          <p className="mb-2">Job Level</p>
          <select
            className="w-full px-3 py-2 border-2 border-gray-300 rounded"
            onChange={(e) => {
              setLevel(e.target.value);
            }}
          >
            <option value="Entry Level">Entry Level</option>
            <option value="Executive">Executive</option>
            <option value="Director">Director</option>
            <option value="Mid-Senior level">Mid-Senior level</option>
            <option value="Senior level">Senior level</option>
            <option value="Associate">Associate</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
      </div>

      <div className="">
        <p className="mb-2">Job Salary</p>
        <input
          className="w-full px-3 py-2 border-2 border-gray-300 rounded sm:w-[120px]"
          onChange={(e) => {
            setSalary(e.target.value);
          }}
          type="number"
          placeholder="2590"
          min={0}
        />
      </div>

      <button className="w-40 py-3 mt-4 bg-fuchsia-600 text-white rounded transition duration-300 hover:scale-105">
        Click To Add Job
      </button>
    </form>
  );
};

export default AddJob;
