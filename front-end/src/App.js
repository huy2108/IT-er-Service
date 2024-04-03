import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import { Footer } from './Components/Footer/Footer';
import { Routes, Route} from 'react-router-dom';
import { Home} from './Pages/Home'
import { Blog} from './Pages/Blog'
import { Library} from './Pages/Library'
import { LoginSignup} from './Pages/LoginSignup/LoginSignup'
import { BooksForSale} from './Pages/BooksForSale'
import { Register } from './Pages/Register/Register'



function App() {
  return (
    <div >
        {/* <Navbar/> */}
        <Routes>
          <Route
            path="*"
            element={
              <DefaultLayout>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/books/for-sales" element={<BooksForSale />} />
                <Route path="/books/library" element={<Library />} />
              </DefaultLayout>
            }
          />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        {/* <Footer/> */}
    </div>
  );
}

function DefaultLayout({children}) {
  return (
    <>
      <Navbar />
        <Routes>
          {children}
        </Routes>
      <Footer />
    </>
  );
}

export default App;
