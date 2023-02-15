import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import ProductPage from './components/ProductPage';
import Signin from './components/Signin';
import Home from './components/Home';
import Cart from './components/Cart';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home/>}></Route>
          <Route exact path='/signin' element={<Signin/>}></Route>
          <Route exact path='/product' element={<ProductPage />}></Route>
          <Route exact path='/cart' element={<Cart/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
