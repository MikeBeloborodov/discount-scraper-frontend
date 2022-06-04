import React from 'react'

export default function Footer(){
    let date = new Date()
    return(
        <footer className="footer">
            <div className="content has-text-centered">
                <p>
                <strong>&#169; Fast Food Izhevsk</strong> - весь фаст фуд Ижевска в одном месте.<br/> {date.getYear() + 1900} 
                </p>
            </div>
        </footer>
    )
}