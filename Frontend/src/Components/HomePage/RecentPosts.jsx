import React from 'react'
import { format } from 'timeago.js'

const RecentPosts = (props) => {
  const Items = props.items

  const Component = () => {
    return Items.map(item => {
      const { title, updated, owner: { username, profilePicture }, id} = item
      
      return (
        <div className="flex flex-row justify-between gap-2 border border-violet-500 items-center px-2 py-1" key={id}>
            <img src={profilePicture} alt={`${username}'s profile picture.`} className="rounded-full h-[32px] w-[32px]" />
            <div className="w-full">
                <p className="line-clamp-1 text-sm font-semibold">{title}</p>
                <footer className="w-full flex flex-row justify-between">
                    <p className="text-xs text-gray-500 capitalize">{username}</p>
                    <p className="text-xs text-gray-500">{format(updated)}</p>
                </footer>
            </div>
        </div>
      )
    })
  }

  return (
    <Component />
  )
}

export default RecentPosts