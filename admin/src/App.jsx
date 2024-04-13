import { useState } from 'react'
import { Navbar } from './Components/Navbar/Navbar'
import { Sidebar } from './Components/Sidebar/Sidebar'
import './App.css'
import { Routes, Route, Navigate} from 'react-router-dom';
import { AddProduct } from './Pages/AddProduct/AddProduct';
import { RemoveProduct } from './Pages/RemoveProduct/RemoveProduct';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <Navbar/>
      <Sidebar/>
      <Routes>
        <Route path='/admin/addProduct' element={<AddProduct/>}/>
        <Route path='/admin/removeProduct' element={<RemoveProduct/>}/>
        <Route path='/' element={<Navigate to='/admin/addProduct'/>}/>
      </Routes>
    </div>
  )
}

export default App
