import React from "react";

const Gamespage = () => {

  const Content = (props) => {
    const { description } = props
		return (
		<div className={`absolute top-0 z-0 bottom-0 left-0 right-0 grid place-items-center text-white bg-[#00000080] duration-1000`}>
      <div className="text-center">
        <h1 className={`font-extrabold text-6xl duration-700 opacity-100 z-10`}>ServerName</h1>
        <p className="max-w-3xl pt-3">{description}</p>
      </div>
		</div>
		)
	}

  return (
  <div>
    <section className="w-full h-[700px] mb-4 relative">
      <img src="https://s3-alpha-sig.figma.com/img/1911/8ee4/e64e9efb8bf1469c0293be75657ae183?Expires=1673222400&Signature=e0TP-TAilw5i9EaiKu0zAj7GkbvAWLQh8Q3pve8hwBkc5GNBc-qbfyZmvCcsaArEOyKNaNHRIyWGClTHnINsuAI8ov36SXz91Kl5HA9M0N9Z5liTYmjSNWT4SOzDdDmUW5F1zCzr~sR41vZhRZDFKCRNTHMEXOvia3opITqxCJtvGxJ6zlA5r-IR3hHOZEdPirAIIAWbXjOjtKWsglH7wMnZGEb3wog0jCm2N9PFeLLgUriHgITmsnUNmT8HE9btG4Po2~TpcQQtQ7q-DnZo9a-PhRSy4AnvH8ecCNO9Uld-01X-2S4u2G9wj5zQn7~6uAJC0qZ6r9SOWqSYx1iIYg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="" className="w-full h-full object-cover object-center" />
      <Content 
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum voluptatum totam rem eos cupiditate tempora veniam, sit doloribus molestias omnis nemo molestiae libero nostrum consequuntur non tempore blanditiis? Non sequi laborum optio mollitia incidunt enim laboriosam nobis commodi ex hic? Error unde numquam sit nisi veniam, et doloremque architecto aliquam!"
        />
    </section>

    <section className="w-full h-full pb-32 px-4">
      <h3 className="font-bold text-3xl text-center">Game List</h3>

      <section className="flex flex-row flex-wrap justify-center gap-24 mt-16">
        <div className="w-[520px] h-[250px] flex flex-row text-gray-500 shadow-md">
          <img src="https://s3-alpha-sig.figma.com/img/b9a0/0dc9/a0ad3b84f7cca6fed3abb6d5fc3ac7c6?Expires=1673222400&Signature=UUhOdbCiYOdBisaCeWMQ4rLCvF5LSvJNH5oG-G0qdcX4VML6JSnthWEnQ8tUDH5UQvDKdkZzVsYaQqBx6jUlgloC5KWfHYczbxuQNlrkdLuRRQCpFWvlr14qLcdehTCIvNbhvP465ILRPsjXSZwtJKB4MSLjyElTAWgXT8pkMiMOal0yizoXN0DOT2FC774yEfNlTlcr6Fenc3GFLtYuThWUkXGt8oRMOclRGq~t0UvYkO7XAthdSW5Fu1Fn2pjlxQr-ANFIE-e8A3EOeuF3f7Bz8hwME5nJN2tCctOKUPBsZzw9icFdD9~le3YFA-x6w~ANsSRKdM5IXsneSpRZuw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="" className="max-w-[150px] object-cover object-left games-shadow" />
          <div className="border px-4 py-2 flex flex-col h-full">
            <div className="relative h-full w-full">
              <div className="flex flex-col gap-3">
                <header className="font-medium text-lg text-center text-gray-600">Gamemode Name</header>
                <p className="text-sm text-center ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, molestias tenetur nisi repellat velit cupiditate ut corporis sed commodi, modi facere, voluptates quaerat eos eius ad rerum aut dolorem debitis!</p>
              </div>
              <footer className="w-full flex flex-row justify-between items-center absolute bottom-0">
                <div className="flex flex-col gap-0">
                  <span className=" font-semibold text-base">Tags</span>
                  <div className="flex flex-row gap-2 text-sm">
                    <p>Pvp</p>
                    <p>|</p>
                    <p>Building</p>
                    <p>|</p>
                    <p>Skill</p>
                  </div>
                </div>
                <p className="text-gray-500 font-semibold text-base">Stats</p>
              </footer>
            </div>
          </div>
        </div>
        <div className="w-[520px] h-[250px] flex flex-row text-gray-500 shadow-md">
          <img src="https://s3-alpha-sig.figma.com/img/b9a0/0dc9/a0ad3b84f7cca6fed3abb6d5fc3ac7c6?Expires=1673222400&Signature=UUhOdbCiYOdBisaCeWMQ4rLCvF5LSvJNH5oG-G0qdcX4VML6JSnthWEnQ8tUDH5UQvDKdkZzVsYaQqBx6jUlgloC5KWfHYczbxuQNlrkdLuRRQCpFWvlr14qLcdehTCIvNbhvP465ILRPsjXSZwtJKB4MSLjyElTAWgXT8pkMiMOal0yizoXN0DOT2FC774yEfNlTlcr6Fenc3GFLtYuThWUkXGt8oRMOclRGq~t0UvYkO7XAthdSW5Fu1Fn2pjlxQr-ANFIE-e8A3EOeuF3f7Bz8hwME5nJN2tCctOKUPBsZzw9icFdD9~le3YFA-x6w~ANsSRKdM5IXsneSpRZuw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="" className="max-w-[150px] object-cover object-left games-shadow" />
          <div className="border px-4 py-2 flex flex-col h-full">
            <div className="relative h-full w-full">
              <div className="flex flex-col gap-3">
                <header className="font-medium text-lg text-center text-gray-600">Gamemode Name</header>
                <p className="text-sm text-center ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, molestias tenetur nisi repellat velit cupiditate ut corporis sed commodi, modi facere, voluptates quaerat eos eius ad rerum aut dolorem debitis!</p>
              </div>
              <footer className="w-full flex flex-row justify-between items-center absolute bottom-0">
                <div className="flex flex-col gap-0">
                  <span className=" font-semibold text-base">Tags</span>
                  <div className="flex flex-row gap-2 text-sm">
                    <p>Pvp</p>
                    <p>|</p>
                    <p>Building</p>
                    <p>|</p>
                    <p>Skill</p>
                  </div>
                </div>
                <p className="text-gray-500 font-semibold text-base">Stats</p>
              </footer>
            </div>
          </div>
        </div>
        <div className="w-[520px] h-[250px] flex flex-row text-gray-500 shadow-md">
          <img src="https://s3-alpha-sig.figma.com/img/b9a0/0dc9/a0ad3b84f7cca6fed3abb6d5fc3ac7c6?Expires=1673222400&Signature=UUhOdbCiYOdBisaCeWMQ4rLCvF5LSvJNH5oG-G0qdcX4VML6JSnthWEnQ8tUDH5UQvDKdkZzVsYaQqBx6jUlgloC5KWfHYczbxuQNlrkdLuRRQCpFWvlr14qLcdehTCIvNbhvP465ILRPsjXSZwtJKB4MSLjyElTAWgXT8pkMiMOal0yizoXN0DOT2FC774yEfNlTlcr6Fenc3GFLtYuThWUkXGt8oRMOclRGq~t0UvYkO7XAthdSW5Fu1Fn2pjlxQr-ANFIE-e8A3EOeuF3f7Bz8hwME5nJN2tCctOKUPBsZzw9icFdD9~le3YFA-x6w~ANsSRKdM5IXsneSpRZuw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="" className="max-w-[150px] object-cover object-left games-shadow" />
          <div className="border px-4 py-2 flex flex-col h-full">
            <div className="relative h-full w-full">
              <div className="flex flex-col gap-3">
                <header className="font-medium text-lg text-center text-gray-600">Gamemode Name</header>
                <p className="text-sm text-center ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, molestias tenetur nisi repellat velit cupiditate ut corporis sed commodi, modi facere, voluptates quaerat eos eius ad rerum aut dolorem debitis!</p>
              </div>
              <footer className="w-full flex flex-row justify-between items-center absolute bottom-0">
                <div className="flex flex-col gap-0">
                  <span className=" font-semibold text-base">Tags</span>
                  <div className="flex flex-row gap-2 text-sm">
                    <p>Pvp</p>
                    <p>|</p>
                    <p>Building</p>
                    <p>|</p>
                    <p>Skill</p>
                  </div>
                </div>
                <p className="text-gray-500 font-semibold text-base">Stats</p>
              </footer>
            </div>
          </div>
        </div>
        <div className="w-[520px] h-[250px] flex flex-row text-gray-500 shadow-md">
          <img src="https://s3-alpha-sig.figma.com/img/b9a0/0dc9/a0ad3b84f7cca6fed3abb6d5fc3ac7c6?Expires=1673222400&Signature=UUhOdbCiYOdBisaCeWMQ4rLCvF5LSvJNH5oG-G0qdcX4VML6JSnthWEnQ8tUDH5UQvDKdkZzVsYaQqBx6jUlgloC5KWfHYczbxuQNlrkdLuRRQCpFWvlr14qLcdehTCIvNbhvP465ILRPsjXSZwtJKB4MSLjyElTAWgXT8pkMiMOal0yizoXN0DOT2FC774yEfNlTlcr6Fenc3GFLtYuThWUkXGt8oRMOclRGq~t0UvYkO7XAthdSW5Fu1Fn2pjlxQr-ANFIE-e8A3EOeuF3f7Bz8hwME5nJN2tCctOKUPBsZzw9icFdD9~le3YFA-x6w~ANsSRKdM5IXsneSpRZuw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="" className="max-w-[150px] object-cover object-left games-shadow" />
          <div className="border px-4 py-2 flex flex-col h-full">
            <div className="relative h-full w-full">
              <div className="flex flex-col gap-3">
                <header className="font-medium text-lg text-center text-gray-600">Gamemode Name</header>
                <p className="text-sm text-center ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, molestias tenetur nisi repellat velit cupiditate ut corporis sed commodi, modi facere, voluptates quaerat eos eius ad rerum aut dolorem debitis!</p>
              </div>
              <footer className="w-full flex flex-row justify-between items-center absolute bottom-0">
                <div className="flex flex-col gap-0">
                  <span className=" font-semibold text-base">Tags</span>
                  <div className="flex flex-row gap-2 text-sm">
                    <p>Pvp</p>
                    <p>|</p>
                    <p>Building</p>
                    <p>|</p>
                    <p>Skill</p>
                  </div>
                </div>
                <p className="text-gray-500 font-semibold text-base">Stats</p>
              </footer>
            </div>
          </div>
        </div>
        <div className="w-[520px] h-[250px] flex flex-row text-gray-500 shadow-md">
          <img src="https://s3-alpha-sig.figma.com/img/b9a0/0dc9/a0ad3b84f7cca6fed3abb6d5fc3ac7c6?Expires=1673222400&Signature=UUhOdbCiYOdBisaCeWMQ4rLCvF5LSvJNH5oG-G0qdcX4VML6JSnthWEnQ8tUDH5UQvDKdkZzVsYaQqBx6jUlgloC5KWfHYczbxuQNlrkdLuRRQCpFWvlr14qLcdehTCIvNbhvP465ILRPsjXSZwtJKB4MSLjyElTAWgXT8pkMiMOal0yizoXN0DOT2FC774yEfNlTlcr6Fenc3GFLtYuThWUkXGt8oRMOclRGq~t0UvYkO7XAthdSW5Fu1Fn2pjlxQr-ANFIE-e8A3EOeuF3f7Bz8hwME5nJN2tCctOKUPBsZzw9icFdD9~le3YFA-x6w~ANsSRKdM5IXsneSpRZuw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="" className="max-w-[150px] object-cover object-left games-shadow" />
          <div className="border px-4 py-2 flex flex-col h-full">
            <div className="relative h-full w-full">
              <div className="flex flex-col gap-3">
                <header className="font-medium text-lg text-center text-gray-600">Gamemode Name</header>
                <p className="text-sm text-center ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, molestias tenetur nisi repellat velit cupiditate ut corporis sed commodi, modi facere, voluptates quaerat eos eius ad rerum aut dolorem debitis!</p>
              </div>
              <footer className="w-full flex flex-row justify-between items-center absolute bottom-0">
                <div className="flex flex-col gap-0">
                  <span className=" font-semibold text-base">Tags</span>
                  <div className="flex flex-row gap-2 text-sm">
                    <p>Pvp</p>
                    <p>|</p>
                    <p>Building</p>
                    <p>|</p>
                    <p>Skill</p>
                  </div>
                </div>
                <p className="text-gray-500 font-semibold text-base">Stats</p>
              </footer>
            </div>
          </div>
        </div>
        <div className="w-[520px] h-[250px] flex flex-row text-gray-500 shadow-md">
          <img src="https://s3-alpha-sig.figma.com/img/b9a0/0dc9/a0ad3b84f7cca6fed3abb6d5fc3ac7c6?Expires=1673222400&Signature=UUhOdbCiYOdBisaCeWMQ4rLCvF5LSvJNH5oG-G0qdcX4VML6JSnthWEnQ8tUDH5UQvDKdkZzVsYaQqBx6jUlgloC5KWfHYczbxuQNlrkdLuRRQCpFWvlr14qLcdehTCIvNbhvP465ILRPsjXSZwtJKB4MSLjyElTAWgXT8pkMiMOal0yizoXN0DOT2FC774yEfNlTlcr6Fenc3GFLtYuThWUkXGt8oRMOclRGq~t0UvYkO7XAthdSW5Fu1Fn2pjlxQr-ANFIE-e8A3EOeuF3f7Bz8hwME5nJN2tCctOKUPBsZzw9icFdD9~le3YFA-x6w~ANsSRKdM5IXsneSpRZuw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="" className="max-w-[150px] object-cover object-left games-shadow" />
          <div className="border px-4 py-2 flex flex-col h-full">
            <div className="relative h-full w-full">
              <div className="flex flex-col gap-3">
                <header className="font-medium text-lg text-center text-gray-600">Gamemode Name</header>
                <p className="text-sm text-center ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, molestias tenetur nisi repellat velit cupiditate ut corporis sed commodi, modi facere, voluptates quaerat eos eius ad rerum aut dolorem debitis!</p>
              </div>
              <footer className="w-full flex flex-row justify-between items-center absolute bottom-0">
                <div className="flex flex-col gap-0">
                  <span className=" font-semibold text-base">Tags</span>
                  <div className="flex flex-row gap-2 text-sm">
                    <p>Pvp</p>
                    <p>|</p>
                    <p>Building</p>
                    <p>|</p>
                    <p>Skill</p>
                  </div>
                </div>
                <p className="text-gray-500 font-semibold text-base">Stats</p>
              </footer>
            </div>
          </div>
        </div>
      </section>
    </section>
  </div>);
};

export default Gamespage;
