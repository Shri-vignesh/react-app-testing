import React from 'react'
import{shallow} from 'enzyme'
import App from "components/App"
import CommentBox from "components/commentBox"
import CommentList from "components/CommentList" //these kind of imports are called abstract imports
import "../../setupTests"


let wrapped;

beforeEach(() => {
  wrapped = shallow(<App />)
})

it('shows a comment box', () => {
  // const div= document.createElement('div')
  // ReactDOM.render(<App />, div)
  // expect(div.innerHTML).toContain('Comment Box')
  // ReactDOM.unmountComponentAtNode(div)

  //find is gng to return a array of commentbox instances found within App
  expect(wrapped.find(CommentBox).length).toEqual(1);

})

it('shows a comment list', () => {
  expect(wrapped.find(CommentList).length).toEqual(1);
})

//-----------------------------------------------------------------------------------------------------
//it is basically a global function so we dont need to import it
//-----------------------------------------------------------------------------------------------------
//Jest will always run only in the terminal(Command line environment) but at the same time react will
// also run only in the browser.So to solve this issue 'creat-react-app' automatically installs a
//dependency called as "JSDOM". JSDOM simulates how the browser works. It fools/tricks out the react lib
// that there is a browser that react is working with.

//const div= document.createElement('div') --> So basically we are not creating <div> inside the browser, 
//instead we make use of the JSODM lib to create this fake div inside the memory of the terminal. document is an
//object that soley resides inside the browser whcih is JSDOM in this case.

// ReactDOM.unmountComponentAtNode(div)  --> Its kind of clean up code after the test run to remove the
//component from the div. Its good practise to do to avoid any performance issues. If not doing it the 
//component will be seen just hanging there.

//------------------------------------------------------------------------------------------------------
//expect(div.innerHTML).toContain('Comment Box') --> This is a bad way to test because here from one component
//we are trying to access the inner working of the other component. Later part if we are changing the
//contents of comment box app.test.js file will fail whcih is logically a great headache and so its good
//to test of the comment box and comment list just exist and not go deep into what is being rendered inside
//them as much as possible.

//------------------------------------------------------------------------------------------------------
//Enzyme ---> lib made ny airbnb
//While installing enzyme --> npm install --save enzyme enzyme-adapter-react-{version of react number}
//so it may be npm install --save enzyme enzyme-adapter-react-16 OR npm install --save enzyme enzyme-adapter-react-17

//----------------------------------------------------------------------------------------------------
//Enzyme API provides three diff render functions ( all three returns a object)
//1.static - renders the given component and returns a object that contains a plain HTML. We cannot interact
//with the generates HTML. We cannot simulate any click or enter text.
//2.Shallow - Renders *just* the given component and none of its children.
//3. Full DOM - renders the component and all of its children + let us modify it afterwards. It returns
//back objects for interactions like we can do click event or enter text etc

//------------------------------------------------------------------------------------------------------
//why we use 'let wrappped' instead of 'const wrapped'?
//The reason is we cant to re-assign the vale to wrapped several times throught the files, so first when we declare this
//variable we are saying we do not know what we are going to assign to this variable so we use 'let' keyword