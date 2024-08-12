import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {commentsList, onDeleteComment, onLikeComment} = props
  const {id, name, comment, isLiked, initialBgClassName} = commentsList
  const initial = name.slice(0, 1)
  const time = formatDistanceToNow(new Date())
  const likeImage = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const likeButton = isLiked ? 'liked-image' : 'like-image'

  const onDelete = () => {
    onDeleteComment(id)
  }

  const onClickLike = () => {
    onLikeComment(id)
  }

  return (
    <li className="list-items">
      <div className="name-container">
        <div className={`initial-bg-container ${initialBgClassName}`}>
          <p className="initial">{initial}</p>
        </div>
        <h1 className="name">{name}</h1>
        <p className="time">{time}</p>
      </div>
      <p className="comment">{comment}</p>
      <div className="like-delete-container">
        <button className={likeButton} onClick={onClickLike} type="button">
          <img src={likeImage} alt="like" className="like-image" />
          Like
        </button>
        <button
          type="button"
          className="delete-button"
          data-testid="delete"
          onClick={onDelete}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="image-button"
          />
        </button>
      </div>
      <hr className="seperator" />
    </li>
  )
}

export default CommentItem
