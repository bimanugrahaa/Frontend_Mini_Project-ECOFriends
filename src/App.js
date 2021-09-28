import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import HeaderLogo from './components/HeaderLogo';
import Login from './pages/Login';
import Donate from './pages/Donate';

function App() {
  // return (
  //   <div className="App">
  //     {/* <Header/>
  //     <Home/> */}
  //     <Donate/>
  //   </div>
  // );

  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}/>
        {/* <Route path="/about-us" exact component={AboutUs}/> */}
        <Route path="/donate" exact component={Donate}/>
        <Route path="/login" exact component={Login}/>
        {/* <Route component={NotFound}/> */}
      </Switch>
    </BrowserRouter>
  )
}

export default App;
