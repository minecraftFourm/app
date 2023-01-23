import React from 'react'
import email from "../../assets/email.svg"
import github from "../../assets/github.svg"
import { SwiperSlide } from 'swiper/react'

const StaffTeam = (props) => {
    const { role, bio, email: userEmail, username, profilePicture } = props
    
  return (
    <SwiperSlide>
        <section className="flex flex-row md:flex-col border mx-auto w-fit rounded-sm md:py-2 md:px-4 max-w-[800px] bg-indigo-500">
            <img src={profilePicture} alt="" className="object-cover object-center rounded-full max-w-[120px]  self-center mx-4" />

            <div className="w-full text-white mt-3 flex flex-col items-center">
                <header className="text-center">
                    <h4 className="font-semibold text-3xl capitalize">{username}</h4>
                    <p className={`font-normal w-fit mx-auto px-2 bg-[${role.color}] text-xs`}>{role.title}</p>
                </header>
                <p className="px-6 mt-4 text-center font-light min-h-[128px] w-full">{ bio ? bio : "No bio..." }</p>

                <footer className="flex flex-row md:flex-col gap-2 justify-between px-4 py-2 mt-4">
                    <a href="https://www.github.com/ben" className="flex flex-row gap-2 items-center ">
                        <img src={github} alt="" className="w-[24px]"/>
                        <p>COMING SOON</p>
                    </a>
                    <a href={`mailto:${userEmail}`} className="flex flex-row gap-2 items-center">
                        <img src={email} alt="" className="w-[24px]"/>
                        <p>{userEmail}</p>
                    </a>
                </footer>
            </div>
        </section>
    </SwiperSlide>
  )
}

export default StaffTeam
