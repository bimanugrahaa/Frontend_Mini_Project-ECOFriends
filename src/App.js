import './css/App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Donate from './pages/Donate';
import Fundraising from './pages/Fundraising';
import Detail from './pages/Detail';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';
import AboutUs from './pages/AboutUs';

function App() {
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/about-us" exact component={AboutUs}/>
        <Route path="/detail/:id/:title/donate" exact component={Donate}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/fundraising" exact component={Fundraising}/>
        <Route path="/detail/:id/:title" exact component={Detail}/>
        <Route path="/signup" exact component={Signup}/>
        <Route component={NotFound}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App;
