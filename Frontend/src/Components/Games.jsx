import React from 'react'

const Games = (props) => {
    const items = props.items 

    const Component = () => {
        return items.map(item => {
            const { id, title, picture, description, tags } = item
            return (
                <div className="w-[520px] h-fit min-h-[250px] flex flex-row text-gray-500 shadow-md" key={id}>
                    <img src={picture} alt="" className="max-w-[150px] object-cover object-left games-shadow" />
                        <div className="flex flex-col gap-4 w-full justify-between border px-4 py-2">
                            <div className="flex flex-col">
                                <header className="font-medium text-lg text-center text-gray-600">{title}</header>
                                <p className="text-sm text-center ">{description}</p>
                            </div>
                            <footer className="w-full flex flex-row justify-between items-center">
                                <div className="flex flex-col gap-0">
                                    <span className=" font-semibold text-base">Tags</span>
                                    <div className="flex flex-row gap-2 text-sm">
                                        {tags && tags.map(tag => {
                                            return (
                                                <p key={tag}>{tag}</p>
                                            )
                                        })}
                                    </div>
                                </div>
                                <p className="text-gray-500 font-semibold text-base">Stats</p>
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

export default Games