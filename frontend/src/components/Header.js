import React from 'react';
import {
  Navbar,
  Container,
  Col,
  Nav,
  NavbarBrand,
  NavDropdown,
  NavLink,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { logout } from '../actions/userActions';

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Nav className='ml-auto'>
            <Link to='/'>
              <Navbar.Brand>GoSHOP</Navbar.Brand>
            </Link>
          </Nav>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />

          <Navbar.Collapse
            className='justify-content-end'
            id='basic-navbar-nav'
          >
            <Nav className='ml-auto'>
              <Link to='/cart'>
                <NavbarBrand>
                  <i className='fas fa-shopping-cart my-3'> </i> Cart
                </NavbarBrand>
              </Link>

              {userInfo ? (
                <>
                  <Link to='/profile'>
                    <Navbar.Brand>
                      <i className='fas fa-user my-3'></i> Profile
                    </Navbar.Brand>
                  </Link>

                  <Navbar.Brand onClick={logoutHandler}>
                    <i className='fas fa-sign-out-alt mt-2'></i> Logout
                  </Navbar.Brand>
                </>
              ) : (
                <Link to='/login'>
                  <Navbar.Brand>
                    <i className='fas fa-sign-in-alt my-3'></i> Login
                  </Navbar.Brand>
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
