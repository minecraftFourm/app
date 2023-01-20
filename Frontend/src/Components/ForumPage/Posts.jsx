import DOMPurify from 'dompurify'
import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'timeago.js'
import { convert } from 'html-to-text'
// const { convert } = require('html-to-text');

const Posts = (props) => {
    const { posts: data } = props

    const Component = () => {

        const posts = data.map(item => {
            const { id, updated, ownerId, content, owner: { profilePicture, username }, comments } = item
            // console.log(convert(content).slice(0, 9))
            return (
                <div className='flex flex-row gap-4 justify-between border overflow-hidden bg-gray-100 p-2 border-gray-300' key={id}>
                    <div className='flex flex-row gap-2'>
                        <img src={profilePicture} className="rounded-full h-[48px] w-[48px] object-cover" />
                        <div className='flex flex-col justify-between'>
                            <Link to={`/forum/post/${id}`} className='line-clamp-1 text-ellipsis cursor-pointer text-gray-600'>{convert(content).slice(0, 128)}</Link>
                            <Link to={`/user/${ownerId}`} className="text-gray-400 text-sm cursor-pointer">{username}</Link>
                        </div>
                    </div>
                    <p className='self-center text-sm text-gray-400 font-medium min-w-fit'>{comments.length} { comments.length === 0 ? "Replies" : comments.length === 1 ? "Reply" : "Replies" } </p>
                    <div className='flex items-end flex-col justify-between min-w-fit'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-500 cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                        <p className='font-light text-xs'>{format(updated)}</p>
                    </div>
                </div>
            )
        })

        return posts
    }

  return (
    <Component />
  )
}

export default Posts
