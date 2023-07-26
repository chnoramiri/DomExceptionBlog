import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface blogs {
  blogId: number;
  title: string;
  content: string;
  pictures: [];
}
export interface blogById {
  blogId: number;
  title: string;
  content: string;
  pictures: [];
}

interface BlogState {
  blogs: blogs[];
  blogById: blogById[];
}

const initialState = {
  blogs: [],
  blogById: [],
} as BlogState;

export const fetchBlogById = createAsyncThunk(
  "blogById/fetch",
  async ({ blogId }: { blogId: number }, thunkAPI) => {
    const response = await fetch(
      `https://domexception.azurewebsites.net/api/Blog/${blogId}`,
      {
        method: "GET",
      }
    );
    const data = response.json();
    return data;
  }
);

export const fetchBlogs = createAsyncThunk("blogs/fetch", async (thunkAPI) => {
  const response = await fetch(
    "https://domexception.azurewebsites.net/api/Blog",
    {
      method: "GET",
    }
  );
  const data = response.json();

  return data;
});

export const saveBlog = createAsyncThunk(
  "blogs/add",
  async (
    {
      title,
      content,
      pictures,
    }: { title: string; content: string; pictures: [] },
    thunkAPI
  ) => {
    const response = await fetch(
      "https://domexception.azurewebsites.net/api/Blog",
      {
        method: "POST",
        headers: { "content-type": "text/json" },
        body: JSON.stringify({ title, content, pictures }),
      }
    );

    const data = await response.json();
    return data;
  }
);

export const BlogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
   
  },
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
  },
});

export default BlogSlice.reducer;
