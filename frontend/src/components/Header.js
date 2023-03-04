import React from 'react';
import { Navbar, Container, Col, Nav, NavbarBrand } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Link to='/'>
            <Navbar.Brand>GoSHOP</Navbar.Brand>
          </Link>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              
                <Link to='/cart'>
                    <NavbarBrand>
                  <i className='fas fa-shopping-cart'> </i> Cart
                  </NavbarBrand>
                </Link>
                
              
              <Link to='/login'>
                <NavbarBrand>
                
                  <i className='fas fa-user'></i> Login
                  </NavbarBrand>
                
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
