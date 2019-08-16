import React from 'react'
import axios from 'axios'
import PreviewPost from '../components/PreviewPost.js'
// import Post from '../components/Post.js'

class Base extends React.Component{
    state = {
        posts: []
    }

    componentDidMount(){
        axios.get('/api/posts')
        .then(res =>{
            if(res.data.Posts){
                this.setState({
                    posts:[...res.data.Posts]
                })
            }
        })
    }

    deletePost(id){
        axios.delete(`/api/posts/${id}`)
        .then((res)=>{
            res.data.Post
            ?this.setState({
                posts: [...this.state.posts.filter(post => post._id !== id)]
            })
            :console.log("There was an error handling post removal")
        })
    }
    render(){
        return(
            <div>
            {
                this.state.posts.length >= 1
                ?(this.state.posts.map((post, index) =>
                    <div className="preview-post" key={post._id}>
                        <PreviewPost  id={post._id} title_es={post.title} preview_bes={post.previewBody}/>
                        <button onClick={this.deletePost.bind(this, post._id)} >Delete {index}</button>
                        <button>Edit</button>
                    </div>
                ))
                :<p>No Posts Yet</p>
            }
            </div>
        )
    }
}

export default Base