import {BrowserRouter, HashRouter, Routes, Route} from 'react-router-dom'
import Home from './Pages/Home/Home'
import Navbar from './Components/Navbar/Navbar'
import Book from './Pages/Book/Book'
import Login from './Pages/Login/Login'
import Cart from './Pages/Cart/Cart'
import Profile from './Pages/Profile/Profile'
import Register from './Pages/Register/Register'
import { useSelector } from 'react-redux'
import Footer from './Components/Footer/Footer'
import Search from './Pages/Search/Search'
import PaymentSuccess from './Pages/PaymentSuccess/PaymentSuccess'
import Write from './Pages/Write/Write'

function App() {

  const user = useSelector(state => state.user.currentUser)



  return (
    <>
      <HashRouter>
        <Navbar />
        <Routes>
          <Route element={<Home /> } path='/'/>
          <Route element={<Login />} path='/login'/>
          <Route element={<Register />} path='/register'/>
          <Route element={user ? <Profile /> : <Home />} path='/profile/:id'/>
          <Route element={<Book />} path='/book/:id'/>
          <Route element={<Search />} path='/search'/>
          <Route element={user ? <Cart /> : <Home />} path='/cart'/>
          <Route element={user ? <Write /> : <Home />} path='/write'/>
          <Route element={user ? <PaymentSuccess /> : <Home />} path='/checkout-success'/>
        </Routes>
  
      </HashRouter>
    </>
  )
}

export default App
