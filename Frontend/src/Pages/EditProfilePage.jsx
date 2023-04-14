import React from 'react'
import bgprofile from '../assets/bgprofile.png'
import pretty from '../assets/pretty.png'

const EditProfilePage = () => {
  return (
    <div>
          <div>
            <img src={bgprofile} alt="bgprofile" className='relative h-[500px] w-screen' />
            <div className='absolute inset-x-0 top-60'>
              <img src={pretty} className='mx-auto h-52 w-52 border-black border-2 rounded-full' />
            </div>
        </div>
        <div className='grid grid-cols-1 py-3'>
          <label className='font-bold text-gray-400 text-2xl px-6'>Username:
            <div>
              <input type="text" className='w-11/12'/>
            </div>
          </label>
          <label className='font-bold text-gray-400 text-2xl px-6'>Email:
            <div>
              <input type="text" className='w-11/12'/>
            </div>
          </label>
          <label className='font-bold text-gray-400 text-2xl px-6'>Bio:
            <div>
              <textarea className='w-11/12 h-[150px] border-black border-solid border-[1px]'/>
            </div>
          </label>
          <label className='font-bold text-gray-400 text-2xl px-6'>Instagram:
            <div>
              <input type="text" className='w-11/12'/>
            </div>
          </label>
          <label className='font-bold text-gray-400 text-2xl px-6'>Discord:
            <div>
              <input type="text" className='w-11/12'/>
            </div>
          </label>
          <label className='font-bold text-gray-400 text-2xl px-6'>Minecraft Username:
            <div>
              <input type="text" className='w-11/12'/>
            </div>
          </label>
          <label className='font-bold text-gray-400 text-2xl px-6'>Show Email:
            <input type="checkbox" className='ml-2 w-6 h-6' />
          </label>
        </div>
    </div>
  )
}

export default EditProfilePage