import React from "react";
import { Link } from "react-router-dom";
import { FiArrowUp, FiArrowDown, FiMessageSquare, FiImage } from "react-icons/fi";
import { formatUps } from "../utils/formatNumbers";
function PostCard({id, title, author, subreddit, createdAt, ups, numComments, thumbnail, permalink}) {
    
    return (
        <Link to={permalink}>
        <article>
            <div>
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
               
            <div>
                {thumbnail ? <img src={thumbnail} alt={title}/> : <FiImage aria-hidden="true"></FiImage>}  
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