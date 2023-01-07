import React from "react";
import ForumHeader from "../Components/ForumHeader";

const Forumpage = () => {
  return (
    <div className="pb-32 bg-[#1B263B] ">
      {/* Hero */}
      <ForumHeader />

      {/* Forum */}
      <div className="w-full h-[1200px] pt-16 flex px-16 py-4 gap-8">
        <section className="w-full bg-white h-full"></section>
        <aside className="h-[900px] w-[450px] bg-white pt-6 pb-2 px-2 flex flex-col gap-4"></aside>
      </div>
    </div>
  );
};

export default Forumpage;
