import { Container } from 'react-bootstrap';
import {
  HashRouter as Router,
  Route,
  
  
} from 'react-router-dom';
import Header from './components/Header';
import Foooter from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          
            <Route path='/' component={HomeScreen} exact />
            <Route path='/product/:id' component={ProductScreen} />
          
        </Container>
      </main>

      <Foooter />
    </Router>
  );
}

export default App;
