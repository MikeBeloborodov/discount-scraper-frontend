import React from 'react'

export default function SortResults({
    categoryNormalName,
    dropDownActive,
    setDropDownActive,
    websiteFilter,
    priceFilterNormalName,
    handle_website_filter,
    handle_price_filter,
    websiteButtons
}){
    return(
        <section className='section'>
            <p className="content has-text-danger m-2">{categoryNormalName} / {websiteFilter === "" ? 'Все сайты' : websiteFilter} / {priceFilterNormalName}</p>
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
    )
}