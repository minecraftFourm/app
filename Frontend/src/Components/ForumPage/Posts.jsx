import DOMPurify from "dompurify";
import React from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { convert } from "html-to-text";
import { DeleteIcon } from "../Icons";
import { UseUser } from "../../Contexts/UserContext";

// const { convert } = require('html-to-text');

const Posts = (props) => {
  console.log(props);
  const { posts: data } = props;

  const currentUser = UseUser();
  const { id: userId, isAdmin, canDeletePost } = currentUser.role;

  const Component = () => {
    // These are the filtered posts - we map them on the page
    const posts = data.map((item) => {
      const {
        id,
        updated,
        ownerId,
        content,
        title,
        owner: { profilePicture, username },
        comments,
      } = item;

      // const User = role: { canDeleteOtherPost, canDeletePost, isAdmin },
      // console.log(convert(content).slice(0, 9))
      return (
        <div
          className="flex flex-row gap-4 justify-between border overflow-hidden bg-gray-100 p-2 border-gray-300"
          key={id}
        >
          <div className="flex flex-row gap-2 flex-1">
            <img
              src={profilePicture}
              className="rounded-full h-[48px] w-[48px] object-cover"
            />
            <div className="flex flex-col justify-between">
              <Link
                to={`/forum/post/${id}`}
                className="line-clamp-1 text-ellipsis cursor-pointer text-gray-600"
              >
                {convert(title).slice(0, 128)}
              </Link>
              <Link
                to={`/user/${ownerId}`}
                className="text-gray-400 text-sm cursor-pointer"
              >
                {username}
              </Link>
            </div>
          </div>
          <p className="self-center text-sm text-gray-400 font-medium min-w-fit flex-1">
            {comments.length}{" "}
            {comments.length === 0
              ? "Replies"
              : comments.length === 1
              ? "Reply"
              : "Replies"}{" "}
          </p>
          <div className="flex items-end flex-col justify-between min-w-fit">
            {/* If the user owns the post and can delete posts, or if the user can delete other peoples post or if the user is an admin. */}
            {isAdmin || (ownerId === userId && canDeletePost) ? (
              <DeleteIcon width="2" height="2" style="text-gray-400" />
            ) : null}
            <p className="font-light text-xs">{format(updated)}</p>
          </div>
        </div>
      );
    });

    return posts;
  };

  return <Component />;
};

export default Posts;
