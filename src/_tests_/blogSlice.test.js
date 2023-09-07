import BlogSlice, { initialState } from "../services/redux/features/BlogSlice";

describe("tests for ListSlice", () => {
  test("initialize slice with initialValue", () => {
    const blogSliceInit = BlogSlice(initialState, { type: "unknown" });
    expect(blogSliceInit).toBe(initialState);
  });
});