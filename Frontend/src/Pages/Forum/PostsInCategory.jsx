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
  const [showPrevBtn, setShowPrevBtn] = useState(false);
  const [showNextBtn, setShowNextBtn] = useState(true);

  // Pagination: Keep track of the current page and set a limitation of posts per page
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);
  // Pagination: Keep track of indexes to slice the array
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  // The full array of filtered posts
  const filteredPosts = data?.posts.filter((item) => {
    return searchParam.toLowerCase() === ""
      ? item
      : item.title.toLowerCase().includes(searchParam.toLowerCase());
  });

  // The array of posts we are currently going to display
  const currentPosts = filteredPosts?.slice(indexOfFirstPost, indexOfLastPost);

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

  const previousPage = () => {
    if (currentPage !== 1) {
      console.log(currentPage);
      setCurrentPage(currentPage - 1);
      setShowNextBtn(true);
      // If we reach the start after clicking back, hide the prev btn
      if (currentPage - 1 === 1) {
        setShowPrevBtn(false);
      }
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(filteredPosts.length / postsPerPage)) {
      setCurrentPage(currentPage + 1);
      setShowPrevBtn(true);
      // If we reach the end of the posts, hide the next btn
      if (currentPage + 1 === Math.ceil(filteredPosts.length / postsPerPage)) {
        setShowNextBtn(false);
      }
    }
  };

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
                  onChange={(e) => {
                    setSearchParam(e.target.value);
                  }}
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
              {data && <PostComponent posts={currentPosts} />}
              {!data && <LoadingIcon color="text-black" />}
            </section>
            <section
              className={`w-full justify-center flex flex-row gap-4 my-2 ${
                Math.ceil(filteredPosts?.length / postsPerPage) === 1
                  ? "hidden"
                  : ""
              }`}
            >
              <button
                className={`bg-violet-500 px-2 py-1 text-white rounded-sm ${
                  showPrevBtn ? "" : "hidden"
                }`}
                onClick={previousPage}
              >
                Previous Page
              </button>
              <button
                className={`bg-violet-500 px-2 py-1 text-white rounded-sm ${
                  showNextBtn ? "" : "hidden"
                }`}
                onClick={nextPage}
              >
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
