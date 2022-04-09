import React from "react";
import { mount } from "enzyme";
import CommentBox from "components/commentBox";
import Root from "Root";
//One of the worst way to set up store to avoid test failure, we cannot import all three things in all test files
// import { Provider } from "react-redux";
// import { createStore } from "redux";
// import reducers from "reducers";

let wrapped;

beforeEach(() => {
  //One of the worst way to set up store to avoid test failure
  // wrapped = mount(
  //   <Provider store={createStore(reducers, {})}>
  //     <CommentBox />
  //   </Provider>
  // );
  wrapped = mount(
    <Root>
      <CommentBox />
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

it("has textarea and two buttons", () => {
  expect(wrapped.find("textarea").length).toEqual(1);
  expect(wrapped.find("button").length).toEqual(2);
});

describe("the text area", () => {
  beforeEach(() => {
    wrapped.find("textarea").simulate("change", {
      target: { value: "new comment" },
    });

    //after the above line of code we cannot right way write the line of code for setState because, in react world
    //setState does not happen right away, it just queues up and runs the setState in future. So instead of we waiting
    //for the re -render to happen we are forcing the re-render to happen o we do wrapped.update()

    wrapped.update();
  });

  it("has a textarea that users can type in", () => {
    expect(wrapped.find("textarea").prop("value")).toEqual("new comment");
  });

  it("When form gets submitted, text area gets emptied", () => {
    //the below commented line of click event on button wont work becasue enzyme wil look for JSX button tag to check if there is
    //any event handler written fot that but in case we have onSubmit written in form JSX tag
    // expect(wrapped.find('button').simulate('click'))

    wrapped.find("form").simulate("submit"); // when we si ulate thte event we use normal html name of the event

    wrapped.update();
    expect(wrapped.find("textarea").prop("value")).toEqual("");
  });
});

//--------------------------------------------------------------------------------------------------------------------
//find() method not only finds any instances of a component but also finds the html element
//---------------------------------------------------------------------------------------------------------------------
//unlike shallow or static rendering, full rendering actually mounts the component in the DOM, which means that tests
//can affect each other if they are all using the same DOM. Keep that in mind while writing your tests and, if necessary,
//use .unmount() or something similar as cleanup.
//---------------------------------------------------------------------------------------------------------------------
// STEPS that one can follow for text area test case
//1. Find a text area element
//2. Simulate a 'change' event
//3. Provide a fake event object
//4. Force the component to update
//5. Assert that the text area value has been changed
//---------------------------------------------------------------------------------------------------------------------
//expect(wrapped.find('textarea').simulate('change')) ---> here we should not give the name as 'onChange' since its
//the name associated to the react event handler and we should try to use those related to the html.

//the second argument that we need to pass is the event object associated with that change
//---------------------------------------------------------------------------------------------------------------------
//asynchronous --> sometime in the future not right away
//setState is an asynchronous approach
//---------------------------------------------------------------------------------------------------------------------
