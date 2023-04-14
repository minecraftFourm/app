import React from 'react'
import bgprofile from '../assets/bgprofile.png'
import pretty from '../assets/pretty.png'

const EditProfilePage = () => {
  return (
    <div className='h-screen'>
        <img src={bgprofile} alt="bgprofile" className='h-2/5 w-screen' />
        <div className='grid grid-cols-1 py-3'>
          <label className='font-bold text-gray-700 text-2xl px-6'>Username:
            <div>
              <input className='w-11/12'/>
            </div>
          </label>
          <label className='font-bold text-gray-700 text-2xl px-6'>Email:
            <div>
              <input className='w-11/12'/>
            </div>
          </label>
          <label className='font-bold text-gray-700 text-2xl px-6'>Bio:
            <div>
              <input className='w-11/12'/>
            </div>
          </label>
          <label className='font-bold text-gray-700 text-2xl px-6'>Instagram:
            <div>
              <input className='w-11/12'/>
            </div>
          </label>
          <label className='font-bold text-gray-700 text-2xl px-6'>Discord:
            <div>
              <input className='w-11/12'/>
            </div>
          </label>
          <label className='font-bold text-gray-700 text-2xl px-6'>Minecraft Username:
            <div>
              <input className='w-11/12'/>
            </div>
          </label>
          <label className='font-bold text-gray-700 text-2xl px-6'>Show Email:
            <input type="checkbox" className='ml-2 w-6 h-6' />
          </label>
        </div>
    </div>
  )
}

export default EditProfilePage