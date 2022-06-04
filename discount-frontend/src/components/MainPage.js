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

    const [pagination, setPagination] = React.useState([])

    const [dropDownActive, setDropDownActive] = React.useState(false)

    const [maxPage, setMaxPage] = React.useState(0)

    const [pageSkip, setPageSkip] = React.useState(0)

    const [currentPage, setCurrentPage] = React.useState(1)

    const [websiteButtons, setWebsiteButtons] = React.useState([])

    const [websiteFilter, setWebsiteFilter] = React.useState('')

    const [priceFilter, setPriceFilter] = React.useState('price_up')

    const URL = process.env.REACT_APP_API_URL

    const num_of_columns = 4
    const length_of_columns = 2
    
    function handle_website_filter(title, event){
        setDropDownActive(false)
        setPageSkip(0)
        setCurrentPage(1)
        setWebsiteFilter(title)
    }

    function handle_pagination_filter(page_num, event){
        setCurrentPage(page_num)
        if (page_num === 1){
            setPageSkip(0)
            return
        }
        setPageSkip((page_num - 1) * (num_of_columns * length_of_columns))
    }

    function handle_next_page(e){
        if (currentPage === maxPage){
            return
        }
        setCurrentPage(oldValues => oldValues + 1)
        setPageSkip(pageSkip + (num_of_columns * length_of_columns))
    }

    function handle_previous_page(e){
        if (currentPage === 1){
            return
        }
        setCurrentPage(oldValues => oldValues - 1)
        setPageSkip(pageSkip - (num_of_columns * length_of_columns))
    }

    function handle_price_filter(filter, e){
        setDropDownActive(false)
        setCurrentPage(1)
        setPageSkip(0)
        if (filter === "up"){
            setPriceFilter("price_up")
        }else{
            setPriceFilter("price_down")
        }
    }

    React.useEffect(() => {
        window.scrollTo(0, 0)
        // website buttons
        let website_button_elements
        fetch(URL + 'website')
            .then(res => res.json())
            .then(data => {
                website_button_elements = data.map(data => {
                    return (
                        <button 
                        className='button is-danger is-outlined is-rounded m-2' 
                        key={data.item_id}
                        website_name={data.title}
                        onClick={(e) => handle_website_filter(data.title, e)}>
                            {data.title}
                        </button>
                    )
                })
                setWebsiteButtons(website_button_elements)
            })

        // pagination
        let pagination_elements = []
        fetch(URL + `promo/count?search=${websiteFilter}`)
            .then(res => res.json())
            .then(data => {
                const num_of_pages = Math.ceil(data / (num_of_columns * length_of_columns))
                setMaxPage(num_of_pages)
                for (let i = 1; i <= num_of_pages; i++){
                    pagination_elements.push(
                        <li key={"li" + i}>
                            <a 
                            className={currentPage === i ? "pagination-link m-2 is-current danger" : "pagination-link m-2"}
                            aria-label={`Goto page ${i}`}
                            onClick={(e) => handle_pagination_filter(i, e)}
                            >
                                {i}
                            </a>
                        </li>
                    )
                }
                setPagination(pagination_elements)
            })

        // cards
        for (let i = 0; i < num_of_columns; i++){
            fetch(URL + `promo/slice?limit=${length_of_columns}&skip=${(i * length_of_columns) + pageSkip}&website=${websiteFilter}&order_by=${priceFilter}`, {method: "GET"})
                .then(res => res.json())
                .then(data => {
                    let elements = data.map(data => {
                        return (
                            <div className='card' key={data.item_id}>
                                <div className="card-image">
                                    <figure className="image is-4by3">
                                        <img src={data.img} alt="Food item image" className='cover-img'/>
                                    </figure>
                                </div>
                                <div className='content has-text-centered'>
                                    <p className="title is-4 has-text-dark mt-2">{data.title}</p>
                                    <p className="content has-text-dark">Вес: {data.weight ? data.weight : "Не указан"}</p>
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
                    })
                    setColumns(oldValues => {
                        return ({
                            ...oldValues,
                            [`column_${i + 1}`]: elements
                        })
                    })
                })
            }
        }, [websiteFilter, pageSkip, priceFilter])

    return(
        <>
            <Navbar />

            <section className='section'>
                <div className={dropDownActive ? "dropdown is-active" : "dropdown"}>
                    <div className="dropdown-trigger">
                        <button className="button" 
                        aria-haspopup="true" 
                        aria-controls="dropdown-menu2"
                        onClick={(e) => {setDropDownActive(oldValue => !oldValue)}}
                        >
                        <span>{"Сортировать результаты"}&emsp;&emsp;&emsp;&emsp;</span>
                        <span className="icon is-small">
                            <i className="fas fa-angle-down" aria-hidden="true"></i>
                        </span>
                        </button>
                    </div>
                    <div className="dropdown-menu" id="dropdown-menu2" role="menu">
                        <div className='box'>
                            <p className='content'>По сайтам:</p>
                            <button 
                                className='button is-danger is-outlined is-rounded m-2' 
                                onClick={(e) => handle_website_filter('', e)}>
                                    Все сайты
                                </button>
                            {websiteButtons}
                            <div className='block mt-4'>
                                <p className='content'>По ценам:</p>
                                <button 
                                className='button is-danger is-outlined is-rounded m-2'
                                onClick={(e) => {handle_price_filter('up', e)}}
                                >
                                По возрастанию
                                </button>
                                <button 
                                className='button is-danger is-outlined is-rounded m-2'
                                onClick={(e) => {handle_price_filter('down', e)}}
                                >
                                По убыванию
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='section mt-0 mb-0 pt-0 pb-0'>
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

            <section className='section mt-0 pt-0'>
                <div className='box'>
                        <div className='block'>
                            <a 
                            className="pagination-previous"
                            onClick={(e) => {handle_previous_page(e)}}
                            >
                                Previous
                            </a>
                            <a 
                            className="pagination-next"
                            onClick={(e) => {handle_next_page(e)}}
                            >
                            Next page
                            </a>
                        </div>
                    <nav className="pagination is-rounded" role="navigation" aria-label="pagination">
                    </nav>
                        <ul className="pagination-list">
                            {pagination}
                        </ul>
                </div>
            </section>

            <Footer />
        </>
    )
}