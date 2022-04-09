import React from "react";
import { mount, ReactWrapper } from "enzyme";
import moxios from "moxios";
import Root from "Root";
import App from "components/App";

beforeEach(() => {
  moxios.install(); //this will trun off any api requests made by axios
  moxios.stubRequest("http://jsonplaceholder.typicode.com/comments", {
    status: 200,
    response: [{ name: "fetched #1" }, { name: "fetched #2" }],
  });
});

afterEach(() => {
  moxios.uninstall();
});

it("can fetch a list of comments and display them", (done) => {
  //STEP 1: Attempt to render the entire App
  const wrapped = mount(
    <Root>
      <App />
    </Root>
  );

  //STEP2 : Find the 'fetchComments' button and click it
  wrapped.find(".fetch-comments").simulate("click");

  //STEP 3: Expect to find a list of comments!

  //introduce a little pause, we dont know the time limit so we go for moxio.wait instead of setTimeout
  moxios.wait(() => {
    wrapped.update();
    expect(wrapped.find("li").length).toEqual(2);

    done();
    wrapped.unmount();
  })
  
});

//------------------------------------------------------------------------------------------------------------------
// wrapped.find('.fetch-comments').simulate('click')
// expect(wrapped.find('li').length).toEqual(500)

//After writing the above lines of code one can notice the test getting failed is because the axios request gets failed.
//axios cannot make any api calls from command line env (JS DOM). It will work only from real browsers not from fake
//browsers. To over come this issue we make use of "moxios" (mock axios)
//------------------------------------------------------------------------------------------------------------------
//moxios
//moxios is goign to trick axios in such a way that whenever any api call is triggered, mxios is going to block them
//and going to provide them success 200 response and data making axios to believe thay have got response from API

//-----------------------------------------------------------------------------------------------------------------
//Why setITimeout or moxios.await function
//When the request is triggered, it takes sometime for the moxios to  say ot has got the response but well before that
//we are checking for the content of two 'li's and it will lead to test failure so in order to avoid that and to make
//test to wait for sometime we use setTimeout()

//-----------------------------------------------------------------------------------------------------------------
//Why 'done' callback function?
//Whenever Jest executes the test it does not know about setTimeOut() and it just executes line by line and it says test
//has failed or passed without doing any wait time.

//My understanding -->In order to say jest to hold one for second we come up with this call back function. Jest will not 
//assume the test is over untill it sees or developer invokes this fucntion, by the time Jest waits to see where this
//done() has been called the setTimeout would say I am done and jest will execute the code inside the setimeout and
//after seeing done() inside it it will wrap up the test case

//-------------------------------------------------------------------------------------------------------------------
