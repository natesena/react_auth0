import React from 'react'
import auth0Client from '../Auth/Auth.js';


class Login extends React.Component{
    render(){
        return(
            
                <div className={'body-liner'}>
                    <div className={'window-table'}>
                        <div className={'table-center-row'}>
                            <h1 className={'text-center'}>Login Below</h1>
                            <p>No extended functionality exists for users unless you are Nathaniel Sena, the site administrator</p>
                            {
                                !auth0Client.isAuthenticated() &&
                                <button className={'login-button'} onClick={auth0Client.signIn} >Sign In</button>
                            }
                        </div>
                    </div>
                    
                </div>
        )
    }
}

export default Login