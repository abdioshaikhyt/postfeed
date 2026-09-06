import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const REDDIT_BASE = 'https://www.reddit.com';
const initialState = {
    ids: [],
    items: {},
    status: 'idle',
    error: null,
    currentSubreddit: 'popular',
    currentSort: 'hot'
};

// no auth — reddit's .json trick works on any subreddit/sort URL
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async({subreddit, sort }) => {
    const response = await fetch(`https://corsproxy.io/?url=${REDDIT_BASE}/r/${subreddit}/${sort}.json`);
    if(!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data;
})

const formatTimeAgo = timeStamp => {
    const dateNowInSeconds = Date.now()/1000;
    const postCreatedTimeInSeconds = dateNowInSeconds - timeStamp;
    const postCreatedTimeInHours = postCreatedTimeInSeconds/3600;
    const roundedDown = Math.floor(postCreatedTimeInHours);
    const createdAt = `${roundedDown}h ago`;
    return createdAt;
}

// reddit returns 'self'/'default'/'image' instead of null when there's no thumbnail — undocumented, found by inspecting real responses
const cleanThumbnail = thumbnail => {
    if(thumbnail === 'self' || thumbnail === 'default' || thumbnail === 'image') {
        return null;
    }
    return thumbnail;
}

const normalizePost = rawObject => {
    return {
        id: rawObject.id,
        title: rawObject.title,
        author: rawObject.author,
        subreddit: rawObject.subreddit,
        ups: rawObject.ups,
        permalink: rawObject.permalink,
        numComments: rawObject.num_comments,
        createdAt: formatTimeAgo(rawObject.created_utc),
        thumbnail: cleanThumbnail(rawObject.thumbnail)
    }
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state, action) => {
            state.status = 'loading';
            state.error = null;
            // set here, not in fulfilled — so a failed fetch still leaves currentSubreddit/currentSort correct for KAN-14's retry button
            state.currentSubreddit = action.meta.arg.subreddit;
            state.currentSort = action.meta.arg.sort;
        })
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            action.payload.data.children.forEach((child) => {
                const normalizedObject = normalizePost(child.data);
                state.items[normalizedObject.id] = normalizedObject;
                state.ids.push(normalizedObject.id);
            });
        })
    }
})

export default postsSlice.reducer;
