import React from 'react'
import { useState } from "react";

const NewPost = () => {
    //create state for the form
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [post, setPost] = useState("");

    //handle form submittion
    const handleSubmit = (e) => {
        e.preventDefault();
        //just an alert
        alert("Post Created!");
        //redirect to index page upon submission
        window.location.href = '/';
    }

    const postIsValid = () => {
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
        <br />
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} className="mb-3 " placeholder='Title...' size="200" style={{maxWidth: "100%"}} onChange={(e) => 
                setTitle(e.target.value)} />
                <br />
                <select value={category} className="mb-3 border-solid border-2" cols={300} onChange={(e) => setCategory(e.target.value)}>
                    <option value="category" disabled selected>Select Category</option>
                    <option value="option1">Option 1</option>
                </select>
            <br />
            <div style={{display: "block"}}>
            <textarea className='border-solid border-2' rows={12} cols={300} style={{maxWidth: "100%"}} value={post} placeholder="type your post here!" onChange={(e) => 
                setPost(e.target.value)} />
            </div>
            <br />
                <div className='flex justify-center pb-3'>
                    <button className="hover:bg-indigo-700 bg-indigo-500 text-white py-1 px-6 border border-indigo-600 transition-colors duration-300 rounded" type="submit" disabled={!postIsValid()}>
                        Create Post</button>
                </div>
        </form>

    </div>
  )
}

export default NewPost