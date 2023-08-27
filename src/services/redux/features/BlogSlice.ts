import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
  blogById: blogById;
  snackbarToggle: boolean;
  dialogToggle: boolean;
  snackbarMessage: string;
  loading: boolean;
  error: any;
}

const initialState = {
  blogs: [],
  blogById: <blogById>{},
  snackbarToggle: false,
  dialogToggle: false,
  snackbarMessage: "",
  loading: false,
  error: undefined,
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
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      var response = await fetch(`${URL}`, {
        method: "PUT",
        headers: { "content-type": "text/json" },
        body: JSON.stringify({ blogId, title, content }),
      });
      const data = await response.json();
      if (data.status !== 200) {
        return rejectWithValue(data.detail);
      }
      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchBlogById = createAsyncThunk(
  "blogs/fetchById",
  async (
    { blogId }: { blogId: string | undefined },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const response = await fetch(`${URL}/${blogId}`, {
        method: "GET",
      });

      const data = await response.json();
      // if (data.status !== 200) {
      //   return rejectWithValue(data.detail);
      // }
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);

export const fetchBlogs = createAsyncThunk(
  "blogs/fetch",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await fetch(`${URL}`, {
        method: "GET",
      });
      const data = await response.json();
      // if (data.status !== 200) {
      //   return rejectWithValue(data.detail);
      // }
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);

export const saveBlog = createAsyncThunk(
  "blogs/add",
  async (
    { title, content }: { title: string; content: string },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      // debugger
      const response = await fetch(`${URL}`, {
        method: "POST",
        headers: { "content-type": "text/json" },
        body: JSON.stringify({ title, content }),
      });
      const data = await response.json();
    
      if (data.status !== 200) {
        return rejectWithValue(data.detail);
      }
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue({ error: error.response.data});
    }
  }
);

export const BlogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = "";
    },
    setSnackbarToggle: (state) => {
      state.snackbarToggle = !state.snackbarToggle;
    },
    setDialogToggle: (state) => {
      state.dialogToggle = !state.dialogToggle;
    },
    setSnackbarMessage: (state, action) => {
      state.snackbarMessage = action.payload;
    },
  },

  ////////////////////////////FetchBlogs//////////////////////////
  extraReducers: (builder) => {
    builder.addCase(fetchBlogs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBlogs.fulfilled, (state, action) => {
      // console.log(action)
      state.blogs = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchBlogs.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.blogs = [];
    });

    ////////////////////////////SaveBlog//////////////////////////
    builder.addCase(saveBlog.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(saveBlog.fulfilled, (state, action) => {
      state.blogs.push(action.payload);
      state.loading = false;
    });
    builder.addCase(saveBlog.rejected, (state, action) => {
      console.log(action.payload)
      state.error = action.payload;
      state.loading = false;
      state.blogs = [];
    });

    ////////////////////////////FetchBlogById//////////////////////////
    builder.addCase(fetchBlogById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBlogById.fulfilled, (state, action) => {
      state.blogById = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchBlogById.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.blogs = [];
    });
    ////////////////////////////EditBlog//////////////////////////
    builder.addCase(editBlog.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editBlog.fulfilled, (state, action) => {
      state.blogs.push(action.payload);
      state.loading = false;
      state.error = "";
    });
    builder.addCase(editBlog.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.blogs = [];
    });

    ////////////////////////////DeleteBlog//////////////////////////
    builder.addCase(deleteBlog.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteBlog.fulfilled, (state, action) => {
      let index = state.blogs.findIndex(
        ({ blogId }) => blogId === action.payload?.blogId
      );
      state.blogs.splice(index, 1);
      state.loading = false;
    });
    builder.addCase(deleteBlog.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.blogs = [];
    });
  },
});
export const {
  setSnackbarToggle,
  setDialogToggle,
  setSnackbarMessage,
  reset,
} = BlogSlice.actions;
export default BlogSlice.reducer;
