import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPosts } from '../features/posts/postsSlice.js';
import PostCard from '../components/PostCard.jsx';


function Home() {
    const dispatch = useDispatch();
    const items = useSelector(state => state.posts.items);
    const ids = useSelector(state => state.posts.ids);
    const status = useSelector(state => state.posts.status);
   
    useEffect(() =>
 {
    dispatch(fetchPosts({subreddit: 'popular', sort: 'hot'}));
}, [])
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
    {content}
    </>
)
}

export default Home;