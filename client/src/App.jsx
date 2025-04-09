import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import MainGame from './pages/MainGame';
function App() {
  return (
    <Router>
      <Navbar/> 
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/game" element={<MainGame/>} />
      </Routes>
    </Router>
  );
}

export default App;
