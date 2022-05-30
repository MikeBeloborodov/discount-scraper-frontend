import React from "react"
import {Routes, Route} from 'react-router-dom'
import MainPage from "./components/MainPage"
import './index.css'

export default function App() {
  return (
    <Routes>
      <Route exact path="/" element={<MainPage />}/>
    </Routes>
  )
}
