import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ForumHeader from "../../Components/ForumHeader";
import PostComponent from "../../Components/ForumPage/Posts";
import { AddNewIcon, LoadingIcon } from "../../Components/Icons";
import { useFetch } from "../../Contexts/Fetch";
import { useDebounce } from "usehooks-ts";

const Posts = () => {
  const { id } = useParams();
  const CustomFetch = useFetch();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [searchParam, setSearchParam] = useState("");
  const [showPrevBtn, setShowPrevBtn] = useState(false);
  const [showNextBtn, setShowNextBtn] = useState(true);
  const [allPosts, setAllPosts] = useState([]);
  const [postToShow, setPostToShow] = useState([]);

  // Pagination: Keep track of the current page and set a limitation of posts per page
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
  // Pagination: Keep track of indexes to slice the array - this is for initial render, I calculate additional renders in the btns or useEffects
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const debounceValue = useDebounce(searchParam, 700);

  useEffect(() => {
    (async () => {
      console.log("inital data loaded");
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
      setAllPosts(data.data.posts);
      //

      // posts to show is the cut array with set items.
      setPostToShow(data.data.posts.slice(indexOfFirstPost, indexOfLastPost));
    })();
  }, []);

  useEffect(() => {
    console.log("useEffect ran with debounce value");
    // if we return to empty, set page to 1 and

    if (searchParam.length === 0) {
      // Might always set page to 1
      setCurrentPage(1);
      // reset posts to original array
      setAllPosts(data?.posts);
      setPostToShow(data?.posts.slice(0, postsPerPage));
    }

    if (searchParam != "") {
      setCurrentPage(1);
      // The full array of filtered posts
      const filteredPosts = data?.posts.filter((item) => {
        return searchParam.toLowerCase() === ""
          ? item
          : item.title.toLowerCase().includes(searchParam.toLowerCase());
      });
      setAllPosts(filteredPosts);

      const currentPosts = filteredPosts?.slice(
        indexOfFirstPost,
        indexOfLastPost
      );
      setPostToShow(currentPosts);
    }
    // Triggers when "debouncedValue" changes
  }, [debounceValue]);

  const previousPage = () => {
    console.log(currentPage);
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      setShowNextBtn(true);
      const lastIndex = (currentPage - 1) * postsPerPage;
      const firstIndex = lastIndex - postsPerPage;
      // console.log(indexOfFirstPost, indexOfLastPost);

      setPostToShow(allPosts.slice(firstIndex, lastIndex));

      // If we reach the start after clicking back, hide the prev btn
      if (currentPage - 1 === 1) {
        setShowPrevBtn(false);
        const lastIndex = (currentPage - 1) * postsPerPage;
        const firstIndex = lastIndex - postsPerPage;
        // console.log(indexOfFirstPost, indexOfLastPost);

        setPostToShow(allPosts.slice(firstIndex, lastIndex));
        // setPostToShow(allPosts.slice(indexOfFirstPost, indexOfLastPost));
      }
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(allPosts.length / postsPerPage)) {
      console.log(currentPage, "not equal to last page");
      setCurrentPage(currentPage + 1);
      setShowPrevBtn(true);

      const lastIndex = (currentPage + 1) * postsPerPage;
      const firstIndex = lastIndex - postsPerPage;
      console.log(firstIndex, lastIndex);

      setPostToShow(allPosts.slice(firstIndex, lastIndex));

      // If we reach the end of the posts, hide the next btn
      if (currentPage + 1 === Math.ceil(allPosts.length / postsPerPage)) {
        setShowNextBtn(false);
        const lastIndex = (currentPage + 1) * postsPerPage;
        const firstIndex = lastIndex - postsPerPage;
        console.log(indexOfFirstPost, indexOfLastPost);

        setPostToShow(allPosts.slice(firstIndex, lastIndex));
      }
    }
  };

  console.log(data?.posts);

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
              {data && <PostComponent posts={postToShow} />}
              {!data && <LoadingIcon color="text-black" />}
            </section>
            <section
              className={`w-full justify-center flex flex-row gap-4 my-2 ${
                Math.ceil(allPosts?.length / postsPerPage) === 1 ? "hidden" : ""
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
