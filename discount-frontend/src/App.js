import React from "react"
import {Routes, Route} from 'react-router-dom'
import MainPage from "./components/MainPage"
import './index.css'
import { useCookies } from 'react-cookie';

export default function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name'])
  setCookie({SameSite: 'strict'})
  return (
    <Routes>
      <Route exact path="/" element={<MainPage />}/>
    </Routes>
  )
}
