import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ForumHeader from "../../Components/ForumHeader";
import PostComponent from "../../Components/ForumPage/Posts";
import { AddNewIcon, LoadingIcon } from "../../Components/Icons";
import { useFetch } from "../../Contexts/Fetch";

const Posts = () => {
  const { id } = useParams();
  const CustomFetch = useFetch();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [searchParam, setSearchParam] = useState("");

  // Filter data.posts for search functionality

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { data, response } = await CustomFetch({
        url: `category/${id}`,
        returnResponse: true,
      });

      if (!response.ok) {
        // TODO: redirect to not found page.
        return alert("Can't find category");
      }

      setIsLoading(false);
      setData(data.data);
    })();
  }, []);

  console.log(data);

  return (
    <div className="pb-32 bg-[#1B263B]">
      <ForumHeader />

      <div className="mt-32 px-2 w-full h-full">
        <div className="bg-white w-full h-full min-h-[512px] p-2">
          <div className="border border-gray-400">
            <header className="flex justify-between flex-row bg-gray-300 p-2 border border-b-gray-400 gap-6 items-center">
              <h1 className="text-gray-600 text-2xl font-semibold">
                {data && data.name} {isLoading && "Loading..."}
              </h1>
              <div className="flex flex-row gap-2 items-center">
                <input
                  onChange={(e) => setSearchParam(e.target.value)}
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Search..."
                  className="px-2 py-1 border-slate-500 w-full max-w-[300px] rounded-sm outline-none placeholder-slate-500 text-slate"
                />
                <AddNewIcon width="8" height="8" />
              </div>
            </header>

            <section className="mt-8 flex flex-col gap-2 pb-8 px-2">
              {data && (
                <PostComponent posts={data.posts} searchParam={searchParam} />
              )}
              {!data && <LoadingIcon color="text-black" />}
            </section>
            <section className="w-full justify-center flex flex-row gap-4 my-2">
              <button className="bg-violet-500 px-2 py-1 text-white rounded-sm">
                Previous Page
              </button>
              <button className="bg-violet-500 px-2 py-1 text-white rounded-sm">
                Next Page
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
