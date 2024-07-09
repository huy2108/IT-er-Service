import { useState } from 'react'
import { Navbar } from './Components/Navbar/Navbar'
import { Sidebar } from './Components/Sidebar/Sidebar'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import { AddProduct } from './Pages/AddProduct/AddProduct';
// import { RemoveProduct } from './Pages/RemoveProduct/RemoveProduct';
import { QuestionApproval } from './Pages/QuestionApproval/QuestionApproval';
import { UserManagement } from './Pages/RemoveProduct/UserManagement';

function App() {

  return (
    <div className='App'>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path='/admin/addProduct' element={<AddProduct />} />
        <Route path='/admin/userManagement' element={<UserManagement />} />
        <Route path='/admin/questionApproval' element={<QuestionApproval />} />
        <Route path='/' element={<Navigate to='/admin/addProduct' />} />
      </Routes>
    </div>
  )
}

export default App
