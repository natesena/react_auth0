import React from 'react'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw } from 'draft-js';

//Posts Render Differently based on whether the user is viewing a single post or multiple posts
class PreviewPost extends React.Component {
    
    state={
        titleEditorState: null,
        previewEditorState: null
    }

    componentDidMount(){
        console.log(this.props.preview_bes)
        let newTitleEditorState = EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.title_es)))
        let newPreviewEditorState = EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.preview_bes)))
        this.setState({
            titleEditorState: newTitleEditorState,
            previewEditorState: newPreviewEditorState
        })
    }
    render(){
        return (
            <div>
                    {
                        this.state.titleEditorState && this.state.previewEditorState 
                        ? (
                            <div>
                                <Editor 
                                    toolbarHidden={true}
                                    editorState={this.state.titleEditorState} 
                                    readOnly
                                />
                                <Editor 
                                    toolbarHidden={true}
                                    editorState={this.state.previewEditorState} 
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

export default PreviewPost
