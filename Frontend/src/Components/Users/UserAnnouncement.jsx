import React from "react";
import parse from "html-react-parser";

const UserAnnouncement = (props) => {
  console.log(props);
  const { categoryID, content, created, id, ownerId, title, updated } =
    props.item;

  return (
    <div className="flex justify-center">
      <div className="rounded-md shadow-lg bg-white ">
        <div className="flex bg-[#7F7EFF] py-2 rounded-t-md shadow-lg">
          <div className="pl-2 text-white">{title}</div>
          <div className="absolute right-16 text-white">30 minutes ago</div>
        </div>
        {parse(content)}
        {/* <img className="rounded-t-lg w-full p-2" src={Rectangle7} alt="" />
        <div className="p-6">
          <p className="text-gray-700 text-base mb-4">
            Some quick example text to build on the card title and make up the
            bulk of the card's content. loren loren sinta buko ng papaya dalay
            dalay dusdos sisingalan ng tanga bakit walang buko lusot laparanang
            may hakdog ng iba bahay kubo kahit munti ang larangan doon ay sari
            sari singkamas at talong bawang at sibuyas na 700 pesos isang kilo
            kundol patola upot kalabasa at marami pang iba ang mahal ng sibuyas
          </p>
        </div> */}
        <div className="flex bg-gray-300 text-gray-500 p-2 rounded-b-md">
          <p className="pl-2">Posted By: Admin User</p>
          <p className="absolute right-16">120 Comments</p>
        </div>
      </div>
    </div>
  );
};

export default UserAnnouncement;
