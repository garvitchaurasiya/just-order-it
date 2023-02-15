import React, { useState, useEffect } from 'react'
import { Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { Link } from 'react-router-dom';
import Cart from './Cart';

export const Navbar = () => {

  const [searchedUsers, setSearchedUsers] = useState([]);
  let searchTerm = "";
  const [showCart, setShowCart] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    setLoggedIn(localStorage.getItem('email')!=='');
    console.log('useeff');
  }, [localStorage.getItem('email')])
  


  const changeSearchTerm = async (e) => {
    searchTerm = e.target.value;
    if (searchTerm === "") {
      document.getElementById("searchResults").style.display = "none";
    } else {
      document.getElementById("searchResults").style.display = "block";
    }
    const response = await fetch(`http://localhost:5000/search/${searchTerm}`, {
      method: "GET",
      headers: {
        'Content-type': 'application/json'
      },
    })
    const json = await response.json();
    console.log(json);
    setSearchedUsers(json);
  }
  function onFocus() {
    document.getElementById("searchBar").focus();
  }
  function clearInput(){
    document.getElementById("searchResults").style.display = "none";
  }
  function handleLogout(){
    localStorage.setItem('email', '');
  }

  return (
    <div className='flex justify-around items-center' style={{ "display": "flex", "backgroundColor": "#fcb800", 'height': '80px' }}>
      <div>
        <Link to={'/'}>
          <h1><span className='text-black'>Just</span><span className='text-white'>OrderIt</span></h1>
        </Link>
      </div>
      <div className='w-80' style={{ "height": "40px" }}>
        <input id="searchBar" onClick={onFocus} className='h-full pl-2' autoComplete="off" placeholder='Search...' onChange={changeSearchTerm} />
        <button className='bg-black text-white text-lg h-full px-5 font-bold'>Search</button>

        <div id="searchResults" style={{ 'overflowY': 'scroll', 'marginTop':'20px' }} className="absolute w-80 bg-black max-h-80">
          {searchedUsers.map((ele, index) => {
            // return <Link key={index} to={``}>
            return <Link onClick={clearInput} key={index} to={{ pathname: `/product`, search: `?id=${ele.id}` }}>
              <div style={{'padding':'10px', 'cursor': 'pointer'}}>{ele.title}</div>
            </Link>
          })}
        </div>

      </div>

      <div className='flex justify-around items-center'>
        <div onClick={()=>{setShowCart(!showCart)}} className='text-black cursor-pointer'>
          <Icon name="shopping cart" size='large' />
        </div>

        <div className='text-black mx-12 cursor-pointer flex items-center'>
          <Icon name="user" size='large' />
          {!loggedIn && <Link to="/signin" className='text-black'>Login <br/> Register</Link>}
        </div>

        { loggedIn && <div onClick={handleLogout} className="font-bold text-lg cursor-pointer">
          Logout
        </div>}

      </div>
      {console.log(showCart)}
      {showCart && <Cart/>}

    </div >
  )
}
