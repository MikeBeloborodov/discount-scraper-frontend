import React from 'react'

export default function MainPage(){
    const [cards, setCards] = React.useState([])
    const URL = process.env.REACT_APP_API_URL

    let elements

    React.useEffect(() => {
        fetch(URL, {method: "GET"})
            .then(res => res.json())
            .then(data => {
                elements = data.map(data => {
                    return (
                        <div key={data.item_id} className='item-card'>
                            <a href={data.link}>
                                <img className='image' src={data.img} href={data.link} target="_blank"></img>
                            </a>
                            <h3 className='title-name'>{data.title}</h3>
                            <div className='item-prices'>
                                <p className='new-price'>{data.new_price}</p>
                                {data.old_price && <p className='old-price'>{data.old_price}</p>}
                            </div>
                            <p className='weight'>Вес: {data.weight ? data.weight : 'Не указан'}</p>
                            <div className='website-link-button'>
                                <a className='website-title' href={data.website_link} target="_blank">{data.website_title}</a>
                            </div>
                        </div>
                    )
                })
                setCards(elements)
            })
    }, [])

    return(
        <div className='cards'>
            {cards}
        </div>
    )
}