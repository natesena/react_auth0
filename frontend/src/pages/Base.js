import React from 'react'
import axios from 'axios'
import Post from '../components/Post.js'

class Base extends React.Component{
    state = {
        posts: []
    }
    componentDidMount(){
        axios.get('/api/Posts')
        .then(res =>{
            console.log(res.data.Posts)
            if(res.data.Posts){
                this.setState({
                    posts:[...res.data.Posts]
                }, ()=>{
                    console.log(this.state.posts)
                })
            }
        })
    }
    render(){
        return(
            <div className="body">
            {
                this.state.posts.length >= 1
                ?(this.state.posts.map((post, index) =>
                    <p key={index}>Dis a post</p>
                ))
                :<p>No Posts Yet</p>
            }
            </div>
        )
    }
}

export default Base