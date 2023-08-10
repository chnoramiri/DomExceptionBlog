import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface blogs {
  blogId: string;
  title: string;
  content: string;
  
}
export interface blogById {
  blogId: string;
  title: string;
  content: string;
  
}

interface BlogState {
  blogs: blogs[];
  blogById: blogById[];
}

const initialState = {
  blogs: [],
  blogById: [],
} as BlogState;

const URL = "https://domexception.azurewebsites.net/api/Blog";

export const deleteBlog = createAsyncThunk(
  "blogById/delete",
  async ({ blogId }: { blogId: string }) => {
    const response = await fetch(`${URL}/${blogId}`, {
      method: "DELETE",
    });
    const data = response.json();
    return data;
  }
);

export const editBlog = createAsyncThunk(
  "blogById/edit",
  async (
    {
      blogId,
      title,
      content,
    
    }: { blogId:string; title: string; content: string },
    thunkAPI
  ) => {
    const response = await fetch(`${URL}`, {
      method: "PUT",
      headers: { "content-type": "text/json" },
      body: JSON.stringify({ blogId,title, content }),
    });

    const data = await response.json();
    return data;
  }
);

export const fetchBlogById = createAsyncThunk(
  "blogById/fetch",
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
  async (
    {
      title,
      content,
      
    }: { title: string; content: string;  },
    thunkAPI
  ) => {
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBlogs.fulfilled, (state, action) => {
      state.blogs = action.payload;
    });
    builder.addCase(saveBlog.fulfilled, (state, action) => {
      state.blogs.push(action.payload);
    });
    builder.addCase(fetchBlogById.fulfilled, (state, action) => {
      state.blogById.push(action.payload);
    });
    builder.addCase(editBlog.fulfilled, (state, action) => {
      state.blogById.push(action.payload);
    });
    builder.addCase(deleteBlog.fulfilled, (state, action) => {
      state.blogById.push(action.payload);
    });
  },
});

export default BlogSlice.reducer;
