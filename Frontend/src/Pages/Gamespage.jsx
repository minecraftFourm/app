import React, { useEffect, useState } from "react";
import bg from "../assets/games page.png"
import Games from "../Components/Games";
import { useFetch } from "../Contexts/Fetch";

const Gamespage = () => {
  const [games, setGames] = useState([
    {
      id: 1,
      title: 'Something 1',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum voluptatum totam rem eos cupiditate tempora veniam, sit doloribus molestias omnis nemo molestiae libero nostrum consequuntur non tempore blanditiis? Non sequi laborum optio mollitia incidunt enim laboriosam nobis commodi ex hic? Error unde numquam sit nisi veniam, et doloremque architecto aliquam!',
      tags: ['one', 'two', 'three', 'four', 'five'],
      picture: 'https://s3-alpha-sig.figma.com/img/b9a0/0dc9/a0ad3b84f7cca6fed3abb6d5fc3ac7c6?Expires=1674432000&Signature=FU7AzKoHFbHDqFN4llCvypixufRmp1kvaLyYymFBo~Qm3XtycxdtlQrcYgZcj3Av6ShaBxvoL-q3hl8lbK9nZqcFgRlMb1XH3aarmU86Dk4DOuMuVNWfvxenAaa6jz7ZvEG5lIsf~Bq~q3ltdU3Eh7KR3M9yAeYQDPxW76fRXpB6YqClAgDvAZgQp1ZGEXPSUZzqP26dJ38PTgk7-hcrgx4G~0IqfU5Td7lrmXO29qs88y4XZI2BUqYHM1BilHmcnFgm-g4ho8MDhnND8flNW~zZpsM~zlqhelcJ~mgMDqEaZnDMZOpmKkeoWD0paKRJeA2TiuZ8ayCwMaq-rZtkoQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
    },
    {
      id: 2,
      title: 'Something 1',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum voluptatum totam rem eos cupiditate tempora veniam, sit doloribus molestias omnis nemo molestiae libero nostrum consequuntur non tempore blanditiis? Non sequi laborum optio mollitia incidunt enim laboriosam nobis commodi ex hic? Error unde numquam sit nisi veniam, et doloremque architecto aliquam!',
      tags: ['one', 'two', 'three', 'four', 'five'],
      picture: 'https://s3-alpha-sig.figma.com/img/b9a0/0dc9/a0ad3b84f7cca6fed3abb6d5fc3ac7c6?Expires=1674432000&Signature=FU7AzKoHFbHDqFN4llCvypixufRmp1kvaLyYymFBo~Qm3XtycxdtlQrcYgZcj3Av6ShaBxvoL-q3hl8lbK9nZqcFgRlMb1XH3aarmU86Dk4DOuMuVNWfvxenAaa6jz7ZvEG5lIsf~Bq~q3ltdU3Eh7KR3M9yAeYQDPxW76fRXpB6YqClAgDvAZgQp1ZGEXPSUZzqP26dJ38PTgk7-hcrgx4G~0IqfU5Td7lrmXO29qs88y4XZI2BUqYHM1BilHmcnFgm-g4ho8MDhnND8flNW~zZpsM~zlqhelcJ~mgMDqEaZnDMZOpmKkeoWD0paKRJeA2TiuZ8ayCwMaq-rZtkoQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
    },
    {
      id: 3,
      title: 'Something 1',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum voluptatum totam rem eos cupiditate tempora veniam, sit doloribus molestias omnis nemo',
      tags: ['one', 'two', 'three', 'four', 'five'],
      picture: 'https://s3-alpha-sig.figma.com/img/b9a0/0dc9/a0ad3b84f7cca6fed3abb6d5fc3ac7c6?Expires=1674432000&Signature=FU7AzKoHFbHDqFN4llCvypixufRmp1kvaLyYymFBo~Qm3XtycxdtlQrcYgZcj3Av6ShaBxvoL-q3hl8lbK9nZqcFgRlMb1XH3aarmU86Dk4DOuMuVNWfvxenAaa6jz7ZvEG5lIsf~Bq~q3ltdU3Eh7KR3M9yAeYQDPxW76fRXpB6YqClAgDvAZgQp1ZGEXPSUZzqP26dJ38PTgk7-hcrgx4G~0IqfU5Td7lrmXO29qs88y4XZI2BUqYHM1BilHmcnFgm-g4ho8MDhnND8flNW~zZpsM~zlqhelcJ~mgMDqEaZnDMZOpmKkeoWD0paKRJeA2TiuZ8ayCwMaq-rZtkoQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
    }
  ]);
  const CustomFetch = useFetch()
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

  // useEffect(() => {
  //   (async () => {
  //     const { data, response } = await CustomFetch({ url: 'games', returnResponse: true })
  //     setGames(data.data)
  //   })()
  // }, [])

  return (
  <div>
    <section className="w-full h-[700px] mb-4 relative">
      <img src={bg} alt="" className="w-full h-full object-cover object-center" />
      <Content 
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum voluptatum totam rem eos cupiditate tempora veniam, sit doloribus molestias omnis nemo molestiae libero nostrum consequuntur non tempore blanditiis? Non sequi laborum optio mollitia incidunt enim laboriosam nobis commodi ex hic? Error unde numquam sit nisi veniam, et doloremque architecto aliquam!"
        />
    </section>

    <section className="w-full h-full pb-32 px-4">
      <h3 className="font-bold text-3xl text-center">Game List</h3>

      <section className="flex flex-row flex-wrap justify-center gap-24 mt-16">
        
        <Games 
          items={games}
        />
      </section>
    </section>
  </div>);
};

export default Gamespage;
