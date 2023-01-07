import DOMPurify from 'dompurify'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ForumHeader from '../Components/ForumHeader'
import { useFetch } from '../Contexts/Fetch'
import { format } from 'timeago.js'

const ViewAnnouncement = () => {
    const { id } = useParams()
    const CustomFetch = useFetch()
    const [ announcementInfo, setAnnouncementInfo ] = useState({
        owner: 'test',
        title: 'test',
        content: 'test',
        updated: new Date()
    })

    useEffect(() => {
        (async () => {
            const { data, response } = await CustomFetch({url: `post/${id}`, options: {
                method: 'GET'
            }, returnResponse: true})

            // TODO: if it can't find the announcement
            if(!response.ok) {
                console.error(`Error getting announcement with id: ${id}`)
            }

            setAnnouncementInfo(() => {
                return {
                    owner: data.data.owner,
                    title: data.data.title,
                    content: data.data.content,
                    updated: data.data.updated,
                    id: data.data.id
                }
            })

        })()

    }, [])

  return (
    <div className='bg-[#1B263B]'>
        <ForumHeader />
        <div className='pt-16 px-16 py-4'>
            <div className=''>
                <header className='w-full h-fit flex items-center justify-between px-2 bg-white'>
                    <section className='flex flex-col'>
                        <h2 className='font-medium text-2xl capitalize'>{announcementInfo.title}</h2>
                        {announcementInfo.owner && <p>{announcementInfo.owner.username}</p>}
                    </section>
                    <p className='font-light text-sm'>{format(announcementInfo.updated)}</p>
                </header>
                    <Link to={`../forum/edit/${announcementInfo.id}`} className='text-white px-2 bg-indigo-400'>Edit</Link>
                <div className='border px-2 bg-white my-2' dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(announcementInfo.content)}}></div>
                <footer className='bg-white'>
                    Reactions
                </footer>
            </div>
        </div>
    </div>
  )
}

export default ViewAnnouncement