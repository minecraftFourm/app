import React, { useEffect, useState } from 'react'
import { useFetch } from '../../Contexts/Fetch'
import DOMPurify from 'dompurify'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'

const Announcements = () => {
    const CustomFetch = useFetch();
    const [ announcements, setAnnouncements ] = useState({
        count: 0,
        data: []
    })

    useEffect(() => {
        (async () => {
            const { data, response } = await CustomFetch({url: 'announcement', returnResponse: true})
            setAnnouncements(() => {
                return {
                    count: data.count,
                    data: data.data
                }
            })
        })()
    }, []);

    const handleDelete = async (id) => {
        const { data, response } = await CustomFetch({url: `announcement/${id}`, options: {
            method: 'DELETE'
        }, returnResponse: true })
        console.log(data, response)
    }

    const announcementComponent = announcements.data.map(item => {
        return (
            <div key={item.id} className='border border-indigo-500 m-1 rounded-md px-2 py-1 w-full'>
                <header className='flex w-full justify-between'>
                    <Link to={`../../forum/announcement/${item.id}`} className='text-lg font-medium cursor-pointer'>{item.title}</Link>
                    <div className='flex gap-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 cursor-pointer" onClick={() => handleDelete(item.id)}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </div>
                </header>
                {/* <div className="content line-clamp-1" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(item.content)}}></div> */}
                <footer className='flex w-full justify-between items-center'>
                    <p className='font-normal text-sm text-gray-500 cursor-default'>Posted by <span className='cursor-pointer'>{item.owner.username}</span></p>
                    <div className='flex gap-2 items-center'>
                        <p className='font-light text-sm text-gray-500 cursor-default'>{format(item.updated)}</p>
                        <p>|</p>
                        <p className='font-light text-sm text-gray-500 cursor-default'>{item.comments.length} Comments</p>
                    </div>
                </footer>
            </div>
        )
    })

    return (
        <div className='h-full '>
            <header className='mb-2 py-2 px-4 bg-white drop-shadow-md'>
                <div className='w-full items-center gap-2 justify-between flex'>
                    <input type="text" placeholder='Search...' className='rounded-md px-2 py-1 border-indigo-500 w-full outline-none' />
                    <Link to='../newAnnouncement' className='' title='Add new announcement'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-violet-700">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </Link>
                </div>
                <p className='text-sm'>Showing {announcements.count} announcements.</p>
            </header>

            <div className='px-4 py-2 w-full flex flex-col gap-2'>
                {announcements.data && announcementComponent}
                
            </div>

            
        </div>
    )
}

export default Announcements