import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Chart } from "react-google-charts";
import './App.css'
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BookingPage from './components/BookingPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Routes>
          <Route path='/' element={<Dashboard />}/>
          <Route path='/booking' element={<BookingPage />}/>
        </Routes>
    </>
  )
}

export default App
