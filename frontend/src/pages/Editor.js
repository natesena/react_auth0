import React, { Component } from 'react';
import { EditorState } from 'draft-js';
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
  
    render() {
      const { editorState } = this.state;
      return (
          <div className="editor-container">
                <Editor
                // toolbarClassName="toolbar-class"
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={this.onEditorStateChange}
                />
          </div>
      )
    }
  }

export default ControlledEditor