import React from 'react'
import ForumBg from "../assets/fourmbg.jfif"
import Overlay from './Overlay'

const ForumHeader = () => {
  return (
    <section className="h-96 w-full relative">
        <img src={ForumBg} alt="Fourm Background" className="h-full w-full" />
        <Overlay 
          title="Server Forum"
        />
    </section>
  )
}

export default ForumHeader