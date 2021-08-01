import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Login } from './page/login/Login';
import { Student } from './page/student/Student';
import { Institution } from './page/institution/Institution';
import { University } from '@page/university/University';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'; 

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Router>
        <Switch>
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="/student">
              <Student />
            </Route>
            <Route path="/institution">
              <Institution/>
            </Route>
            <Route path="/university">
              <University/>
            </Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
