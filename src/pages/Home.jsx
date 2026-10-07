import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPosts } from '../features/posts/postsSlice.js';
import PostCard from '../components/PostCard.jsx';
import { useParams } from 'react-router-dom';
import { SUBREDDITS } from "../constants/subreddits.js";
import Sidebar from "../components/SideBar.jsx";

function Home() {
    const dispatch = useDispatch();
    const items = useSelector(state => state.posts.items);
    const ids = useSelector(state => state.posts.ids);
    const status = useSelector(state => state.posts.status);
    const error = useSelector(state => state.posts.error);
    const currentSubreddit = useSelector(state => state.posts.currentSubreddit);
    const currentSort = useSelector(state => state.posts.currentSort);
    const {subreddit, sort} = useParams();
    useEffect(() =>
 {
    dispatch(fetchPosts({subreddit, sort}));
}, [subreddit, sort])

    const handleRetry = () => {
        dispatch(fetchPosts({subreddit: currentSubreddit, sort: currentSort}));
    };

    let content;
        if(status === 'loading' || status === 'idle') {
            content = 'Currently waiting to get posts';
        }
        else if(status === 'failed') {
            content = (
                <div className="error-state">
                    <p>Failed to get posts{error ? `: ${error}` : ''}</p>
                    <button type="button" onClick={handleRetry}>Retry</button>
                </div>
            );
        }
        else {
            content = ids.map(id => <PostCard key={id} {...items[id]}/>);
        }
return  (
    <>
    <Sidebar subreddits={SUBREDDITS} />
    {content}
    </>
)
}

export default Home;