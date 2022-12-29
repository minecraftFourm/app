import DOMPurify from 'dompurify'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ForumHeader from '../Components/ForumHeader'
import { useFetch } from '../Contexts/Fetch'
import { format } from 'timeago.js'

const ViewAnnouncement = () => {
    const { id } = useParams()
    const CustomFetch = useFetch()
    const [ announcementInfo, setAnnouncementInfo ] = useState({})

    useEffect(() => {
        (async () => {
            const { data, response } = await CustomFetch({url: `announcement/${id}`, options: {
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
                    updated: data.data.updated
                }
            })

        })()

    }, [])

    console.log(announcementInfo)
    
  return (
    <div className='bg-[#1B263B]'>
        <ForumHeader />
        <div className='pt-16 px-16 py-4'>
            <div className=''>
                <header className='w-full h-fit flex items-center justify-between px-2 bg-white'>
                    <section className='flex flex-col'>
                        <h2 className='font-medium text-2xl capitalize'>{announcementInfo.title && announcementInfo.title}</h2>
                        <p>{announcementInfo.owner.username}</p>
                    </section>
                    <p className='font-light text-sm'>{announcementInfo.updated && format(announcementInfo.updated)}</p>
                </header>
                {announcementInfo.content && <div className='border px-2 bg-white my-2' dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(announcementInfo.content)}}></div>}
                <footer className='bg-white'>
                    Reactions
                </footer>
            </div>
        </div>
    </div>
  )
}

export default ViewAnnouncement