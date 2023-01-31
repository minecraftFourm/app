import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ForumHeader from "../Components/ForumHeader";
import { useFetch } from "../Contexts/Fetch";

const ViewPost = () => {
  const { id } = useParams();
  const CustomFetch = useFetch();
  const [data, setData] = useState({
    postData: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState();

  useEffect(() => {
    (async () => {
      let { data: postData, response: postResponse } = await CustomFetch({
        url: `post/${id}`,
        returnResponse: true,
      });

      setData((prevValue) => {
        return {
          postData: postData.data,
        };
      });
      setIsLoading(false);
      // TODO: handle erros
    })();
  }, []);

  console.log(data.postData);

  return (
    <div className="bg-[#1B263B]">
      <ForumHeader />
      <div className="bg-white px-4 mx-6 md:mx-2 sm:mx-0 sm:px-2 mt-16 py-4">
        <div className="w-full h-fit outline outline-1 pb-2 outline-gray-400">
          <p className="w-full bg-violet-500 text-white px-2 py-1 drop-shadow-lg">
            {data.postData.title}
          </p>
          <div className="py-4 px-2 flex flex-col gap-2 mx-2 mt-6 outline outline-1 outline-gray-400">

          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPost;
