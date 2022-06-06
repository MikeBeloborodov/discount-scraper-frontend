import React from 'react'
import Footer from './Footer'
import PromoCard from './PromoCard'
import sushi from '../sushi.png'
import pizza from '../pizza.png'
import shawarma from '../shawarma.png'
import burger from '../burger.png'
import kebab from '../kebab.png'
import dumplings from '../dumplings.png'
import pie from '../pie.png'
import combo from '../combo.png'


export default function MainPage(){
    const [columns, setColumns] = React.useState({
        "column_1" : [],
        "column_2" : [],
        "column_3" : [],
        "column_4" : []
    })

    const [cathegory, setCathegory] = React.useState("pizza")

    const [pagination, setPagination] = React.useState([])

    const [dropDownActive, setDropDownActive] = React.useState(false)

    const [maxPage, setMaxPage] = React.useState(0)

    const [pageSkip, setPageSkip] = React.useState(0)

    const [currentPage, setCurrentPage] = React.useState(1)

    const [websiteButtons, setWebsiteButtons] = React.useState([])

    const [websiteFilter, setWebsiteFilter] = React.useState('')

    const [priceFilter, setPriceFilter] = React.useState('price_up')

    const [priceFilterNormalName, setPriceFilterNormalName] = React.useState('По возрастанию')

    const [cathegoryNormalName, setCathegoryNormalName] = React.useState('Пицца')

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
            setPriceFilterNormalName("По возрастанию")
            setPriceFilter("price_up")
        }else{
            setPriceFilterNormalName("По убыванию")
            setPriceFilter("price_down")
        }
    }

    function handle_cathegory_change(e, new_cathegory){
        setCathegory(new_cathegory)
        setWebsiteFilter('')
        setPageSkip(0)
        setCurrentPage(1)
        switch (new_cathegory){
            case 'pizza':
                setCathegoryNormalName("Пицца")
                break;
            case 'sushi':
                setCathegoryNormalName("Роллы")
                break;
            case 'shawarma':
                setCathegoryNormalName("Шаурма")
                break;
            case 'burger':
                setCathegoryNormalName("Бургеры")
                break;
            case 'kebab':
                setCathegoryNormalName("Шашлык")
                break;
            case 'dumplings':
                setCathegoryNormalName("Хинкали")
                break;
            case 'pie':
                setCathegoryNormalName("Пироги")
                break;
            case 'combo':
                setCathegoryNormalName("Наборы")
                break;
        }
    }

    React.useEffect(() => {
        window.scrollTo(0, 0)
        // website buttons
        let website_button_elements
        fetch(URL + `website?cathegory=${cathegory}`)
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
        fetch(URL + `promo/count?cathegory=${cathegory}&website=${websiteFilter}`)
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
        
            fetch(URL + `promo/slice?limit=${length_of_columns * num_of_columns}&skip=${pageSkip}&cathegory=${cathegory}&website=${websiteFilter}&order_by=${priceFilter}`, {method: "GET"})
                .then(res => res.json())
                .then(data => {
                    for (let i = 0; i < num_of_columns; i++){
                        let elements = data.slice(i * length_of_columns, (i * length_of_columns) + length_of_columns).map(data => {
                            return (
                                <PromoCard key={data.item_id} data={data} />
                            )
                        })
                        setColumns(oldValues => {
                            return ({
                                ...oldValues,
                                [`column_${i + 1}`]: elements
                            })
                        })
                    }
                })
        }, [websiteFilter, pageSkip, priceFilter, cathegory])

    return(
        <>
            <section className='section mb-0 pb-0'>
                <div className='box'>
                    <div className='columns is-vcentered'>
                        <div className='column is-narrow'>
                            <a className='cathegory-choice' onClick={(e) => {handle_cathegory_change(e, 'pizza')}}>
                                <div className="icon-text">
                                    <span className="icon is-large has-text-info m-2">
                                        <img className='img' src={pizza} alt="pizza logo"/>
                                    </span>
                                </div>
                                <p className="content has-text-danger m-2">Пицца</p>
                            </a>
                        </div>
                        <div className='column is-narrow'>
                            <a className='cathegory-choice' onClick={(e) => {handle_cathegory_change(e, 'sushi')}}>
                                <div className="icon-text">
                                    <span className="icon is-large has-text-info m-2">
                                        <img className='img' src={sushi} alt='sushi logo'/>
                                    </span>
                                </div>
                                <p className="content has-text-danger m-2">Роллы</p>
                            </a>
                        </div>
                        <div className='column is-narrow'>
                            <a className='cathegory-choice' onClick={(e) => {handle_cathegory_change(e, 'shawarma')}}>
                                <div className="icon-text">
                                    <span className="icon is-large has-text-info m-2">
                                        <img className='img' src={shawarma} alt='shawarma logo' style={{marginLeft: "1rem"}}/>
                                    </span>
                                </div>
                                <p className="content has-text-danger m-2">Шаурма</p>
                            </a>
                        </div>
                        <div className='column is-narrow'>
                            <a className='cathegory-choice' onClick={(e) => {handle_cathegory_change(e, 'burger')}}>
                                <div className="icon-text">
                                    <span className="icon is-large has-text-info m-2">
                                        <img className='img' src={burger} alt='burger logo' style={{marginLeft: "1rem"}}/>
                                    </span>
                                </div>
                                <p className="content has-text-danger m-2">Бургеры</p>
                            </a>
                        </div>
                        <div className='column is-narrow'>
                            <a className='cathegory-choice' onClick={(e) => {handle_cathegory_change(e, 'kebab')}}>
                                <div className="icon-text">
                                    <span className="icon is-large has-text-info m-2">
                                        <img className='img' src={kebab} alt='kebab logo' style={{marginLeft: "1rem"}}/>
                                    </span>
                                </div>
                                <p className="content has-text-danger m-2">Шашлык</p>
                            </a>
                        </div>
                        <div className='column is-narrow'>
                            <a className='cathegory-choice' onClick={(e) => {handle_cathegory_change(e, 'dumplings')}}>
                                <div className="icon-text">
                                    <span className="icon is-large has-text-info m-2">
                                        <img className='img' src={dumplings} alt='dumplings logo' style={{marginLeft: "1rem"}}/>
                                    </span>
                                </div>
                                <p className="content has-text-danger m-2">Хинкали</p>
                            </a>
                        </div>
                        <div className='column is-narrow'>
                            <a className='cathegory-choice' onClick={(e) => {handle_cathegory_change(e, 'pie')}}>
                                <div className="icon-text">
                                    <span className="icon is-large has-text-info m-2">
                                        <img className='img' src={pie} alt='pie logo'/>
                                    </span>
                                </div>
                                <p className="content has-text-danger m-2">Пироги</p>
                            </a>
                        </div>
                        <div className='column is-narrow'>
                            <a className='cathegory-choice' onClick={(e) => {handle_cathegory_change(e, 'combo')}}>
                                <div className="icon-text">
                                    <span className="icon is-large has-text-info ml-4 mt-2 mb-2">
                                        <img className='img' src={combo} alt='combo logo'/>
                                    </span>
                                </div>
                                <p className="content has-text-danger m-2">Наборы</p>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className='section'>
                <p className="content has-text-danger m-2">{cathegoryNormalName} / {websiteFilter === "" ? 'Все сайты' : websiteFilter} / {priceFilterNormalName}</p>
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

            <Footer />
        </>
    )
}