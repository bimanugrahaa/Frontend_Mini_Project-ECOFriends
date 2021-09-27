import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import HeaderLogo from './components/HeaderLogo';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      {/* <Header/>
      <Home/> */}
      <Login/>
    </div>
  );
}

export default App;
