import React from 'react'
import axios from 'axios'

class Base extends React.Component{
    state = {
        posts: []
    }
    componentDidMount(){
        console.log("Base Mounted")
        axios.get('/api/Posts')
        .then(res =>{
            console.log(`res: ${res}`)
        })
    }
    render(){
        return(
            <h1>This is the base page. Nothing really here.</h1>
        )
    }
}

export default Base