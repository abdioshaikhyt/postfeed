import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const REDDIT_BASE = 'https://www.reddit.com';
const initialState = {
    ids: [],
    items: {},
    status: 'idle',
    error: 'null',
    currentSubreddit: 'popular',
    currentSort: 'hot'
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async({subreddit, sort }) => {
    const response = await fetch(`${REDDIT_BASE}/r/${subreddit}/${sort}.json`);
    const data = await response.json();
    return data;
})


const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            
        })
    }
})