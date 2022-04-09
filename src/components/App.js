import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import { connect } from "react-redux";
import { changeAuth } from "actions/index";
import CommentBox from "components/commentBox";
import CommentList from "components/CommentList";

class App extends React.Component {
  renderButton = () => {
    if (this.props.auth) {
      return (
        <button onClick={() => this.props.changeAuth(false)}>Sign Out</button>
      );
    } else {
      return (
        <button onClick={() => this.props.changeAuth(true)}>Sign In</button>
      );
    }
  };

  renderHeader = () => {
    return (
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/post">Post</Link>
        </li>
        <li>{this.renderButton()}</li>
      </ul>
    );
  };

  render() {
    return (
      <div>
        {this.renderHeader()}
        <Routes>
          <Route path="/post" exact element={<CommentBox />} />
          <Route path="/" exact element={<CommentList />} />
        </Routes>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, { changeAuth })(App);

//------------------------------------------------------------------------------------------------------------
//When we run 'create-react-app' we install couple of dependencies along with other dependencies as well
//1. React --> Raect lib
//2. Webpack --> Links JS files together
//3. Babel --> Converts Es2015/6/7 to ES5 code
//4. Jest --> Automates test runner whcih gets initiated when we run npm run test and will look for files
//with the extension '.test.js' or '.spec.js' or it will run all the files listed under '__tests__' folder.
