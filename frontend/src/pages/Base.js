import React from 'react'
import axios from 'axios'
// import Post from '../components/Post.js'

class Base extends React.Component{
    state = {
        posts: []
    }
    componentDidMount(){
        axios.get('/api/Posts')
        .then(res =>{
            if(res.data.Posts){
                this.setState({
                    posts:[...res.data.Posts]
                })
            }
        })
    }

    deletePost(id){
        axios.delete(`/api/Posts/${id}`)
        .then((res)=>{
            res.data.Post
            ?this.setState({
                posts: [...this.state.posts.filter(post => post._id != id)]
            })
            :console.log("There was an error handling post removal")
        })
    }
    render(){
        return(
            <div className="body">
            {
                this.state.posts.length >= 1
                ?(this.state.posts.map((post, index) =>
                    <button key={post._id} onClick={this.deletePost.bind(this, post._id)}>DELETE {index}</button>
                ))
                :<p>No Posts Yet</p>
            }
            </div>
        )
    }
}

export default Base