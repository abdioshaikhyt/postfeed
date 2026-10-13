
import { Link } from "react-router-dom";
import { FiArrowUp, FiArrowDown, FiMessageSquare, FiImage } from "react-icons/fi";
import { formatUps } from "../utils/formatNumbers";
import styles from './PostCard.module.css';
function PostCard({ title, author, subreddit, createdAt, ups, numComments, thumbnail, permalink}) {
    
    return (
        <Link to={permalink}>
        <article className={styles['article-container']}>
            <div className={styles.vote}>
            <span className="vote-btn-up">
                <FiArrowUp aria-hidden="true"></FiArrowUp>
            </span>
            <p>
            {formatUps(ups)}
            </p>
            <span className="vote-btn-down">
                <FiArrowDown aria-hidden="true"/>
            </span>
            </div>
               
            <div className= {styles['img-container']}>
                {thumbnail ? <img src={thumbnail} alt={title} loading="lazy" className={styles.thumbnail}/> : <FiImage aria-hidden="true" className={styles['FI-Image']}></FiImage>}
            </div>
            <div>
                <p>{`r/${subreddit} · u/${author} · ${createdAt}`}</p>
                <h3>{title}</h3>
                <p><span><FiMessageSquare aria-hidden="true"></FiMessageSquare></span> {numComments === 1 ? `${formatUps(numComments)} comment`: `${formatUps(numComments)} comments` }</p>
            </div>
        </article>
        </Link>
    );
}


export default PostCard;