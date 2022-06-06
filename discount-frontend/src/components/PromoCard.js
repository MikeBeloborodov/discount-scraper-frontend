import React from 'react'

export default function PromoCard({ data }){
    return(
        <div className='card'>
            <div className="card-image">
                <figure className="image is-4by3">
                    <img src={data.img} alt="Food item image" className='cover-img'/>
                </figure>
            </div>
            <div className='content has-text-centered'>
                <p className="title is-4 has-text-dark mt-2 pl-5 pr-5">{data.title}</p>
                {data.weight ? <p className="content has-text-dark">Вес: {data.weight}</p> : <></>}
                {data.ingredients ? <p className="content has-text-dark pr-3 pl-3">{data.ingredients}</p> : <></>}
                {data.old_price ? 
                    <div className='columns is-mobile'>
                        <div className='column'>
                            <p className="content has-text-danger">{data.new_price} руб</p>
                        </div>
                        <div className='column'>
                            <p className="content has-text-dark old-price">{data.old_price} руб</p>
                        </div>
                    </div> :
                    <div className='columns is-mobile'>
                        <div className='column'>
                            <p className="content has-text-danger">{data.new_price} руб</p>
                        </div>
                    </div>
                }
                <a href={data.link} target='_blank'>
                    <button className='button is-danger is-outlined is-rounded'>{data.website_title}</button>
                </a>
            </div>
        </div>
    )
}