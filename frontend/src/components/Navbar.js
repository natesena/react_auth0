import React from 'react'
import {Link, withRouter} from 'react-router-dom';
//withRouter  gives component navigation abilities??
import auth0Client from '../Auth/Auth.js';

function Navbar(props){

    const signOut = () => {
        auth0Client.signOut();
        props.history.replace('/');
    }

    return (
      <nav className="nav" style={{overflow: 'hidden'}}>
      {/* <a href='/' className='home-button'>NateSena</a> */}
      <Link to="/" className='home-button'>NateSena</Link>
      <div style={{float: 'right'}}>
        {
          !auth0Client.isAuthenticated() &&
          <button className="" onClick={auth0Client.signIn} >Sign In</button>
        }
        {
          auth0Client.isAuthenticated() &&
          <div>
            <label className="">{auth0Client.getProfile().name}</label>
            <button className="" onClick={() => {signOut()}}>Sign Out</button>
          </div>
        }
      </div>
      <Link to='/editor' className='nav-button'>Editor</Link>
      </nav>
    )
}

export default withRouter(Navbar)
