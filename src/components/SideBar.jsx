import { useParams, Link } from "react-router-dom";

function Sidebar({subreddits}) {
    const {subreddit, sort} = useParams();
    

    return (
        <>
        <ul>
            {subreddits.map((sub) => {
                
               return <li key={sub} className={sub === subreddit ? 'active' : ''}>
                <Link  to={`/r/${sub}/${sort}`}>{`r/${sub}`}</Link>
                </li>
            })}
            
        </ul>
        </>
    )
      
}

export default Sidebar;