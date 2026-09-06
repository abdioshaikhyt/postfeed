import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchPosts } from '../features/posts/postsSlice.js';

function Home() {
    const dispatch = useDispatch();
    useEffect(() =>
 {
    dispatch(fetchPosts({subreddit: 'popular', sort: 'hot'}));
}, [])

return  (
    <>
    </>
)
}

export default Home;