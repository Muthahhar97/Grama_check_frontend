import NavBar from './NavBar';
import Home from './Home';
import Apply from './Apply';
import Status from './Status';
import { BrowserRouter as Router,Route, Switch } from 'react-router-dom';


function App() {
  return (
    <Router>
    <div className="App">
      <NavBar/>
      <div className="content">
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/apply">
            <Apply/>
          </Route>
          <Route path="/status">
            <Status/>
          </Route>
          
        </Switch>
      </div>
    </div>
    </Router>
  );
}

export default App;
