import React from "react";
import { connect } from "react-redux";
import * as actions from "actions";
import requireAuth from "components/requireAuth" // here we are not importing them as named import

class CommentBox extends React.Component {
  state = {
    comment: "",
  };

  handleChange = (event) => {
    this.setState({ comment: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault(); //since the form isn html element it will try to submit
    this.props.saveComment(this.state.comment);
    this.setState({ comment: "" });
  };

  render() {
    console.log('props recieved inside comment box',this.props)
    return (
      <div> 
        <form onSubmit={this.handleSubmit}>
          <h4> Add a comment</h4>
          <textarea onChange={this.handleChange} value={this.state.comment} />
          <div>
            <button>Submit comment</button>
          </div>
        </form>
        <button className="fetch-comments" onClick={this.props.fetchComments}>
          Fetch Comments
        </button>
      </div>
    );
  }
}


export default connect(null, actions)(requireAuth(CommentBox)); //my guess - since we did not import actions using {}, 
//we do not need to specify actions inside {}, if so error comes

//-------------------------------------------------------------------------------------------------------------------
//Explanation
//Connect HOC takes in action as arguments and pass them as props to require Auth wrapper function and its our dev duty
//to pass down these props to comment box component.

//If there was no any wrapper function then connect HOC takes care of all by itself to pass the props to the 
//component
//-------------------------------------------------------------------------------------------------------------------
