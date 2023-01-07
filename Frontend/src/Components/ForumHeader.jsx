import React from 'react'
import ForumBg from "../assets/fourmbg.jfif"

const ForumHeader = () => {
  return (
    <section className="h-96 w-full relative">
        <img src={ForumBg} alt="Fourm Background" className="h-full w-full" />
        <div className={`absolute top-0 z-0 bottom-0 left-0 right-0 grid place-items-center text-white bg-[#00000080] duration-1000`}>
            <h1 className={`font-extrabold text-6xl duration-700 opacity-100 z-10`}>Server Forum</h1>
        </div>
    </section>
  )
}

export default ForumHeader