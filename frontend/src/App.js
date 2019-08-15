import React from 'react';
import './css/App.css';
import {Route} from 'react-router-dom'

import Base from './pages/Base.js'
import Editor from './pages/Editor.js'

import Callback from './components/Callback.js'
import Navbar from './components/Navbar.js'
// import Post from './components/Post.js'

function App() {
  return (
    <div className="App">
      <Navbar/>
      <div className="body">
      {/* Here is where we want to use <Route> and <Switches> */}
        <Route exact path="/"  component={Base} />
        <Route exact path="/editor" component={Editor} />
        <Route exact path='/callback' component={Callback}/>
      </div>
    </div>
  );
}

export default App;
