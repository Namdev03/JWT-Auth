import React from 'react'
import { Route, Routes } from 'react-router'
import LoginForm from './component/login'

function App() {
  return (
 <>
 <Routes>
<Route path='/login' element={<LoginForm/>}/>
 </Routes>
 </>
  )
}

export default App