import React, { useState, useEffect } from "react";
import Rectangle26 from "../assets/Rectangle26.png";
import Rectangle7 from "../assets/Rectangle7.png";
// import pretty from '../assets/pretty.png'
import { LoadingIcon } from "../Components/Icons";
import Rectangle21 from "../assets/Rectangle21.png";
import Rectangle22 from "../assets/Rectangle22.png";
import Rectangle23 from "../assets/Rectangle23.png";
import Rectangle24 from "../assets/Rectangle24.png";
import Rectangle25 from "../assets/Rectangle25.png";
import { useParams } from "react-router-dom";
import { useFetch } from "../Contexts/Fetch";
import { UseUser } from "../Contexts/UserContext";
import Overlay from "../Components/Overlay";

const UserProfilePage = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const [tab, setTab] = useState("postings");
  const [isLoading, setIsLoading] = useState(true);
  const CustomFetch = useFetch();
  const User = UseUser();
  const [banner, setBanner] = useState(null);

  const bannerList = [
    Rectangle21,
    Rectangle22,
    Rectangle23,
    Rectangle24,
    Rectangle25,
  ];
  useEffect(() => {
    (async () => {
      try {
        const userId = id ? id : User.id;
        setIsLoading(true);
        const { data, response } = await CustomFetch({
          url: `user/${userId}`,
          returnResponse: true,
        });
        if (!response.ok) throw new Error();
        setUser(data.data);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id]);

  const updateTab = (newTab) => {
    setTab(() => newTab);
  };

  return (
    <div className="bg-[#1B263B]">
      {isLoading && <LoadingIcon />}
      {!isLoading && !error && (
        <div className="pt-16 px-8 w-full">
          <div className="relative h-[250px] w-full flex justify-end mb-2">
            <img src={banner} alt="" className="w-full h-full object-cover" />
            <Overlay title="" />
            <div className="absolute top-0 right-0 flex flex-row gap-1">
              <img
                src={Rectangle22}
                onClick={() => {
                  setBanner(Rectangle22);
                }}
                className="w-[32px] h-[32px] cursor-pointer border border-gray-500"
              />
              <img
                src={Rectangle21}
                onClick={() => {
                  setBanner(Rectangle21);
                }}
                className="w-[32px] h-[32px] cursor-pointer border border-gray-500"
              />
              <img
                src={Rectangle23}
                onClick={() => {
                  setBanner(Rectangle23);
                }}
                className="w-[32px] h-[32px] cursor-pointer border border-gray-500"
              />
              <img
                src={Rectangle24}
                onClick={() => {
                  setBanner(Rectangle24);
                }}
                className="w-[32px] h-[32px] cursor-pointer border border-gray-500"
              />
              <img
                src={Rectangle25}
                onClick={() => {
                  setBanner(Rectangle25);
                }}
                className="w-[32px] h-[32px] cursor-pointer border border-gray-500"
              />
            </div>

            <div className="absolute -bottom-32 w-full flex flex-row gap-0">
              <div className="w-[250px] flex flex-col items-center border-2 border-indigo-500">
                <img
                  src={user.profilePicture}
                  className="w-[200px] h-[200px] object-cover rounded-full"
                  alt={`${user.username}'s profile picture`}
                />
                <div className="flex flex-col items-center">
                  <h3 className="text-white capitalize text-lg font-medium">
                    {user.username}
                  </h3>
                  <p
                    style={{
                      backgroundColor: user.role.color,
                    }}
                    className="text-white w-fit px-4 rounded-sm"
                  >
                    {user.role.title}
                  </p>
                </div>
              </div>
              <p className="text-gray-300 text-sm py-1 px-2 border border-gray-800 w-full mx-4 h-fit line-clamp-2">
                {user.bio}
              </p>
            </div>
          </div>

          <div className="w-full flex flex-col gap-2 border-2 border-indigo-300">
            <button className="bg-[#7F7EFF] self-end hover:bg-[#7F7EFF] text-white py-1 px-7 w-fit font-bold rounded-sm">
              Follow
            </button>

            <div className="flex flex-row gap-3 w-3/4 bg-white py-2 px-4 self-end mt-10">
              <p
                onClick={() => updateTab("postings")}
                className={`hover:text-[#7F7EFF] transition-colors duration-300 cursor-pointer ${
                  tab === "postings" ? "text-[#7F7EFF]" : ""
                }`}
              >
                Postings
              </p>
              <p
                onClick={() => updateTab("activity")}
                className={`hover:text-[#7F7EFF] transition-colors duration-300 cursor-pointer ${
                  tab === "activity" ? "text-[#7F7EFF]" : ""
                }`}
              >
                Activity
              </p>
              <p
                onClick={() => updateTab("about")}
                className={`hover:text-[#7F7EFF] transition-colors duration-300 cursor-pointer ${
                  tab === "about" ? "text-[#7F7EFF]" : ""
                }`}
              >
                About
              </p>
              {/* TODO: Add permission support */}
              <p
                onClick={() => updateTab("edit")}
                className={`${
                  tab === "edit" ? "text-[#7F7EFF]" : ""
                }cursor-pointer hover:text-[#7F7EFF] transition-colors duration-300 ml-auto`}
              >
                Edit
              </p>
            </div>
          </div>

          <div className="border-b-4  my-4 border-gray-700"></div>
          <div className="pb-10">
            {/* card */}
            {tab === "postings" && (
              <>
                <div className="flex justify-center">
                  <div className="rounded-sm shadow-lg bg-white ">
                    <div className="flex bg-[#7F7EFF] py-2 rounded-sm">
                      <div className="pl-2 text-white">
                        Brand New Announcement
                      </div>
                      <div className="absolute right-16 text-white">
                        30 minutes ago
                      </div>
                    </div>
                    <img
                      className="rounded-t-lg w-full p-2"
                      src={Rectangle7}
                      alt=""
                    />
                    <div className="p-6">
                      <p className="text-gray-700 text-base mb-4">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content. loren loren
                        sinta buko ng papaya dalay dalay dusdos sisingalan ng
                        tanga bakit walang buko lusot laparanang may hakdog ng
                        iba bahay kubo kahit munti ang larangan doon ay sari
                        sari singkamas at talong bawang at sibuyas na 700 pesos
                        isang kilo kundol patola upot kalabasa at marami pang
                        iba ang mahal ng sibuyas
                      </p>
                    </div>
                    <div className="flex bg-gray-300 text-gray-500 p-2">
                      <p className="pl-2">Posted By: Admin User</p>
                      <p className="absolute right-16">120 Comments</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-2">
                  <div className="rounded-sm shadow-lg bg-white w-11/12">
                    <div className="flex bg-[#7F7EFF] py-2 rounded-sm">
                      <div className="pl-2 text-white">
                        Brand New Announcement
                      </div>
                      <div className="absolute right-16 text-white">
                        30 minutes ago
                      </div>
                    </div>
                    <img
                      className="rounded-t-lg w-full p-2"
                      src={Rectangle7}
                      alt=""
                    />
                    <div className="p-6">
                      <p className="text-gray-700 text-base mb-4">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content. loren loren
                        sinta buko ng papaya dalay dalay dusdos sisingalan ng
                        tanga bakit walang buko lusot laparanang may hakdog ng
                        iba bahay kubo kahit munti ang larangan doon ay sari
                        sari singkamas at talong bawang at sibuyas na 700 pesos
                        isang kilo kundol patola upot kalabasa at marami pang
                        iba ang mahal ng sibuyas
                      </p>
                    </div>
                    <div className="flex bg-gray-300 text-gray-500 p-2">
                      <p className="pl-2">Posted By: Admin User</p>
                      <p className="absolute right-16">120 Comments</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-2">
                  <div className="rounded-sm shadow-lg bg-white w-11/12">
                    <div className="flex bg-[#7F7EFF] py-2 rounded-sm">
                      <div className="pl-2 text-white">
                        Brand New Announcement
                      </div>
                      <div className="absolute right-16 text-white">
                        30 minutes ago
                      </div>
                    </div>
                    <img
                      className="rounded-t-lg w-full p-2"
                      src={Rectangle7}
                      alt=""
                    />
                    <div className="p-6">
                      <p className="text-gray-700 text-base mb-4">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content. loren loren
                        sinta buko ng papaya dalay dalay dusdos sisingalan ng
                        tanga bakit walang buko lusot laparanang may hakdog ng
                        iba bahay kubo kahit munti ang larangan doon ay sari
                        sari singkamas at talong bawang at sibuyas na 700 pesos
                        isang kilo kundol patola upot kalabasa at marami pang
                        iba ang mahal ng sibuyas
                      </p>
                    </div>
                    <div className="flex bg-gray-300 text-gray-500 p-2">
                      <p className="pl-2">Posted By: Admin User</p>
                      <p className="absolute right-16">120 Comments</p>
                    </div>
                  </div>
                </div>
              </>
            )}
            {tab === "activity" && (
              <>
                <h4>Activity Tab</h4>
              </>
            )}
            {tab === "about" && (
              <>
                <h4>About Tab</h4>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
