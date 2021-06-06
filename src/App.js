import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import Sidemenu from './Sidemenu';
import Chat from "./Chat";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Login from './Login';
import { useStateValue } from './StateProvider';
function App() {
  const [{user},dispatch]=useStateValue();

  return (
    <div className="App">
      {!user?(
        <Login/>
      ):(
          <div className="app_body">
            <Router>
              <Sidemenu/>
              <Switch>
                  <Route path="/rooms/:roomId">
                    <Chat/>
                  </Route>
                  <Route path="/">
                    <Chat/>
                  </Route>
              </Switch>
            </Router>
          </div>
      )}
    </div>

  );
}

export default App;
