import React from 'react'

export default function Pagination({
    handle_previous_page,
    handle_next_page,
    pagination
}){
    return (
        <section className='section mt-6 pt-0'>
            <div className='box'>
                    <div className='block'>
                        <button 
                        className="pagination-previous"
                        onClick={(e) => {handle_previous_page(e)}}
                        >
                        Назад
                        </button>
                        <button 
                        className="pagination-next"
                        onClick={(e) => {handle_next_page(e)}}
                        >
                        Следующая
                        </button>
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