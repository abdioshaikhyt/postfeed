import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPosts } from '../features/posts/postsSlice.js';
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
    const {subreddit, sort} = useParams();
    useEffect(() =>
 {
    dispatch(fetchPosts({subreddit, sort}));
}, [subreddit, sort])
    let content;
        if(status === 'loading' || status === 'idle') {
            content = 'Currently waiting to get posts';
        }
        else if(status === 'failed') {
            content = 'failed to get posts';
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