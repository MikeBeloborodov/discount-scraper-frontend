import React from 'react'
import Footer from './Footer'
import PromoCard from './PromoCard'
import Categories from './Categories'
import SortResults from './SortResults'
import Pagination from './Pagination'
import CardContainer from './CardContainer'



export default function MainPage(){

    const [cards, setCards] = React.useState([])

    const [category, setcategory] = React.useState("pizza")

    const [pagination, setPagination] = React.useState([])

    const [dropDownActive, setDropDownActive] = React.useState(false)

    const [maxPage, setMaxPage] = React.useState(0)

    const [pageSkip, setPageSkip] = React.useState(0)

    const [currentPage, setCurrentPage] = React.useState(1)

    const [websiteButtons, setWebsiteButtons] = React.useState([])

    const [websiteFilter, setWebsiteFilter] = React.useState('')

    const [priceFilter, setPriceFilter] = React.useState('price_up')

    const [priceFilterNormalName, setPriceFilterNormalName] = React.useState('По возрастанию')

    const [categoryNormalName, setcategoryNormalName] = React.useState('Пицца')

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

    function handle_category_change(e, new_category){
        setcategory(new_category)
        setWebsiteFilter('')
        setPageSkip(0)
        setCurrentPage(1)
        switch (new_category){
            case 'pizza':
                setcategoryNormalName("Пицца")
                break;
            case 'sushi':
                setcategoryNormalName("Роллы")
                break;
            case 'shawarma':
                setcategoryNormalName("Шаурма")
                break;
            case 'burger':
                setcategoryNormalName("Бургеры")
                break;
            case 'kebab':
                setcategoryNormalName("Шашлык")
                break;
            case 'dumplings':
                setcategoryNormalName("Хинкали")
                break;
            case 'pie':
                setcategoryNormalName("Пироги")
                break;
            case 'combo':
                setcategoryNormalName("Наборы")
                break;
            default:
                setcategoryNormalName("Пицца")
                break;
        }
    }

    React.useEffect(() => {
        window.scrollTo(0, 0)
        // website buttons
        let website_button_elements
        fetch(URL + `website?category=${category}`)
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
        fetch(URL + `promo/count?category=${category}&website=${websiteFilter}`)
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
        fetch(URL + `promo/slice?limit=${length_of_columns * num_of_columns}&skip=${pageSkip}&category=${category}&website=${websiteFilter}&order_by=${priceFilter}`, {method: "GET"})
            .then(res => res.json())
            .then(data => {
                let elements = data.map(data => {
                    return (
                        <PromoCard key={data.item_id} data={data} />
                    )
                })
                setCards(elements)
            })
    }, [websiteFilter, pageSkip, priceFilter, category, currentPage, URL])

    return(
        <>
            <Categories handle_category_change={handle_category_change} />

            <SortResults 
                categoryNormalName={categoryNormalName}
                dropDownActive={dropDownActive}
                setDropDownActive={setDropDownActive}
                websiteFilter={websiteFilter}
                priceFilterNormalName={priceFilterNormalName}
                handle_website_filter={handle_website_filter}
                handle_price_filter={handle_price_filter}
                websiteButtons={websiteButtons}
            />

            <CardContainer cards={cards} />

            <Pagination 
                handle_previous_page={handle_previous_page}
                handle_next_page={handle_next_page}
                pagination={pagination}
            />

            <Footer />
        </>
    )
}