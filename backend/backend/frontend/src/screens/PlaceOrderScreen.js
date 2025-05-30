import React, { useState, useEffect } from 'react';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { PayPalButton } from 'react-paypal-button-v2';

function PlaceOrderScreen({ history }) {
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, error, success } = orderCreate;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  cart.itemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);
  cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2);
  cart.taxPrice = Number(0.082 * cart.itemsPrice).toFixed(2);

  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  if (!cart.paymentMethod) {
    history.push('/payment');
  }

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [success, history]);

  const placeOrder = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  const createOrderHandler = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: cart.totalPrice,
            breakdown: {
              item_total: {
                value: cart.itemsPrice,
                currency_code: 'USD',
              },
              shipping: {
                value: cart.shippingPrice,
                currency_code: 'USD',
              },
              tax_total: {
                value: cart.taxPrice,
                currency_code: 'USD',
              },
            },
          },
          items: cart.cartItems.map((item) => ({
            name: item.name,
            unit_amount: {
              value: item.price,
              currency_code: 'USD',
            },
            quantity: item.qty.toString(),
          })),
        },
      ],
    });
  };

  const onApproveHandler = (data, actions) => {
    return actions.order.capture().then((details) => {
      placeOrder();
    });
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Shipping: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}
                {'  '}
                {cart.shippingAddress.postalCode},{'  '}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message variant='info'>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index} style={{ color: 'inherit' }}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>

                        <Col md={5}>
                          <Link to={`/product/${item.product}`} style={{ color: 'inherit' }}>
                            {item.name}
                          </Link>
                        </Col>

                        <Col md={2} className="text-center">
                          {item.qty} X
                        </Col>
                        <Col md={2} className="text-end">
                          ${item.price}
                        </Col>
                        <Col md={2} className="text-end">
                          ${(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col md={8}>Items:</Col>
                  <Col md={4} className="text-end">${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col md={8}>Shipping:</Col>
                  <Col md={4} className="text-end">${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col md={8}>Tax:</Col>
                  <Col md={4} className="text-end">${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col md={8}>Total:</Col>
                  <Col md={4} className="text-end">${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>

              <ListGroup.Item>
                <PayPalButton
                  createOrder={createOrderHandler}
                  amount={cart.totalPrice}
                  onApprove={onApproveHandler}
                  style={{ layout: 'vertical' }}
                />
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default PlaceOrderScreen;
