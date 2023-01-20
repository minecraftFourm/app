import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useEditor, useEditorValue } from '../Components/Editor'
import { MAX_TITLE_LENGTH } from '../config';
import { useFetch } from '../Contexts/Fetch';
import ForumHeader from '../Components/ForumHeader'

const EditAnnouncement = () => {
    const Editor = useEditor();
    const EditorValue = useEditorValue();
    const CustomFetch = useFetch();
    const { id } = useParams();
    const [ announcementValue, setAnnouncementValue ] = useState();
    const [ title, setTitle ] = useState({
        value: '',
        count: 0
    });

    useEffect(() => {
        (async () => {
            const { data, response } = await CustomFetch({ url: `post/${id}`, returnResponse: true });
            console.log(data);
            setAnnouncementValue(data.data);
            updateTitle(data.data.title);
        })()

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(EditorValue())
        const { response, data} = await CustomFetch({url: `post/${id}`, options: {
            method: 'PATCH',
            body: JSON.stringify({
                title: title.value,
                content: EditorValue()
            })
        }, returnResponse: true})

        console.log(data, response)
    };
    
    const updateTitle = (value) => {
        const count = value.length

        if (count > MAX_TITLE_LENGTH) return

        setTitle(() => {
            return {
                value,
                count
            }
        })
    }
    
  return (
    <div className='pb-12 '>
        <ForumHeader />
        <div className='my-6 px-4'>
            <form onSubmit={handleSubmit}>
                <h2 className='font-bold'>{announcementValue ? announcementValue.title : null}</h2>
                <input type="text" name="title" id="" value={title && title.value} onChange={(e) => updateTitle(e.target.value)} />
                <Editor 
                    initialValue={announcementValue ? announcementValue.content : null}
                />
                <div className='w-full grid place-content-center mt-4'>
                    <button type="submit" className='bg-indigo-500 text-white px-3 py-1 rounded-sm'>Save Announcement</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default EditAnnouncement