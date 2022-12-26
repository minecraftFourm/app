import React from "react";
import ForumBg from "../assets/fourmbg.jfif"

const Forumpage = () => {
  return (
    <div className="pb-32 bg-[#1B263B] ">
      {/* Hero */}
      <section className="h-96 w-full relative">
        <img src={ForumBg} alt="Fourm Background" className="h-full w-full" />
        <div className={`absolute top-0 z-0 bottom-0 left-0 right-0 grid place-items-center text-white bg-[#00000080] duration-1000`}>
          <h1 className={`font-extrabold text-6xl duration-700 opacity-100 z-10`}>Server Forum</h1>
        </div>
      </section>

      {/* Forum */}
      <div className="w-full h-[1200px] pt-16 flex px-16 py-4 gap-8">
        <section className="w-full bg-white h-full"></section>
        <aside className="h-[900px] w-[450px] bg-white pt-6 pb-2 px-2 flex flex-col gap-4"></aside>
      </div>
    </div>
  );
};

export default Forumpage;
