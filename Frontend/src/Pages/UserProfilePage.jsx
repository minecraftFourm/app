import React from 'react'
import Rectangle26 from '../assets/Rectangle26.png'
import pretty from '../assets/pretty.png'

const UserProfilePage = () => {
  return (
    <div className='bg-[#1B263B]'>
        <div>
            <div className="relative m h-50 rounded-b flex justify-center pt-20 mb-24 mx-12">
            <img src= {Rectangle26} />
            <div className="absolute -bottom-24 left-2">
            <img
            src= {pretty}  className="object-cover border-4 font-bold border-white w-36 h-36 rounded-full"/>
            <p className='pl-12 text-white'>Pretty</p>
            <button class="bg-red-500 hover:bg-red-700 text-white ml-9 px-2 rounded"> ADMIN</button>
            </div>
            <div className='absolute inset-x-0 -bottom-9'>
                <p className='text-white ml-44 mr-6 p-1 border-2 border-white'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris placerat mi sed lorem commodo, vel vehicula nunc rhoncus. Nulla quis scelerisque nisi. Sed urna elit, semper nec purus vel, pretium imperdiet felis. Nam eget justo ut tortor accumsan mattis. Morbi eu sem mauris. Sed elit ex, elementum vel posuere et, pharetra eu diam.</p>
                <div className='flex pt-6 pl-48 text-white'>
                <p>Followers 0</p>
                <p className='pl-2'>Following 0</p>
            </div>
            </div>
            <div className='absolute -bottom-20 right-6 h-16 w-16 mr-3'>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold px-6 rounded">Follow</button>
            </div>
        </div>
        <div><p>sae</p></div>       
        </div>
    </div>
    
  )
}

export default UserProfilePage