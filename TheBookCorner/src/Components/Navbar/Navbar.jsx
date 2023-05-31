import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './navbar.scss'
import {ShoppingCartOutlined,   HomeOutlined, SearchOutlined,} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { leave } from '../../Redux/apiCalls';


const Navbar = () => {

  const quantity = useSelector(state =>state.cart.quantity)

  const user = useSelector(state => state.user.currentUser)
  const dispatch = useDispatch()

  const handleLogout = () => {
    try {
      leave(dispatch, {user})
    } catch (error) {
      console.log(error)
    }
  }

 

  return (
    <div className='navbar'>
        <div className="left">
          <Link to='/' className='link'>
              <HomeOutlined className='homeIcon'/>
          </Link>
        </div>
        {!user ? (
          null
        ) : (
        <div className="center">
       
          {/*<div className="inputContainer">
            <input type="text" placeholder='search' />
            <button className='searchBtn'> <SearchOutlined /></button>
        </div>*/}
        </div> 
         )}
        <div className="right">
          {!user ? (
            null
          ) : (
            <Link to={`/profile/${user._id}`} className='link'>
              {user.img ? (
                <img src={user.img} className='profilePic'/>
              ) : (
                <span className='profilePicLetter'>{user.username.charAt(0)}</span>
              )}

            </Link>
          )}

          {!user ? (
              <Link to='/login' className='link'>
                <span>Login</span>
              </Link>
              
          ): (
            <span onClick={handleLogout}>Logout</span>
          )}
          <Link to='/search' className='link'>
            <span>Search</span>
          </Link>
          {!user ? (
              <Link to='/register' className='link'>
                <span>Sign up</span>
              </Link>
              
          ): (
           null
          )}

            {!user ? (
            null
          ) : (
            <div className='cart'>
              <Link to='/cart' className='link'>
                <ShoppingCartOutlined className='cartIcon'/>
              </Link>
                <span className='counter'>
                  {quantity}
                </span>
            </div>
                )}
        </div>
           
    </div>
  )
}

export default Navbar