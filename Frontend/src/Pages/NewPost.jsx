import React, { useEffect, useState} from 'react'
import { useFetch } from '../Contexts/Fetch';
import { useEditor, useEditorValue } from '../Components/Editor';
import { Link, useLocation } from 'react-router-dom';

const NewPost = () => {
    //create state for the form
    const [title, setTitle] = useState("");
    const [categoryData, setCategoryData] = useState(null);
    const [category, setCategory] = useState("");
    const [post, setPost] = useState("");
    const CustomFetch = useFetch();
    const Editor = useEditor();
    const EditorValue = useEditorValue();
    const { state } = useLocation();

    useEffect(() => {
        (async () => {
            try {
                const { data, response } = await CustomFetch({ url: "category", returnResponse: true });
                setCategoryData(data.data)
                // TODO: Better error handling
            } catch (error) {  
                console.log(error);
            }
        })()

        if (state) {
            const { category } = state
            // TODO: automatically select this category if it exists.
            console.log(category)
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        //just an alert
        alert("Post Created!");
        //redirect to index page upon submission
        window.location.href = '/';
    }

    const postIsValid = () => {
        // TODO: pop up alert when the note is created.
        // Implement this function
        return (
            title && post 
            &&
            category !== 'category'
        );
      };

  return (
    <div className='m-6'>
        <div className='font-bold text-indigo-700 text-4xl mb-2'>
            Create new post
        </div>
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} className="mb-3 px-2 py-1 outline-none border border-gray-400 rounded-sm w-full" placeholder='Title...' size="200" onChange={(e) => 
                setTitle(e.target.value)} />
                <br />
                <select value={category} className="mb-3 border-solid border-2" cols={300} defaultValue={'category'} onChange={(e) => setCategory(e.target.value)}>
                    <option value="category" disabled selected>Select Category</option>
                    { 
                        categoryData && 
                        categoryData.map(item => {
                            return <option key={item.id} value={item.id}>{item.name}</option>
                        })
                    }
                </select>
            <Editor />
            <div className='flex justify-center pb-3 mt-4'>
                <button className="hover:bg-indigo-700 cursor-pointer bg-indigo-500 text-white py-1 px-6 border border-indigo-600 transition-colors duration-300 rounded" type="submit" disabled={!postIsValid()}>
                    Create Post</button>
            </div>
        </form>

    </div>
  )
}

export default NewPost