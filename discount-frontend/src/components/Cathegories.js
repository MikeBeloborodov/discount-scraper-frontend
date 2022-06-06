import React from 'react'
import sushi from '../sushi.png'
import pizza from '../pizza.png'
import shawarma from '../shawarma.png'
import burger from '../burger.png'
import kebab from '../kebab.png'
import dumplings from '../dumplings.png'
import pie from '../pie.png'
import combo from '../combo.png'

export default function Cathegories({ handle_cathegory_change }){
    return(
        <section className='section mb-0 pb-0' style={{display: "flex"}}>
            <div className='box' style={{display: "flex", flexWrap: "wrap"}}>
                <a className='cathegory-choice' onClick={(e) => {handle_cathegory_change(e, 'pizza')}}>
                    <div className="icon-text">
                        <span className="icon is-large has-text-info m-2">
                            <img className='img' src={pizza} alt="pizza logo"/>
                        </span>
                    </div>
                    <p className="content has-text-danger m-2">Пицца</p>
                </a>
                <a className='cathegory-choice' onClick={(e) => {handle_cathegory_change(e, 'sushi')}}>
                    <div className="icon-text">
                        <span className="icon is-large has-text-info m-2">
                            <img className='img' src={sushi} alt='sushi logo'/>
                        </span>
                    </div>
                    <p className="content has-text-danger m-2">Роллы</p>
                </a>
                <a className='cathegory-choice' onClick={(e) => {handle_cathegory_change(e, 'shawarma')}}>
                    <div className="icon-text">
                        <span className="icon is-large has-text-info m-2">
                            <img className='img' src={shawarma} alt='shawarma logo' style={{marginLeft: "1rem"}}/>
                        </span>
                    </div>
                    <p className="content has-text-danger m-2">Шаурма</p>
                </a>
                <a className='cathegory-choice' onClick={(e) => {handle_cathegory_change(e, 'burger')}}>
                    <div className="icon-text">
                        <span className="icon is-large has-text-info m-2">
                            <img className='img' src={burger} alt='burger logo' style={{marginLeft: "1rem"}}/>
                        </span>
                    </div>
                    <p className="content has-text-danger m-2">Бургеры</p>
                </a>
                <a className='cathegory-choice' onClick={(e) => {handle_cathegory_change(e, 'kebab')}}>
                    <div className="icon-text">
                        <span className="icon is-large has-text-info m-2">
                            <img className='img' src={kebab} alt='kebab logo' style={{marginLeft: "1rem"}}/>
                        </span>
                    </div>
                    <p className="content has-text-danger m-2">Шашлык</p>
                </a>
                <a className='cathegory-choice' onClick={(e) => {handle_cathegory_change(e, 'dumplings')}}>
                    <div className="icon-text">
                        <span className="icon is-large has-text-info m-2">
                            <img className='img' src={dumplings} alt='dumplings logo' style={{marginLeft: "1rem"}}/>
                        </span>
                    </div>
                    <p className="content has-text-danger m-2">Хинкали</p>
                </a>
                <a className='cathegory-choice' onClick={(e) => {handle_cathegory_change(e, 'pie')}}>
                    <div className="icon-text">
                        <span className="icon is-large has-text-info m-2">
                            <img className='img' src={pie} alt='pie logo'/>
                        </span>
                    </div>
                    <p className="content has-text-danger m-2">Пироги</p>
                </a>
                <a className='cathegory-choice' onClick={(e) => {handle_cathegory_change(e, 'combo')}}>
                    <div className="icon-text">
                        <span className="icon is-large has-text-info ml-4 mt-2 mb-2">
                            <img className='img' src={combo} alt='combo logo'/>
                        </span>
                    </div>
                    <p className="content has-text-danger m-2">Наборы</p>
                </a>
            </div>
        </section>
    )
}