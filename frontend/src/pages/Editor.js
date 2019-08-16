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

    savePost(){
      let contentState = this.state.editorState.getCurrentContent()
      let persistableData = convertToRaw(contentState)
      let JSONpersistableData = JSON.stringify(persistableData)
      console.log('persistableData: ', persistableData)
      console.log('JSONpersistableData: ', JSONpersistableData)
      axios.post('/api/Posts', {body: JSONpersistableData})
      .then((res)=>{
        console.log('post res: ', res)
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
            <button className='editor-action-button' onClick={this.savePost.bind(this)}>Save</button>
          </div>
        </div>
      )
    }
  }

export default ControlledEditor