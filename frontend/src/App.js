import React from 'react';
import logo from './logo.svg';
import './css/App.css';
import {Route} from 'react-router-dom'

import Restricted from './pages/Restricted.js'
import Base from './pages/Base.js'

import Callback from './components/Callback.js'
import Navbar from './components/Navbar.js'
import Post from './components/Post.js'

function App() {
  return (
    <div className="App">
      <Navbar/>
      {/* Here is where we want to use <Route> and <Switches> */}
      <Route exact path="/"  component={Base} />
      <Route path="/home" component={Post} />
      <Route exact path='/callback' component={Callback}/>
    </div>
  );
}

export default App;
