import React, { useContext, useEffect, useState } from 'react';
import Logo from '../../assets/logo.png';
import { NavLink, useNavigate } from 'react-router-dom';
import './style.css';
import { TokenAuthContext } from '../Context/Tokencontext';
import { cartcontext } from '../Context/Cartcontext';

export default function Navbar() {
  const [navHeight, setNavHeight] = useState(0);
  const [shadow, setShadow] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For mobile menu toggle
  const { token, settoken } = useContext(TokenAuthContext);
  const { getallcart } = useContext(cartcontext);
  const navigator = useNavigate();

  useEffect(() => {
    const navbar = document.querySelector('.navcolor');
    if (navbar) {
      setNavHeight(navbar.offsetHeight);
    }

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function logout() {
    localStorage.removeItem('token');
    settoken(null);
    navigator('/');
  }

  function getCart(token) {
    navigator('/Cart');
  }

  return (
    <>
      <div className={`navcolor w-full fixed z-50 ${shadow ? 'shadow-md' : ''}`}>
        <div className='flex justify-between w-5/6 mx-auto py-3 items-center'>
          <div>
            <img src={Logo} className='w-10' alt="logo png" />
          </div>

          <div className='hidden md:flex text-gray-600 items-center gap-5'>
            <ul className='flex p-2 items-center gap-5'>
              <li><NavLink to=''>Home</NavLink></li>
              <li><NavLink to='/About'>About</NavLink></li>
              {token && <li><NavLink to='/Shop'>Shop</NavLink></li>}
              <li><NavLink to='/Contact'>Contact</NavLink></li>
            </ul>
          </div>

          <div className='flex gap-4 items-center'>
            <ul className='flex items-center justify-center gap-4'>
              <li onClick={() => { getCart(token) }} className='cursor-pointer'>
                <i className="fa-solid fa-cart-shopping text-gray-600"></i>
              </li>
            </ul>

            <ul className='flex text-gray-600 justify-center items-center gap-3'>
              {token ? (
                <li>
                  <span className='cursor-pointer' onClick={logout}>Logout</span>
                </li>
              ) : (
                <>
                  <li><NavLink to='/Login'>Login</NavLink></li>
                  <li><NavLink to='/Register'>Register</NavLink></li>
                </>
              )}
            </ul>
          </div>

          
          <div className='md:hidden flex items-center'>
            <button
              className='text-gray-600 focus:outline-none'
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <i className="fa-solid fa-bars text-xl"></i>
            </button>
          </div>
        </div>

       
        {isMenuOpen && (
          <div className='md:hidden'>
            <ul className='flex flex-col items-center bg-white text-gray-600 p-4'>
              <li className='mb-2'><NavLink to='' onClick={() => setIsMenuOpen(false)}>Home</NavLink></li>
              <li className='mb-2'><NavLink to='/About' onClick={() => setIsMenuOpen(false)}>About</NavLink></li>
              {token && (
                <li className='mb-2'><NavLink to='/Shop' onClick={() => setIsMenuOpen(false)}>Shop</NavLink></li>
              )}
              <li className='mb-2'><NavLink to='/Contact' onClick={() => setIsMenuOpen(false)}>Contact</NavLink></li>
              
            </ul>
          </div>
        )}
      </div>

      <div style={{ paddingTop: `${navHeight}px` }}></div>
    </>
  );
}
