import postsSliceReducer from "../features/posts/postsSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        posts: postsSliceReducer
    }
})

export default store;