import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

export interface Blog {
  id: number;
  title: string;
  content: string;
}

interface BlogState {
  blogs: Blog[];
}

const initialState: BlogState = {
  blogs: [],
};




export const BlogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    
  },
  
});

export default BlogSlice.reducer;
