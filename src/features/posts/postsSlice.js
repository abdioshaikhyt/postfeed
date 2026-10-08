import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// one cache entry per subreddit/sort combo so switching back to a listing we've
// already fetched doesn't refire the request
const makeCacheKey = (subreddit, sort) => `${subreddit}/${sort}`;

const initialState = {
    ids: [],
    items: {},
    status: 'idle',
    error: null,
    currentSubreddit: 'popular',
    currentSort: 'hot',
    cache: {} // { 'subreddit/sort': { ids, items } }
};

// no auth — reddit's .json trick works on any subreddit/sort URL
export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async({subreddit, sort}) => {
        const response = await fetch(`/mock/r/${subreddit}/${sort}.json`);
        if(!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        return data;
    },
    {
        // skip the request entirely when this subreddit/sort is already cached —
        // KAN-13: avoid redundant fetches when switching back to a listing we have
        condition: ({subreddit, sort}, {getState}) => {
            const cacheKey = makeCacheKey(subreddit, sort);
            return !getState().posts.cache[cacheKey];
        }
    }
)

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
        // fetchPosts' `condition` skips pending/fulfilled/rejected entirely on a cache
        // hit, so Home.jsx dispatches this instead to load the cached ids/items
        // straight into the active view — same state shape fulfilled leaves behind
        loadFromCache: (state, action) => {
            const {subreddit, sort} = action.payload;
            const cacheKey = makeCacheKey(subreddit, sort);
            const cached = state.cache[cacheKey];
            if(!cached) return;
            state.status = 'succeeded';
            state.error = null;
            state.currentSubreddit = subreddit;
            state.currentSort = sort;
            state.ids = cached.ids;
            state.items = cached.items;
        }
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
            state.ids = [];
            state.items = {};
            action.payload.data.children.forEach((child) => {
                const normalizedObject = normalizePost(child.data);
                state.items[normalizedObject.id] = normalizedObject;
                state.ids.push(normalizedObject.id);
            });
            // cache this listing so switching back to it skips the fetch (KAN-13)
            const {subreddit, sort} = action.meta.arg;
            state.cache[makeCacheKey(subreddit, sort)] = {
                ids: state.ids,
                items: state.items
            };
        })
    }
})

export const {loadFromCache} = postsSlice.actions;

export default postsSlice.reducer;
