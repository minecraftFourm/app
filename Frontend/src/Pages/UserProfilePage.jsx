import React from 'react'
import Rectangle26 from '../assets/Rectangle26.png'
import Rectangle7 from '../assets/Rectangle7.png'
import pretty from '../assets/pretty.png'
import Rectangle21 from '../assets/Rectangle21.png'
import Rectangle22 from '../assets/Rectangle22.png'
import Rectangle23 from '../assets/Rectangle23.png'
import Rectangle24 from '../assets/Rectangle24.png'
import Rectangle25 from '../assets/Rectangle25.png'
import { Link, useParams } from 'react-router-dom'

// const UserProfilePage = ({ match, history }) => {
    // let userId = match.params.id
    // let [user, setUser] = useState(null)

    // useEffect(() => {
    //     getUser()
    // }, [userId])

    // let getUser = async () => {

    //     let response = await fetch(`/user/${userId}`)
    //     let data = await response.json()
    //     setUser(data)
    // }


const UserProfilePage = () => {
  return (
    <div>
        <div className='bg-[#1B263B]'>
            <div className="relative m h-50 rounded-b flex justify-center pt-20 mb-24 mx-12">
            <img src= {Rectangle26} />
            <div className='absolute top-24 right-36 h-8 w-8 flex'>
                <img src= {Rectangle21} />
                <img src= {Rectangle22} />
                <img src= {Rectangle23} />
                <img src= {Rectangle24} />
                <img src= {Rectangle25} />
            </div>
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
            <p className='pl-3 pr-5'>Postings</p>
            <p className='pr-5'>Activity</p>
            <p>About</p>
            <p className='absolute right-20'>Edit</p>
        </div>       
        <div className='border-b-4 mx-16 my-4 border-gray-700'></div>
        <div className='pb-10'>
            {/* card */}

            <div className="flex justify-center">
                <div className="rounded-sm shadow-lg bg-white w-11/12">
                    <div className='flex bg-[#7F7EFF] py-2 rounded-sm'>
                    <div className='font-bold pl-2 text-white'>
                        Brand New Announcement
                    </div>
                    </div>
                    <img className="rounded-t-lg w-full p-2" src={Rectangle7} alt=""/>
                    <div className="p-6">
                    <p className="text-gray-700 text-base mb-4">
                        Some quick example text to build on the card title and make up the bulk of the card's
                        content. loren loren sinta buko ng papaya dalay dalay dusdos sisingalan ng tanga  bakit walang buko lusot laparanang may hakdog ng iba bahay kubo kahit
                        munti ang larangan doon ay sari sari singkamas at talong bawang at sibuyas na 700 pesos isang kilo kundol patola upot kalabasa at marami pang iba ang mahal ng
                        sibuyas
                    </p>

                    </div>
                    <div className='flex bg-[#7F7EFF] text-white'>
                        <p className='pl-2'>Posted By: Admin User</p>
                        <p className='absolute right-16'>120 Comments</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
        

    </div>
    
  )
}

export default UserProfilePage