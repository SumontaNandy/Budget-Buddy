import './App.css';
import Header from './components/Header';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" render={() => {
            return (
              <Login />
            )
          }} />
          <Route exact path="/signup" render={() => {
            return (
              <Signup />
            )
          }} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
