import React from 'react'
import { format } from 'timeago.js'

const RecentPosts = (props) => {
    const { title, updated, owner: { username }, id} = props

  return (
    <div className="flex border border-violet-500 items-center px-2 py-1" key={id}>
        <div className="w-full">
            <p className="line-clamp-1 text-sm font-semibold">{title}</p>
            <footer className="w-full flex flex-row justify-between">
                <p className="text-xs text-gray-500">{username}</p>
                <p className="text-xs text-gray-500">{format(updated)}</p>
            </footer>
        </div>
    </div>
  )
}

export default RecentPosts