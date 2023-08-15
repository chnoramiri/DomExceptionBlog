import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface blogs {
  blogId: string;
  title: string;
  content: string;
}
// export interface blogById {
//   blogId: string;
//   title: string;
//   content: string;
// }

interface BlogState {
  blogs: blogs[];
  // blogById: blogById[];
  // isActionState: boolean,
  // status: string;
}

const initialState = {
  blogs: [],
  // blogById: [],
  // isActionState: false,
  // status: "idle",
} as BlogState;

const URL = "https://domexception.azurewebsites.net/api/Blog";

export const deleteBlog = createAsyncThunk(
  "blogs/delete",
  async ({ blogId }: { blogId: string }, thunkAPI) => {
    try {
      await fetch(`${URL}/${blogId}`, {
        method: "DELETE",
      });
      return { blogId };
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const editBlog = createAsyncThunk(
  "blogs/edit",
  async (
    {
      blogId,
      title,
      content,
    }: { blogId: string; title: string; content: string },
    thunkAPI
  ) => {
    const response = await fetch(`${URL}`, {
      method: "PUT",
      headers: { "content-type": "text/json" },
      body: JSON.stringify({ blogId, title, content }),
    });
    const data = await response.json();
    return data;
  }
);

export const fetchBlogById = createAsyncThunk(
  "blogs/fetch",
  async ({ blogId }: { blogId: string }, thunkAPI) => {
    const response = await fetch(`${URL}/${blogId}`, {
      method: "GET",
    });
    const data = response.json();
    return data;
  }
);

export const fetchBlogs = createAsyncThunk("blogs/fetch", async (thunkAPI) => {
  const response = await fetch(`${URL}`, {
    method: "GET",
  });
  const data = response.json();
  return data;
});

export const saveBlog = createAsyncThunk(
  "blogs/add",
  async ({ title, content }: { title: string; content: string }, thunkAPI) => {
    const response = await fetch(`${URL}`, {
      method: "POST",
      headers: { "content-type": "text/json" },
      body: JSON.stringify({ title, content }),
    });

    const data = await response.json();
    return data;
  }
);

export const BlogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    // isAction: (state) => {
    //   state.isActionState=true
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBlogs.fulfilled, (state, action) => {
      state.blogs = [...action.payload];
    });
    builder.addCase(saveBlog.fulfilled, (state, action) => {
      state.blogs.push(action.payload);
    });
    // builder.addCase(fetchBlogById.fulfilled, (state, action) => {
    //   state.blogs.push(action.payload);
    // });
    builder.addCase(editBlog.fulfilled, (state, action) => {
      state.blogs.push(action.payload);
    });
    builder.addCase(deleteBlog.fulfilled, (state, action) => {
      let index = state.blogs.findIndex(
        ({ blogId }) => blogId === action.payload?.blogId
      );
      state.blogs.splice(index, 1);
    });
  },
});
// export const {isAction}=BlogSlice.actions
export default BlogSlice.reducer;
