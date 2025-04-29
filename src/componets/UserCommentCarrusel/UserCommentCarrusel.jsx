import { useState } from "react";
import "./UserCommentCarrusel.css"

export function UserCommentCarrusel(props){
    const comments = props.comments;
    const [actualIndex, setActualIndex] = useState(0);
    let styles = {transform: `translateX(${actualIndex * (-39.5)}rem)`,}

    const prevComment = () => {
        setActualIndex((prevIndex) => prevIndex == 0 ? comments.length - 2 : prevIndex - 1);
    }

    const nextComment = () => {
        setActualIndex((prevIndex) => prevIndex == comments.length - 2 ? 0 : prevIndex + 1);
    }
    
    return (
        <div className="carousel">
            <button className="carousel-button prev" onClick={prevComment}>
                ◀
            </button>
            <div className="carousel-comment-container">
                <div className="comments" style={styles}>
                    {comments}
                </div>
            </div>
            <button className="carousel-button next" onClick={nextComment}>
                ▶
            </button>
        </div>
    );
}

export function UserComment(props){
    return (
        <div className="user-comment">
            <div className="user">
                <img src={`/icons/users/${props.userAvatar}`} alt="avatar" className="avatar" />
                <span className="userName">{props.userName}</span>
            </div>
            <p className="comment">{props.comment}</p>
        </div>
    )
}