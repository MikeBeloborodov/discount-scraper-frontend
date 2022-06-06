import React from 'react'

export default function Pagination({
    handle_previous_page,
    handle_next_page,
    pagination
}){
    return (
        <section className='section mt-0 pt-0'>
            <div className='box'>
                    <div className='block'>
                        <a 
                        className="pagination-previous"
                        onClick={(e) => {handle_previous_page(e)}}
                        >
                        Назад
                        </a>
                        <a 
                        className="pagination-next"
                        onClick={(e) => {handle_next_page(e)}}
                        >
                        Следующая
                        </a>
                    </div>
                <nav className="pagination is-rounded" role="navigation" aria-label="pagination">
                </nav>
                    <ul className="pagination-list">
                        {pagination}
                    </ul>
            </div>
        </section>
    )
}