import React from 'react'
import { Route, Routes } from 'react-router'
import LoginForm from './component/login'
import Forgatepassword from './pages/Forgatepassword'
import ChangePasword from './pages/changePassword'

function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<LoginForm />} />
        <Route path='/foragate' element={<Forgatepassword />} />
        <Route path='/foragate-password/:token' element={< ChangePasword />} />

      </Routes>
    </>
  )
}

export default App