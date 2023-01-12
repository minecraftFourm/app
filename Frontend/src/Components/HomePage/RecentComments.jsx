import React from 'react'
import { format } from 'timeago.js'

const RecentComments = (props) => {
    const items = props.items
    const Component = () => {
        return items.map(item => {
        const { comment, updated, user: { username }, id } = item

        return (
            <div className="flex border border-violet-500 items-center px-2 py-1" key={id}>
                <div className="w-full">
                    <p className="line-clamp-1 text-sm font-semibold">{comment}</p>
                    <footer className="w-full flex flex-row justify-between">
                        <p className="text-xs text-gray-500">{username}</p>
                        <p className="text-xs text-gray-500">{format(updated)}</p>
                    </footer>
                </div>
            </div>
        )
    })}

  return (
    <Component />
  )
}

export default RecentComments

