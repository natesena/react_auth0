import React from "react";
import axios from "axios";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw } from "draft-js";

class ShowPost extends React.Component {
  state = {
    titleEditorState: EditorState.createEmpty(),
    editorState: EditorState.createEmpty()
  };
  componentDidMount() {
    const { id } = this.props.match.params;
    axios.get(`/api/posts/${id}`).then(res => {
      let newTitleEditorState = EditorState.createWithContent(
        convertFromRaw(JSON.parse(res.data.Post.title))
      );
      let newEditorState = EditorState.createWithContent(
        convertFromRaw(JSON.parse(res.data.Post.body))
      );
      this.setState({
        titleEditorState: newTitleEditorState,
        editorState: newEditorState
      });
    });
  }

  render() {
    return (
      <div className={"post-content-container"}>
        {this.state.titleEditorState && this.state.editorState ? (
          <div class="post-show">
            <div className={"post-title"}>
              <Editor
                toolbarHidden={true}
                editorState={this.state.titleEditorState}
                readOnly
              />
            </div>
            <div className={"post-body"}>
              <Editor
                toolbarHidden={true}
                editorState={this.state.editorState}
                readOnly
              />
            </div>
          </div>
        ) : (
          <p>loading</p>
        )}
      </div>
    );
  }
}

export default ShowPost;
