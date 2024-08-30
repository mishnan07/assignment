import { useState } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Home from './Components/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
          <Routes>

      <Route
          path="/"
          element={ <Home /> }
        />

     </Routes>
    </>

  )
}

export default App
