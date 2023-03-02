import { Container } from 'react-bootstrap';

import Header from './components/Header';
import Foooter from './components/Footer';
import HomeScreen from './screens/HomeScreen';

function App() {
  return (
    <div>
      <Header />
      <main className='py-3'>
        <Container>
          <h1> Welcome</h1>
          <HomeScreen />
        </Container>
      </main>

      <Foooter />
    </div>
  );
}

export default App;
