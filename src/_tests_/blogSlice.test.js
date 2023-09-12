import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { fetchBlogs } from "../services/redux/features/BlogSlice";

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

});
