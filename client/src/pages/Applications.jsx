import { useState } from "react";
import Navbar from "../components/Navbar";
import { assets, jobsApplied } from "../assets/assets";
import moment from "moment";
import Footer from "../components/Footer";

const Applications = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [cv, setCv] = useState(null);
  return (
    <>
      <Navbar />
      {/* La classe min-h-[65vh] dit à ton élément HTML :Peu importe ce que tu contiens, tu dois faire au minimum 65% de la hauteur de l’écran  */}
      <div className=" container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10">
        <h2 className="text-xl font-semibold">Your C.V</h2>
        <div className="flex gap-3 mb-6 mt-3">
          {isEdit ? (
            <>
              <label className="flex items-center" htmlFor="cvUpload">
                <p className="bg-fuchsia-100 text-fuchsia-600 px-4 py-2 rounded-lg mr-2">
                  Select C.V.
                </p>
                <input
                  id="cvUpload"
                  onChange={(e) => setCv(e.target.files[0])}
                  accept="application/pdf"
                  type="file"
                  hidden
                />
                <img src={assets.profile_upload_icon} alt="profile upload" />
              </label>
              <button
                onClick={(e) => {
                  setIsEdit(false);
                }}
                className="bg-green-100 border border-green-400 rounded-lg px-4 py-2"
              >
                Save
              </button>
            </>
          ) : (
            <div className="flex gap-3">
              <a
                className="bg-fuchsia-100 text-fuchsia-600 px-4 py-2 rounded-lg"
                href=""
              >
                C.V
              </a>
              <button
                onClick={() => {
                  setIsEdit(true);
                }}
                className="text-gray-500 border border-gray-300 rounded-lg px-4 py-2"
              >
                Edit
              </button>
            </div>
          )}
        </div>

        <h2 className="text-xl font-semibold mb-4">Job Applied</h2>
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b text-left">Company</th>
              <th className="py-3 px-4 border-b text-left">Job Title</th>
              <th className="py-3 px-4 border-b text-left max-sm:hidden">Location</th>
              <th className="py-3 px-4 border-b text-left max-sm:hidden">Date</th>
              <th className="py-3 px-4 border-b text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {jobsApplied.map((job, index) =>
              true ? (
                <tr>
                  <td className="py-3 px-4 flex items-center gap-2 border-b">
                    <img className="w-8 h-8" src={job.logo} alt="company logo" />
                    {job.company}
                  </td>
                  <td className="py-2 px-4 border-b">{job.title}</td>
                  <td className="py-2 px-4 border-b max-sm:hidden">{job.location}</td>
                  <td className="py-2 px-4 border-b max-sm:hidden">{moment(job.date).format('ll')}</td>
                  <td className="py-2 px-4 border-b">
                    <span className={`${job.status==='Accepted'? 'bg-green-100':job.status==="Rejected"?'bg-red-100':'bg-yellow-100'}
                      px-4 py-2 rounded-full
                      `}>{job.status}</span>
                    </td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      </div>
      <Footer/>
    </>
  );
};

export default Applications;
