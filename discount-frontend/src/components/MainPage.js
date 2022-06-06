import React from 'react'
import Footer from './Footer'
import PromoCard from './PromoCard'
import Cathegories from './Cathegories'
import SortResults from './SortResults'
import Pagination from './Pagination'



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
            default:
                setCathegoryNormalName("Пицца")
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
                            <button 
                            className={currentPage === i ? "pagination-link m-2 is-current danger" : "pagination-link m-2"}
                            aria-label={`Goto page ${i}`}
                            onClick={(e) => handle_pagination_filter(i, e)}
                            >
                                {i}
                            </button>
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
    }, [websiteFilter, pageSkip, priceFilter, cathegory, currentPage, URL])

    return(
        <>
            <Cathegories handle_cathegory_change={handle_cathegory_change} />

            <SortResults 
                cathegoryNormalName={cathegoryNormalName}
                dropDownActive={dropDownActive}
                setDropDownActive={setDropDownActive}
                websiteFilter={websiteFilter}
                priceFilterNormalName={priceFilterNormalName}
                handle_website_filter={handle_website_filter}
                handle_price_filter={handle_price_filter}
                websiteButtons={websiteButtons}
            />

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

            <Pagination 
                handle_previous_page={handle_previous_page}
                handle_next_page={handle_next_page}
                pagination={pagination}
            />

            <Footer />
        </>
    )
}