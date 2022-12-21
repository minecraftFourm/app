import React from 'react'
import upArrow from "../assets/up-arrow.svg"

const Scroll = () => {
  return (
    <div className='w-full px-4 py-2 grid place-content-end'>
        <a href="#header" className="rounded-full bg-white w-[64px] h-[64px] grid place-content-center drop-shadow-2xl">
            <img src={upArrow} alt="Scroll to top." className="h-[24px] w-[24px]" />
        </a>
    </div>
  )
}

export default Scroll