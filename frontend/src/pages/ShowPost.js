import React from 'react'
import axios from 'axios'
//Should uninstall below
// import {stateToHTML} from 'draft-js-export-html';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw } from 'draft-js';

class ShowPost extends React.Component{
    state={
        titleEditorState: EditorState.createEmpty(),
        editorState: EditorState.createEmpty()
    }
    componentDidMount(){
        const { id } = this.props.match.params
        axios.get(`/api/posts/${id}`)
        .then((res)=>{
            let newTitleEditorState = EditorState.createWithContent(convertFromRaw(JSON.parse(res.data.Post.title)))
            let newEditorState = EditorState.createWithContent(convertFromRaw(JSON.parse(res.data.Post.body)))
            this.setState({
                titleEditorState: newTitleEditorState,
                editorState: newEditorState
            })
        })
    }

    render(){
        return(
            <div>
                {
                    this.state.titleEditorState && this.state.editorState 
                    ? (
                        <div>
                            <Editor 
                                toolbarHidden={true}
                                editorState={this.state.titleEditorState} 
                                readOnly
                            />
                            <Editor 
                                toolbarHidden={true}
                                editorState={this.state.editorState} 
                                readOnly
                            />
                        </div>
                    )
                    : <p>loading</p>
                }
            </div>
        )
    }
}

export default ShowPost