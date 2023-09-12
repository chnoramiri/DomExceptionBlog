import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Blog {
  blogId: string;
  title: string;
  content: string;
}

interface BlogState {
  blogs: Blog[];
  blogById: Blog;
  snackbarToggle: boolean;
  dialogToggle: boolean;
  snackbarMessage: string;
  loading: boolean;
  error: any;
}

export const initialState = {
  blogs: [],
  blogById: <Blog>{},
  snackbarToggle: false,
  dialogToggle: false,
  snackbarMessage: "",
  loading: false,
  error: undefined,
} as BlogState;

const URL = "https://domexception.azurewebsites.net/api/Blog";

export const deleteBlog = createAsyncThunk(
  "blogs/delete",
  async ({ blogId }: { blogId: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${URL}/${blogId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      return { blogId };
    } catch (error) {
      return rejectWithValue({ error: error.message });
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
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`${URL}/${blogId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue({ error: error.message });
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
      return rejectWithValue(error.message);
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
      const response = await fetch(`${URL}`, {
        method: "POST",
        headers: { "content-type": "text/json" },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
      const data = await response.json();
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);

export const BlogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = undefined;
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
      state.blogs = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchBlogs.rejected, (state, action) => {
      state.error = `Failed to fetch blogs: ${action.error.message}`;
      state.loading = false;
      state.blogs = [];
    });

    ////////////////////////////SaveBlog//////////////////////////
    builder.addCase(saveBlog.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(saveBlog.fulfilled, (state, action) => {
      state.blogs = [...state.blogs, action.payload];
      state.loading = false;
      state.error = null; // Clear the error if the request was successful
    });
    builder.addCase(saveBlog.rejected, (state, action) => {
      state.error = action.error.message || "An error occurred"; // Set the error message
      state.loading = false;
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
export const { setSnackbarToggle, setDialogToggle, setSnackbarMessage, reset } =
  BlogSlice.actions;
export default BlogSlice.reducer;
