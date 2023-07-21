import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

export interface Blog {
  id: number;
  title: string;
  content: string;
  pictures:[]
}

interface BlogState {
  blog: Blog[];
}

const initialState: BlogState = {
  blog: [],
};

export const fetchBlog = createAsyncThunk("blog/fetch", async (thunkAPI) => {
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
  "blog/add",
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
  name: "blog",
  initialState,
  reducers: {
    addBlog: (
      state,
      action: PayloadAction<{ title: string; content: string;pictures:[] }>
    ) => {
      state.blog.push({
        id: state.blog.length,
        title: action.payload.title,
        content: action.payload.content,
        pictures: action.payload.pictures,
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBlog.fulfilled, (state, action) => {
      state.blog = action.payload;
    });
    builder.addCase(saveBlog.fulfilled, (state, action) => {
      state.blog.push(action.payload);
    });
  },
});

export default BlogSlice.reducer;
export const { addBlog } = BlogSlice.actions;
