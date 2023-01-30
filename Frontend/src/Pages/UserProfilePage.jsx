import React from 'react'
import Rectangle26 from '../assets/Rectangle26.png'
import pretty from '../assets/pretty.png'

const UserProfilePage = () => {
  return (
    <div>
        <div className='bg-[#1B263B]'>
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
                <button class="bg-[#7F7EFF] hover:bg-[#7F7EFF] text-white font-bold px-6 rounded">Follow</button>
            </div>
        </div>
        <div className='flex bg-white mr-16 ml-48 py-2 rounded-lg'>
            <p className='pl-2 pr-3'>Postings</p>
            <p className='pr-3'>Activity</p>
            <p>About</p>
            <p className='absolute right-20'>Edit</p>
        </div>       
        <div className='border-b-4 mx-16 my-4 border-gray-700'></div>
        <div>
            {/* card */}

            <div class="flex justify-center">
                <div class="rounded-lg shadow-lg bg-white w-11/12">
                    <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">
                    <img class="rounded-t-lg w-11/12" src="https://mdbootstrap.com/img/new/standard/nature/182.jpg" alt=""/>
                    </a>
                    <div class="p-6">
                    <h5 class="text-gray-900 text-xl font-medium mb-2">Card title</h5>
                    <p class="text-gray-700 text-base mb-4">
                        Some quick example text to build on the card title and make up the bulk of the card's
                        content.
                    </p>
                    <button type="button" class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Button</button>
                    </div>
                </div>
            </div>
        </div>
        </div>

    </div>
    
  )
}

export default UserProfilePage