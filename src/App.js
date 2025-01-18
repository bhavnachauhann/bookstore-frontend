import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { Routes, Route} from 'react-router-dom';
import AllBooks from './pages/AllBooks';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import  Profile  from './pages/Profile';
import Cart from './pages/Cart';
import ViewBookDetails from './components/ViewBookDetails/ViewBookDetails';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { authActions } from './Store/auth';
import Favourites from './components/Profile/Favourites';
import UserOrderHistory from './components/Profile/UserOrderHistory';
import Setting from './components/Profile/Setting';
import AllOrders from './pages/AllOrders';
import AddBooks from './pages/AddBooks';
import UpdateBook from './pages/UpdateBook';
// import UpdateBook from './pages/UpdateBook';





function App() {
  const dispatch = useDispatch();
  const role =useSelector((state)=>state.auth.role);
  useEffect(()=>{
    if(localStorage.getItem("id")&&
    localStorage.getItem("token")&&
    localStorage.getItem("role")
  ){
    dispatch(authActions.login);
    dispatch(authActions.changeRole(localStorage.getItem("role")));
  }
  }, []);

  return (
    <div className="App">
  
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route  path="/all-books" element={<AllBooks/>}></Route>
        
        
        <Route  path="/cart" element={<Cart/>}></Route>
        
        <Route  path="/profile" element={<Profile/>}>
        {role === "user" ? <Route index element={<Favourites/>}></Route>:<Route index element={<AllOrders/>}/>}

        {/* <Route index element={<Favourites/>}></Route> */}

        {role === "admin" &&  (<Route path='/profile/add-book' element={<AddBooks/>}></Route>)}
        <Route path='/profile/orderHistory' element={<UserOrderHistory/>}></Route>

        <Route path='/profile/setting' element={<Setting/>}></Route>
        </Route>


        <Route  path="/login" element={<LogIn/>}></Route>
        <Route  path="/signup" element={<SignUp/>}></Route>
        <Route  path="/updateBook/:id" element={<UpdateBook/>}></Route>
        

        <Route  path="/view-book-details/:id" element={<ViewBookDetails/>}></Route>
        
      </Routes>
      <Footer/>

      
     
      
    
    </div>
  );
}

export default App;
