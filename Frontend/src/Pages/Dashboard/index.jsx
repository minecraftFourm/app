import React, { Suspense } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Announcements from './Announcements'
import NewAnnouncement from './NewAnnouncement'

const index = () => {
  
    
  return (
    <div className='flex w-full h-screen'>
      <aside className='w-[500px] bg-[#7F7EFF] h-screen'>
        <div className='flex gap-1 flex-col p-1'>
          <Link to='../dashboard' className='border-[#7675FF] bg-[#7F7EFF] px-2 py-1 border w-full h-full text-xl font-medium text-white'>Home</Link>
          <p></p>
          <Link to='announcement' className='border-[#7675FF] bg-[#7F7EFF] px-2 py-1 border w-full h-full text-xl font-medium text-white'>Announcement</Link>
        </div>
      </aside>
      <section className='w-full overflow-y-scroll'>
        <Suspense>
          <Outlet />
        </Suspense>
      </section>
    </div>
  )
}

export default index