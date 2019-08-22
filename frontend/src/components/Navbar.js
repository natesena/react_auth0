import React from 'react'
import {Link, withRouter} from 'react-router-dom';
//withRouter  gives component navigation abilities??
import auth0Client from '../Auth/Auth.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

function Navbar(props){

    const signOut = () => {
        auth0Client.signOut();
        props.history.replace('/');
    }

    return (
      <nav className="nav" style={{overflow: 'hidden'}}>
        <Link to="/posts" className='home-button'>NateSena</Link>
        <FontAwesomeIcon icon={faBars} className={'nav-hamburger'} />
        <div className={'nav-options'}>
            {
              auth0Client.isAuthenticated() &&
              <div className={'nav-button'}>
                <label>{auth0Client.getProfile().name}</label>
                <button className={'nav-signout'} onClick={() => {signOut()}}>Sign Out</button>
              </div>
            }
          <Link to='/editor' className={'nav-button'}>Editor</Link>
        </div>
        
      </nav>
    )
}

export default withRouter(Navbar)
