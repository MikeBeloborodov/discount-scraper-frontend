import React from 'react'
import sushi from '../sushi.png'
import pizza from '../pizza.png'
import shawarma from '../shawarma.png'
import burger from '../burger.png'
import kebab from '../kebab.png'
import dumplings from '../dumplings.png'
import pie from '../pie.png'
import combo from '../combo.png'

export default function Categories({ handle_category_change }){
    return(
        <section className='section mb-0 pb-0' style={{display: "flex"}}>
            <div className='box' style={{display: "flex", flexWrap: "wrap"}}>
                
                <div className='block has-text-centered category-button'>
                    <button className='button is-white is-large category-choice' onClick={(e) => {handle_category_change(e, 'pizza')}}>
                        <div className="icon-text">
                            <span className="icon is-large has-text-info">
                                <img className='img' src={pizza} alt="pizza logo"/>
                            </span>
                        </div>
                    </button>
                    <p className="content has-text-danger m-2">Пицца</p>
                </div>
                
                <div className='block has-text-centered category-button'>
                <button className='button is-white is-large category-choice' onClick={(e) => {handle_category_change(e, 'sushi')}}>
                    <div className="icon-text">
                        <span className="icon is-large has-text-info">
                            <img className='img' src={sushi} alt='sushi logo'/>
                        </span>
                    </div>
                </button>
                <p className="content has-text-danger m-2">Роллы</p>
                </div>
                
                <div className='block has-text-centered category-button'>
                    <button className='button is-white is-large category-choice' onClick={(e) => {handle_category_change(e, 'shawarma')}}>
                        <div className="icon-text">
                            <span className="icon is-large has-text-info">
                                <img className='img' src={shawarma} alt='shawarma logo'/>
                            </span>
                        </div>
                    </button>
                    <p className="content has-text-danger m-2">Шаурма</p>
                </div>
                
                <div className='block has-text-centered category-button'>
                    <button className='button is-white is-large category-choice' onClick={(e) => {handle_category_change(e, 'burger')}}>
                        <div className="icon-text">
                            <span className="icon is-large has-text-info">
                                <img className='img' src={burger} alt='burger logo'/>
                            </span>
                        </div>
                    </button>
                    <p className="content has-text-danger m-2">Бургеры</p>
                </div>

                <div className='block has-text-centered category-button'>
                    <button className='button is-white is-large category-choice' onClick={(e) => {handle_category_change(e, 'kebab')}}>
                        <div className="icon-text">
                            <span className="icon is-large has-text-info">
                                <img className='img' src={kebab} alt='kebab logo'/>
                            </span>
                        </div>
                    </button>
                    <p className="content has-text-danger m-2">Шашлык</p>
                </div>

                <div className='block has-text-centered category-button'>
                    <button className='button is-white is-large category-choice' onClick={(e) => {handle_category_change(e, 'dumplings')}}>
                        <div className="icon-text">
                            <span className="icon is-large has-text-info">
                                <img className='img' src={dumplings} alt='dumplings logo'/>
                            </span>
                        </div>
                    </button>
                    <p className="content has-text-danger m-2">Хинкали</p>
                </div>

                <div className='block has-text-centered category-button'>
                    <button className='button is-white is-large category-choice' onClick={(e) => {handle_category_change(e, 'pie')}}>
                        <div className="icon-text">
                            <span className="icon is-large has-text-info">
                                <img className='img' src={pie} alt='pie logo'/>
                            </span>
                        </div>
                    </button>
                    <p className="content has-text-danger m-2">Пироги</p>
                </div>

                <div className='block has-text-centered category-button'>
                    <button className='button is-white is-large category-choice' onClick={(e) => {handle_category_change(e, 'combo')}}>
                        <div className="icon-text">
                            <span className="icon is-large has-text-info">
                                <img className='img' src={combo} alt='combo logo'/>
                            </span>
                        </div>
                    </button>
                    <p className="content has-text-danger m-2">Наборы</p>
                </div>

            </div>
        </section>
    )
}