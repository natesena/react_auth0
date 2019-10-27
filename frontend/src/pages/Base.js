import React, { Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PreviewPost from "../components/PreviewPost.js";
import { Auth0Context } from "../react-auth0-wrapper";
// import Post from '../components/Post.js'

class Base extends React.Component {
  static contextType = Auth0Context;

  state = {
    posts: []
  };

  componentDidMount() {
    console.log("fetching posts");
    axios
      .get("/api/posts")
      .then(res => {
        console.log("res: ", res);
        if (res.data.Posts) {
          console.log("# posts", res.data.Posts.length);
          this.setState({
            posts: [...res.data.Posts]
          });
        } else {
          console.log("no posts");
        }
      })
      .catch(e => {
        console.log("Error fetching posts: ", e);
      });
  }

  deletePost(id) {
    const { getTokenSilently } = this.context;
    (async () => {
      await getTokenSilently()
        .then(token => {
          axios
            .delete(`/api/posts/${id}`, {
              headers: { Authorization: "Bearer " + token }
            })
            .then(res => {
              res.data.Post
                ? this.setState({
                    posts: [...this.state.posts.filter(post => post._id !== id)]
                  })
                : (function() {
                    if (res.data.message) {
                      console.log(res.data.message);
                    } else {
                      console.log("There was an error handling post removal");
                    }
                  })();
            });
        })
        .catch(e => {
          console.log("ERROR: No token was received, user must log in");
        });
    })();
  }
  render() {
    const { user } = this.context;
    return (
      <div className={this.state.posts.length > 0 ? "body-liner" : ""}>
        {this.state.posts.length >= 1 ? (
          <div>
            <h1>Posts</h1>
            {this.state.posts.map(post => (
              <div className="preview-post" key={post._id}>
                <PreviewPost
                  id={post._id}
                  title_es={post.title}
                  preview_bes={post.previewBody}
                />
                <div className={"preview-post-buttons-container"}>
                  {user &&
                    user["http://www.nateapp.comroles"].includes("admin") && (
                      <Fragment>
                        <button
                          className={"preview-post-button"}
                          onClick={this.deletePost.bind(this, post._id)}
                        >
                          Delete
                        </button>
                        <Link
                          className={"preview-post-button"}
                          to={`/posts/${post._id}/edit`}
                        >
                          Edit
                        </Link>
                      </Fragment>
                    )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={"loading-spinner-fullscreen"}>
            <div className="lds-dual-ring"></div>
          </div>
        )}
      </div>
    );
  }
}

export default Base;
