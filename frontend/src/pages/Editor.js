import React, { Component } from "react";
// import { Redirect} from 'react-router-dom'
import axios from "axios";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
// import { useAuth0 } from "../react-auth0-wrapper";
import { Auth0Context } from "../react-auth0-wrapper";

class ControlledEditor extends Component {
  static contextType = Auth0Context;

  constructor(props) {
    super(props);
    this.state = {
      savedPostID: false,
      previewEditorState: EditorState.createEmpty(),
      titleEditorState: EditorState.createEmpty(),
      editorState: EditorState.createEmpty()
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      axios.get(`/api/posts/${id}`).then(res => {
        let previousTitleEditorState = EditorState.createWithContent(
          convertFromRaw(JSON.parse(res.data.Post.title))
        );
        let previousPreviewEditorState = EditorState.createWithContent(
          convertFromRaw(JSON.parse(res.data.Post.previewBody))
        );
        let previousEditorState = EditorState.createWithContent(
          convertFromRaw(JSON.parse(res.data.Post.body))
        );

        this.setState({
          previewEditorState: previousPreviewEditorState,
          titleEditorState: previousTitleEditorState,
          editorState: previousEditorState
        });
      });
    }
  }

  onEditorStateChange: Function = editorState => {
    // Need to make this know what editor we are working with
    this.setState({
      editorState
    });
  };

  onTitleEditorStateChange: Function = titleEditorState => {
    // Need to make this know what editor we are working with
    this.setState({
      titleEditorState
    });
  };
  onPreviewEditorStateChange: Function = previewEditorState => {
    // Need to make this know what editor we are working with
    this.setState({
      previewEditorState
    });
  };

  //const { isAuthenticated, loginWithRedirect, logout } = this.context;
  savePost() {
    let titleData = JSON.stringify(
      convertToRaw(this.state.titleEditorState.getCurrentContent())
    );
    let previewData = JSON.stringify(
      convertToRaw(this.state.previewEditorState.getCurrentContent())
    );
    let bodyData = JSON.stringify(
      convertToRaw(this.state.editorState.getCurrentContent())
    );

    const { id } = this.props.match.params;
    if (id) {
      console.log("post id: ", id);
    } else {
      console.log("new post to be submitted");
    }

    const { getTokenSilently } = this.context;

    (async () => {
      await getTokenSilently()
        .then(token => {
          console.log(`got a ${token.length} character long token: ${token}`);
          id
            ? //edit post
              axios
                .patch(
                  `/api/Posts/${id}`,
                  {
                    title: titleData,
                    previewBody: previewData,
                    body: bodyData
                  },
                  {
                    headers: { Authorization: "Bearer " + token }
                  }
                )
                .then(res => {
                  if (res.data.updatedPost) {
                    console.log("successfully edited and saved to DB");
                    this.setState({
                      savedPostID: res.data.updatedPost._id
                    });
                  }
                })
                .catch(e => {
                  console.log(`ERROR: Patch request failure: ${e}`);
                })
            : //save as new post
              axios
                .post(
                  "/api/Posts",
                  {
                    //data argument
                    title: titleData,
                    previewBody: previewData,
                    body: bodyData
                  },
                  {
                    //presume this is a header
                    headers: { Authorization: "Bearer " + token }
                  }
                )
                .then(res => {
                  console.log("res: ", res);
                  if (res.data.message) {
                    console.log(`message: ${res.data.message}`);
                  }
                  if (res.data.user) {
                    console.log("user", res.data.user);
                  }
                  if (res.data.newpost) {
                    console.log("successfully saved to DB");
                    this.setState({
                      savedPostID: res.data.newpost._id
                    });
                  }
                })
                .catch(e => {
                  console.log(`error trying to post new post: ${e}`);
                });
        })
        .catch(err => {
          alert("Error trying to get post token");
          console.log(
            `we got an error trying to get a token to submit: ${err}`
          );
        });
    })();
  }

  render() {
    const { editorState, previewEditorState, titleEditorState } = this.state;
    return (
      <div className="body-liner">
        {
          // !this.state.savedPostID
          // ? (
          <div className="post-creation-container">
            <div className="title-editor-container">
              <h1>Title</h1>
              <Editor
                editorState={titleEditorState}
                onEditorStateChange={this.onTitleEditorStateChange}
              />
            </div>
            <div className="preview-editor-container">
              <h1>Preview Body</h1>
              <Editor
                editorState={previewEditorState}
                onEditorStateChange={this.onPreviewEditorStateChange}
              />
            </div>
            <div className="editor-container">
              <h1>Body</h1>
              <Editor
                editorState={editorState}
                onEditorStateChange={this.onEditorStateChange}
              />
            </div>
            <div className="editor-actions-container">
              <button
                className="editor-action-button"
                onClick={this.savePost.bind(this)}
              >
                Save
              </button>
            </div>
          </div>
          // )
          // : <Redirect to={`/posts/${this.state.savedPostID}`}/>
        }
      </div>
    );
  }
}

export default ControlledEditor;
