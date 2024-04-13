import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import { Footer } from './Components/Footer/Footer';
import { Routes, Route, Navigate} from 'react-router-dom';
import { Home} from './Pages/Home'
import { Blog} from './Pages/Blog'
import { Library} from './Pages/Library'
import { LoginSignup} from './Pages/LoginSignup/LoginSignup'
import { BooksForSale} from './Pages/BooksForSale'
import { Register } from './Pages/Register/Register'
import React, {useState, useEffect } from 'react'
import axios from 'axios'
import { LoadingPage } from './Components/LoadingPage/LoadingPage';



function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setTimeout(() => {
      const token = localStorage.getItem('token')
      
      if(token){
        
        axios.get('http://localhost:4000/api/verify',{headers: {Authorization: `Bearer ${token}`}})
          .then(() => {
            setIsLoggedIn(true)
          })
          .catch(error => {
            console.log(error)
            setIsLoggedIn(false)
          })
          .finally(() => setLoading(false));
      }else {
        setLoading(false); // Set loading to false if no token found
      }
    },900)

  },[isLoggedIn])

  

  return (

    <div >
      {loading ? <LoadingPage/> :
        <Routes>
        <Route
          path="*"
          element={
            <DefaultLayout setIsLoggedIn={setIsLoggedIn}>
              <Route path="/" element={isLoggedIn ? <Home/> : <Navigate to="/login" />} />
              <Route path="/blog" element={isLoggedIn ? <Blog /> : <Navigate to="/login" />} />
              <Route path="/books/for-sales" element={isLoggedIn ? <BooksForSale /> : <Navigate to="/login" />} />
              <Route path="/books/library" element={isLoggedIn ? <Library /> : <Navigate to="/login" />} />
            </DefaultLayout>
          }
        />
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" />:<LoginSignup setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/register" element={<Register />} />
      </Routes>
      }
    </div>
  );
}

function DefaultLayout({children, setIsLoggedIn}) {
  return (
    <>
      <Navbar setIsLoggedIn={setIsLoggedIn}/>
        <Routes>
          {children}
        </Routes>
      <Footer />
    </>
  );
}

export default App;
