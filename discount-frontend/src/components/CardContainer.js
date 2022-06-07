import React from 'react'

export default function CardContainer({ cards }){
    return (
        <section className='section mt-0 mb-0 pt-0 pb-0'>
            <div className='block cards-container'>
                {cards}
            </div>
        </section>
    )
}