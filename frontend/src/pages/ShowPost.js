import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw } from "draft-js";
import { Auth0Context } from "../react-auth0-wrapper";

class ShowPost extends React.Component {
  //below line sets the context for the component
  static contextType = Auth0Context;
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
        editorState: newEditorState,
        id: id
      });
    });
  }

  render() {
    const { user } = this.context;
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
            {user && user["http://www.nateapp.comroles"].includes("admin") && (
              <div>
                <Link to={`/posts/${this.state.id}/edit`}>
                  <div>edit me</div>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <p>loading</p>
        )}
      </div>
    );
  }
}

export default ShowPost;
