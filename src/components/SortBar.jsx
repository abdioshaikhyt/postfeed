import { useParams, Link } from "react-router-dom";

function Sortbar({sorts}) {
    const {subreddit, sort} = useParams();

    return (
        <>
        <ul>
            {sorts.map(srt => {

               return <li key={srt} className={srt === sort ? 'active' : ''}>
                    <Link to ={`/r/${subreddit}/${srt}`}>{srt}</Link>
                </li>
            })}
        </ul>
        </>
    )   
}

export default Sortbar;