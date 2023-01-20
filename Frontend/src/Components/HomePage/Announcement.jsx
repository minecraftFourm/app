import DOMPurify from 'dompurify'
import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'timeago.js'

const Announcement = ({...props}) => {
  const { id, title, updated, content, owner: { username }, comments, ownerId } = props
  
  return (
    <div className="w-full border border-gray-400 bg-white rounded-sm overflow-hidden">
        <header className="w-full flex flex-row items-center justify-between bg-violet-500 text-white px-2 py-1">
            <Link to={`forum/post/${id}`} className="font-medium">{title}</Link>
            <span className="font-light text-sm">{format(updated)}</span>
        </header>
        <section className="flex flex-col gap-4 p-2 min-h-[100px]">
            <div className="text-sm w-full h-full line-clamp-15" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(content)}}></div>
        </section>
        <footer className="w-full flex flex-row justify-between items-center bg-gray-200 text-gray-700 px-2 py-2">
            <Link to={`user/${ownerId}`} className="text-sm">Posted by {username}</Link>
            <span className="text-sm font-light">{comments.length} {comments.length === 0 ? "comments" : comments.length === 1 ? "comment" : "comments" }</span>
        </footer>
    </div>
  )
}



export default Announcement