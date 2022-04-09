import React from "react";
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';

export default (ChildComponent) => {
  class ComposedComponent extends React.Component {
    componentDidMount() {
      this.shouldComponentNavigateAway();
    }

    //when we recieve new set of props this method gets called
    componentDidUpdate() {
      this.shouldComponentNavigateAway();
    }

    shouldComponentNavigateAway() {
      if (!this.props.auth) {
        //we cannot use history anymore with latest version of react-router-dom so use useNavigate
        //this.props.history.push('/')

        //Wrapping setTimeout(() => ) around this.props.navigate seems to have dispensed with the UseEffect warning.
        //Why? Does props.navigate need to wait until the child components are mounted or updated?
        setTimeout(() => this.props.navigate("/", { replace: true }));
      }
    }

    render() {
      console.log("props recieved inside auth hoc", this.props);
      return <ChildComponent {...this.props} />;
    }
  }


  function mapStateToProps(state) {
    return { auth: state.auth };
  }

  //In react-router v6 there is no withRouter nor useHistory. I would recommend to refactor your component to use hooks
  //for the sake of simplicity, but an alternative solution is to create a wrapper component that will pass the navigate
  //function obtained from the hook as a prop:
  // Add function bring in useNavigate
  function WithNavigate(props) {
    let navigate = useNavigate();
    return <ComposedComponent {...props} navigate = {navigate} />;
  }

  return connect(mapStateToProps)(WithNavigate);// the props from the connect hoc of the comment boc component gets passed
  //on to the With Navigate function which in turn recieves them and passes them as props to composeComponent
};
