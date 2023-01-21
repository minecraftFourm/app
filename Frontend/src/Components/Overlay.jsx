import React from 'react'

const Overlay = (props) => {
    const { description, title = "ServerName" } = props

    return (
    <div className={`absolute top-0 z-0 bottom-0 left-0 right-0 grid place-items-center text-white bg-[#00000080] duration-1000`}>
        <div className="text-center">
            <h1 className={`font-extrabold text-6xl duration-700 opacity-100 z-10`}>{title}</h1>
            <p className="max-w-3xl pt-3">{description && description}</p>
        </div>
    </div>
    )
}

export default Overlay