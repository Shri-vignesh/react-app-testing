import React from "react";
import { mount } from "enzyme";
import Root from "Root";
import CommentList from "components/CommentList";

let wrapped;

beforeEach(() => {
  const initialState = {
    comments : ['comment 1', 'comment 2']
  }

  wrapped = mount(
    <Root initialState={initialState}>
      <CommentList />
    </Root>
  );
});

it("creates one LI per comment", () => {
  expect(wrapped.find('li').length).toEqual(2)
});

it('shows the text for each component', () => {
  expect(wrapped.render().text()).toContain('comment 1')
  expect(wrapped.render().text()).toContain('comment 1')
})

//----------------------------------------------------------------------------------------------------------------------
//Here the comment list makes use of the real time data from the redux state, so i=we cannot mock the data like in other
//test file
// we cannot do something like  <CommentList comments={['sdfasdf'],['rtetyertye']}/>, because at initial rendering of
//component comments state will be an empty one and so by giving these values it will override it.

//The way to get the data in store is that the comment box should dispatch an action (submit button click), which
//we actually do not want to do.

//We somehow need data inside the redux store so that in can be shared with commment list test case

//-------------------------------------------------------------------------------------------------------------------
//wrapped.render() --> this will return a cheerio wrapper which inturn on calling the text methods returns all the text
//rendered by our component.
