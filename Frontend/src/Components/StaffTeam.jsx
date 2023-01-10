import React from 'react'
import github from "../assets/github.svg"
import email from "../assets/email.svg"
import { SwiperSlide } from 'swiper/react'

const StaffTeam = (props) => {
    const { role, bio, email: userEmail, username, profilePicture } = props
    
  return (
    <SwiperSlide>
        <section className="flex flex-row w-full h-full">
            <img src={profilePicture} alt="" className="object-cover object-center max-w-[300px] w-full" />

            <div className="w-full text-white mt-3 flex flex-col items-center relative">
                <header className="text-center">
                    <h4 className="font-semibold text-3xl">{username}</h4>
                    <p className="font-normal">{role.title}</p>
                </header>
                <p className="px-6 mt-2 text-center font-light">{ bio ? "Missing bio..." : bio }</p>
                <footer className="flex flex-row justify-between px-4 gap-8 absolute bottom-2">
                    <a href="https://www.github.com/ben" className="flex flex-row gap-2 items-center ">
                        <img src={github} alt="" className="w-[32px]"/>
                        <p>COMING SOON</p>
                    </a>
                    <a href={`mailto:${userEmail}`} className="flex flex-row gap-2 items-center">
                        <img src={email} alt="" className="w-[32px]"/>
                        <p>{userEmail}</p>
                    </a>
                </footer>
            </div>
        </section>
    </SwiperSlide>
  )
}

export default StaffTeam
