import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, NavLink } from 'react-router-dom';

function CheckoutSteps({ step1, step2, step3, step4 }) {
  return (
    <Nav className='justify-content-center mb-4'>
      <Nav.Item>
        {step1 ? (
          <NavLink to='/login'>Login</NavLink>
        ) : (
          <NavLink to='#' disabled>
            Login
          </NavLink>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <NavLink to='/shipping'>Shipping</NavLink>
        ) : (
          <NavLink to='#' disabled>
            Shipping
          </NavLink>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <NavLink to='/payment'>Payment</NavLink>
        ) : (
          <NavLink to='#' disabled>
            Payment
          </NavLink>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <NavLink to='/placeorder'>Place Order</NavLink>
        ) : (
          <NavLink to='#' disabled>
            Place Order
          </NavLink>
        )}
      </Nav.Item>
    </Nav>
  );
}

export default CheckoutSteps;
