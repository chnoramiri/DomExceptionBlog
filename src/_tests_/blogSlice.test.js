import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  deleteBlog,
  editBlog,
  fetchBlogs,
  saveBlog,
} from "../services/redux/features/BlogSlice";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("blogs async actions", () => {
  it("should fetch blogs and dispatch the fulfilled action", async () => {
    const store = mockStore({});

    const mockResponse = [
      {
        blogId: 1,
        title: "new blog",
        content: "this is a content for new blog",
      },
    ];

    global.fetch = jest.fn().mockResolvedValue({
      json: async () => mockResponse,
      ok: true,
      status: 200,
    });

    // Dispatch the fetchBlogs action creator
    await store.dispatch(fetchBlogs());

    const actions = store.getActions(); // Get dispatched actions from the mock store

    expect(actions[0].type).toEqual(fetchBlogs.pending.type);

    expect(actions[1].type).toEqual(fetchBlogs.fulfilled.type);
    expect(actions[1].payload).toEqual(mockResponse);

    expect(global.fetch).toHaveBeenCalledWith(
      "https://domexception.azurewebsites.net/api/Blog",
      {
        method: "GET",
      }
    );
  });

  it("should POST data and dispatch the fulfilled action", async () => {
    const store = mockStore({});
    const mockBlog = {
      title: "New Blog",
      content: "This is a new blog content",
    };
    const mockResponse = {
      message: "Blog successfully added.",
      status: "OK",
    };

    global.fetch = jest.fn().mockResolvedValue({
      json: async () => mockResponse,
      ok: true,
      status: 200,
    });

    await store.dispatch(saveBlog(mockBlog));

    const actions = store.getActions();
    expect(actions[0].type).toEqual(saveBlog.pending.type);
    expect(actions[1].type).toEqual(saveBlog.fulfilled.type);
    expect(actions[1].payload).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://domexception.azurewebsites.net/api/Blog",
      {
        method: "POST",
        headers: { "content-type": "text/json" },
        body: JSON.stringify(mockBlog),
      }
    );
  });

  it("should edit a blog and dispatch the fulfilled action", async () => {
    const store = mockStore({});

    const mockRequestData = {
      // blogId: 1,
      title: "updated blog title",
      content: "updated content for the blog",
    };

    const mockResponse = {
      message: "Blog successfully updated.",
      status: "OK",
    };

    global.fetch = jest.fn().mockResolvedValue({
      json: async () => mockResponse,
      ok: true,
      status: 200,
    });

    // Dispatch the editBlog action creator with the mock request data
    await store.dispatch(editBlog(mockRequestData));

    const actions = store.getActions(); // Get dispatched actions from the mock store

    expect(actions[0].type).toEqual(editBlog.pending.type);

    // After the asynchronous operation is complete, expect the fulfilled action
    expect(actions[1].type).toEqual(editBlog.fulfilled.type);
    expect(actions[1].payload).toEqual(mockResponse);

    expect(global.fetch).toHaveBeenCalledWith(
      `https://domexception.azurewebsites.net/api/Blog`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: mockRequestData.title,
          content: mockRequestData.content,
        }),
      }
    );
  });

  it("should delete a blog and dispatch the fulfilled action", async () => {
    const store = mockStore({});

    const mockBlogId = 1;

    const mockResponse = {
      message: "Blog successfully deleted.",
      status: "OK",
    };

    global.fetch = jest.fn().mockResolvedValue({
      json: async () => mockResponse,
      ok: true,
      status: 200,
    });

    // Dispatch the deleteBlog action creator with the mock blog ID
    await store.dispatch(deleteBlog({ blogId: mockBlogId }));

    const actions = store.getActions(); // Get dispatched actions from the mock store

    expect(actions[0].type).toEqual(deleteBlog.pending.type);

    expect(actions[1].type).toEqual(deleteBlog.fulfilled.type);
    expect(actions[1].payload).toEqual({ blogId: mockBlogId });

    expect(global.fetch).toHaveBeenCalledWith(
      `https://domexception.azurewebsites.net/api/Blog/${mockBlogId}`,
      {
        method: "DELETE",
      }
    );
  });
});
