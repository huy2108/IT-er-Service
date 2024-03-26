import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import { Footer } from './Components/Footer/Footer';
import { Routes, Route} from 'react-router-dom';
import { Home} from './Pages/Home'
import { Blog} from './Pages/Blog'
import { Library} from './Pages/Library'
import { LoginSignup} from './Pages/LoginSignup'
import { BooksForSale} from './Pages/BooksForSale'



function App() {
  return (
    <div >
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/blog' element={<Blog/>}/>
          <Route path='/books/for-sales' element={<BooksForSale/>}/>
          <Route path='/books/library' element={<Library/>}/>
          <Route path='/login' element={<LoginSignup/>}/>
        </Routes>
        <Footer/>
    </div>
  );
}

export default App;
