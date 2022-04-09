import { saveComment } from "actions";
import { SAVE_COMMENT } from "actions/types";

describe("save comment", () => {
  it("has a correct type", () => {
    const action = saveComment();

    expect(action.type).toEqual(SAVE_COMMENT);
  });

  it("has a correct payload", () => {
    const action = saveComment("new comment");

    expect(action.payload).toEqual("new comment");
  });
});

//-----------------------------------------------------------------------------------------------------------------------
//Unit Tests ---> Tests only one thing at a time
//Integration Tests ---> Tests million things at a time including unit tests
//-----------------------------------------------------------------------------------------------------------------------