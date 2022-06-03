import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

export default function MainPage(){
    const [columns, setColumns] = React.useState({
        "column_1" : [],
        "column_2" : [],
        "column_3" : [],
        "column_4" : []
    })
    const URL = process.env.REACT_APP_API_URL

    let num_of_columns = 4
    let length_of_columns = 2
    
    React.useEffect(() => {
        for (let i = 0; i < num_of_columns; i++){
            let elements
            fetch(URL + `/slice?limit=${length_of_columns}&skip=${i * length_of_columns}`, {method: "GET"})
                .then(res => res.json())
                .then(data => {
                    elements = data.map(data => {
                        return (
                            <div className='card' key={data.item_id}>
                                <div className="card-image">
                                    <figure className="image is-4by3">
                                        <img src={data.img} alt="Food item image"/>
                                    </figure>
                                </div>
                                <div className='content has-text-centered'>
                                    <p className="title is-4 has-text-dark">{data.title}</p>
                                    <p className="content has-text-dark">Вес: {data.weight ? data.weight : "Не указан"}</p>
                                    {data.old_price ? 
                                        <div className='columns is-mobile'>
                                            <div className='column'>
                                                <p className="content has-text-danger">{data.new_price}</p>
                                            </div>
                                            <div className='column'>
                                                <p className="content has-text-dark old-price">{data.old_price}</p>
                                            </div>
                                        </div> :
                                        <p className="content has-text-danger">{data.new_price}</p>
                                    }
                                    <a href={data.link} target='_blank'>
                                        <button className='button is-danger is-outlined is-rounded'>{data.website_title}</button>
                                    </a>
                                </div>
                            </div>
                        )
                    })
                    setColumns(oldValues => {
                        return ({
                            ...oldValues,
                            [`column_${i + 1}`]: elements
                        })
                    })
                })
            }
        }, [])

    return(
        <>
            <Navbar />
            <section className='section'>
                <div className='box'>
                    I am a box
                </div>
            </section>
            <section className='section'>
                <div className='columns'>
                    <div className='column'>
                        {columns.column_1}
                    </div>
                    <div className='column'>
                        {columns.column_2}
                    </div>
                    <div className='column'>
                        {columns.column_3}
                    </div>
                    <div className='column'>
                        {columns.column_4}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}