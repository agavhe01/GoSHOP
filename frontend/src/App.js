import { Container } from 'react-bootstrap';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Foooter from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';

import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const initialOptions = {
  'client-id':
    'AVFZAeded6Vs-IoVuLHC59I_CNqXJRehVP14FnRo7NIruPBysnUUjMx1xI2NsMGY7PxUdVMfkeczIOIA',
  currency: 'USD',
  intent: 'capture',
  'data-client-token':
    'AVFZAeded6Vs-IoVuLHC59I_CNqXJRehVP14FnRo7NIruPBysnUUjMx1xI2NsMGY7PxUdVMfkeczIOIA',
};

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/admin/userlist' component={UserListScreen} exact />

          <Route path='/order/:id' component={OrderScreen} />
        </Container>
      </main>

      <Foooter />
    </Router>
  );
}

export default App;
