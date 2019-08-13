import React from 'react';
import logo from './logo.svg';
import './App.css';

import Navbar from './components/Navbar.js'
import Post from './components/Post.js'

function App() {
  return (
    <div className="App">
      <div>
      <Navbar/>
      </div>
      <div>
        <h1>This is the app</h1>
      </div>
      <Post />
    </div>
  );
}

export default App;
