import React from 'react'
import auth0Client from '../Auth/Auth.js';


class Login extends React.Component{
    render(){
        return(
            
                <div className={'body-liner'}>
                    {
                        !auth0Client.isAuthenticated() &&
                        <button onClick={auth0Client.signIn} >Sign In</button>
                    }
                </div>
        )
    }
}

export default Login