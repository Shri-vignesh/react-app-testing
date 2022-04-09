import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxPromise from "redux-promise";
import reducers from "reducers";

export default ({ children, initialState = {} }) => {
  //advantage of destructuring --> if we do not pass initial value prop it will set to empty object by default(kind of optional prop)
  const composeEnhansers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    
  const store = createStore(
    reducers,
    initialState,
    composeEnhansers(applyMiddleware(reduxPromise))
  );

  return <Provider store={store}>{children}</Provider>;
};

//--------------------------------------------------------------------------------------------------------------------
//{createStore(reducers,{}) --> the second argument to the create store is nothing but an empty object which is nothing
//but an inital state. At first time when app boots up the state os gng to be empty.

//-------------------------------------------------------------------------------------------------------------------
//Any component that is amking use of root can optionally pass additional prop to the root component and hat prop will be'
//used to initialize the state within the redux store
//---------------------------------------------------------------------------------------------------------------------
//Here in this code ---> export default ({ children, initialState = {} }) => {...
//That means, here's a function with 2 arguments. If the initialState argument is undefined, give it a default value of {}
//---------------------------------------------------------------------------------------------------------------------
