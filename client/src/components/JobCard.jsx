import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const JobCard = ({job}) => {
const navigate = useNavigate()

  return (
    <div className='border border-gray-300 p-6 shadow-md rounded-3xl'>
      <div className="flex justify-between items-center">
        <img className='h-8' src={job.companyId.image} alt="company image" />
      </div>
      <h4 className='font-medium mt-2 text-xl'>{job.title}</h4>
      <div className="flex items-center gap-2.5 text-xs mt-1 mb-1">
        <span className='bg-indigo-100 border-indigo-900 px-4 py-2 rounded-full'>{job.location}</span>
        <span className='bg-purple-100 border-purple-950 px-4 py-2 rounded-full'>{job.level}</span>
      </div>
      <p className='text-gray-500 text-sm mt-3' dangerouslySetInnerHTML={{__html:job.description.slice(0,150)}}></p>
      <div className="mt-4 flex gap-4 text-sm">
        <button onClick={() => { navigate(`/apply-job/${job._id}`); scrollTo(0,0) }} className='bg-fuchsia-300 text-white px-4 py-2 rounded'>Apply Now</button>
        <button onClick={() => { navigate(`/apply-job/${job._id}`); scrollTo(0,0) }} className='text-gray-500 border border-gray-500 rounded px-4 py-2'>Learn More</button>
      </div>
    </div>
  )
}

export default JobCard