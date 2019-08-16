import React from 'react'
import axios from 'axios'
//Should uninstall below
// import {stateToHTML} from 'draft-js-export-html';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw } from 'draft-js';

class ShowPost extends React.Component{
    state={
        editorState: EditorState.createEmpty()
    }
    componentDidMount(){
        const { id } = this.props.match.params
        axios.get(`/api/posts/${id}`)
        .then((res)=>{
            // console.log('res.data.Post: ', res.data.Post)
            // let aBody = res.data.Post.body
            // console.log('aBody: ', aBody)
            // console.log('typeof aBody: ', typeof(aBody))
            //convertFromRaw rawState => ContentState
            // let aContentState = convertFromRaw(JSON.parse(res.data.Post.body))
            //EditorState.createWithContent => returns editor state
            let newEditorState = EditorState.createWithContent(convertFromRaw(JSON.parse(res.data.Post.body)))
            this.setState({
                editorState: newEditorState
            })
        })
    }

// let html = stateToHTML(contentState);
    render(){
        return(
            <div>
                {
                    this.state.editorState
                    ? <Editor 
                        toolbarHidden={true}
                        editorState={this.state.editorState} 
                        readOnly
                    />
                    : <p>loading</p>
                }
            </div>
        )
    }
}

export default ShowPost