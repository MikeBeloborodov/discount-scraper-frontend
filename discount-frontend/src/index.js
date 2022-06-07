import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import {BrowserRouter as Router} from 'react-router-dom'
import { CookiesProvider } from 'react-cookie';

const root= ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <CookiesProvider>
        <Router>
            <App />
        </Router>   
    </CookiesProvider>
)