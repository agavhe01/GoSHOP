import React from 'react';
import {
  Navbar,
  Container,
  Nav,
  NavbarBrand,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/userActions';
import SearchBox from './SearchBox';
import { useDarkMode } from '../context/DarkModeContext';

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { darkMode, toggleDarkMode } = useDarkMode();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar expand='lg' collapseOnSelect>
        <Container>
          <Link to='/' className='navbar-brand' style={{ fontSize: '1.1rem' }}>
            GoSHOP
          </Link>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />

          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {userInfo && userInfo.isAdmin && (
                <>
                  <Link to='/admin/userlist' className='nav-link' style={{ fontSize: '1.1rem' }}>
                    <i className='fas fa-users'></i> Users
                  </Link>
                  <Link to='/admin/productlist' className='nav-link' style={{ fontSize: '1.1rem' }}>
                    <i className='fas fa-box'></i> Products
                  </Link>
                  <Link to='/admin/orderlist' className='nav-link' style={{ fontSize: '1.1rem' }}>
                    <i className='fas fa-shopping-bag'></i> Orders
                  </Link>
                </>
              )}

              <Link to='/cart' className='nav-link' style={{ fontSize: '1.1rem' }}>
                <i className='fas fa-shopping-cart'></i> Cart
              </Link>

              {userInfo ? (
                <>
                  <Link to='/profile' className='nav-link' style={{ fontSize: '1.1rem' }}>
                    <i className='fas fa-user'></i> {userInfo.name}
                  </Link>
                  <NavbarBrand 
                    onClick={logoutHandler} 
                    className='nav-link' 
                    style={{ cursor: 'pointer', fontSize: '1.1rem' }}
                  >
                    <i className='fas fa-sign-out-alt'></i> Logout
                  </NavbarBrand>
                </>
              ) : (
                <Link to='/login' className='nav-link' style={{ fontSize: '1.1rem' }}>
                  <i className='fas fa-sign-in-alt'></i> Login
                </Link>
              )}

              <NavbarBrand 
                onClick={toggleDarkMode} 
                className='nav-link' 
                style={{ cursor: 'pointer', fontSize: '1.1rem' }}
              >
                <i className={`fas fa-${darkMode ? 'sun' : 'moon'}`}></i> {darkMode ? 'Light' : 'Dark'} Mode
              </NavbarBrand>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
