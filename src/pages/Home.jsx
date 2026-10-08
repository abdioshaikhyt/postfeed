import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPosts, loadFromCache } from '../features/posts/postsSlice.js';
import PostCard from '../components/PostCard.jsx';
import { useParams } from 'react-router-dom';
import { SUBREDDITS } from "../constants/subreddits.js";
import Sidebar from "../components/SideBar.jsx";
import Sortbar from "../components/SortBar.jsx";
import { SORTS } from "../constants/sorts.js";

function Home() {
    const dispatch = useDispatch();
    const items = useSelector(state => state.posts.items);
    const ids = useSelector(state => state.posts.ids);
    const status = useSelector(state => state.posts.status);
    const error = useSelector(state => state.posts.error);
    const currentSubreddit = useSelector(state => state.posts.currentSubreddit);
    const currentSort = useSelector(state => state.posts.currentSort);
    const cache = useSelector(state => state.posts.cache);
    const {subreddit, sort} = useParams();
    useEffect(() => {
        // KAN-13: already have this subreddit/sort cached — load it straight in
        // instead of dispatching fetchPosts (which would skip the request anyway
        // via its `condition`, but would also skip updating the active ids/items)
        if(cache[`${subreddit}/${sort}`]) {
            dispatch(loadFromCache({subreddit, sort}));
        }
        else {
            dispatch(fetchPosts({subreddit, sort}));
        }
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
    <Sortbar sorts = {SORTS}/>
    {content}
    </>
)
}

export default Home;