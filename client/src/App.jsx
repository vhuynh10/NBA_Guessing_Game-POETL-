import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import MainGame from './pages/MainGame';
import Footer from './components/Footer';

function App() {
  return (
    <div className="generic-cream-bg">
      <Router>
        <Navbar/> 
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/game" element={<MainGame/>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
