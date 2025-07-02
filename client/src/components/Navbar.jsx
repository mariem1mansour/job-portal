import React from 'react'
import { assets } from './../assets/assets';
import { useClerk , UserButton ,useUser } from '@clerk/clerk-react';
import {Link} from 'react-router-dom'
const Navbar = () => {

  const {openSignIn} = useClerk() ; //useClerk is react hook tabi3 il clerk, ki nclikiw it7al il login form

  const {user} =useUser(); // si user logged the user will not be empty
  return (
    <div className='shadow py-4'>
      <div className='container px-4 2xl:px-20 mx-auto flex justify-between items-center '>
        <img src={assets.logo1} alt="logo" width={180} height={38} />

{
  user 
  ? <div className='flex items-center gap-3'>
    <Link to={'/applications'}>Applied Jobs</Link>
    <p>|</p>
    <p>Hello , {user.firstName+" "+user.lastName}</p>
    <UserButton/>
  </div>
  :
      <div className='flex gap-4 max-sm:text-xs'>
          <button className='text-gray-600'>Recruiter Login</button>
          <button onClick={e=> openSignIn()} className='bg-fuchsia-300 text-white px-6 sm:px-9 py-2 rounded-full'>Login</button>
      </div>

}

      </div>
    </div>
  )
}

export default Navbar