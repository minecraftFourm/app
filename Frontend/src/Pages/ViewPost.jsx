import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ForumHeader from "../Components/ForumHeader";
import { useFetch } from "../Contexts/Fetch";
import { LoadingIcon } from "../Components/Icons";


const ViewPost = () => {
  const { id } = useParams();
  const CustomFetch = useFetch();
  const [post, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const { data, response } = await CustomFetch({
          url: `post/${id}`,
          returnResponse: true,
        });
        if (!response.ok) throw Error();
        setPost(data.data);
      } catch (error) {
        console.log(error);
        setErr(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  console.log(post);

  return (
    <div className="bg-[#1B263B]">
      <ForumHeader />
      {isLoading && (
        <div className="mt-4">
          <LoadingIcon />
        </div>
      )}
      {err && (
        <div className="mx-4 grid place-content-center mt-6">
          <p className="bg-red-500 text-white px-4 py-2">
            An error has occured while trying to load this post{" "}
          </p>
        </div>
      )}
      {!isLoading && !err && (
        <div className="bg-white px-4 mx-6 md:mx-2 sm:mx-0 sm:px-2 mt-16 py-4">
          <div className="w-full h-fit outline outline-1 pb-2 outline-gray-400">
            <p className="w-full bg-violet-500 text-white px-2 py-1 drop-shadow-lg">
              {post.title}
            </p>
            <div className="py-4 px-2 flex flex-row gap-2 mx-1 mt-3">
              <div className="w-[304px] h-full outline outline-1 outline-gray-400">
                <div>
                  <div>
                    <img></img>
                    <div className="flex flex-col flex-wrap items-center justify-center">
                      <p className="text-2xl font-bold">{post.owner.username}</p>
                      <div className={`bg-[${post.owner.role.color}]`}>
                        <p className="bg-indigo-100 rounded-sm border-[1px] px-2 outline-indigo-500">{post.owner.role.title.toUpperCase()}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
              <div
                className="w-full h-fit px-2 py-2 outline outline-1 outline-gray-400"
                dangerouslySetInnerHTML={{ __html: post.content }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewPost;
