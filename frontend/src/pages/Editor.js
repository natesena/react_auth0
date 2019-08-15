import React, { Component } from 'react';
import axios from 'axios';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class ControlledEditor extends Component {
    constructor(props) {
      super(props);
      this.state = {
        editorState: EditorState.createEmpty(),
      };
    }
  
    onEditorStateChange: Function = (editorState) => {
      this.setState({
        editorState,
      });
    };

    savePost: Function = () => {
      let contentState = this.state.editorState.getCurrentContent()
      let persistableData = JSON.stringify(convertToRaw(contentState))
      axios.post('/api/Posts', persistableData)
      .then((res)=>{
        console.log(res)
        if(res.data.newpost){
          console.log('successfully saved to DB')
        }
      })
    }
  
    render() {
      const { editorState } = this.state;
      return (
        <div>
          <div className="editor-container">
                <Editor
                // toolbarClassName="toolbar-class"
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={this.onEditorStateChange}
                />
          </div>
          <div>
            <button className='editor-action-button' onClick={this.savePost()}>Save</button>
          </div>
        </div>
      )
    }
  }

export default ControlledEditor