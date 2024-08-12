import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {commentsList: [], name: '', comment: '', currentIndex: 0, count: 0}

  onLikeComment = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (eachComment.id === id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  onDeleteComment = id => {
    const {commentsList} = this.state
    const filteredCommentsList = commentsList.filter(
      eachComment => eachComment.id !== id,
    )
    this.setState(prevState => ({
      count: prevState.count - 1,
      commentsList: filteredCommentsList,
    }))
  }

  addComment = event => {
    event.preventDefault()
    const {name, comment, currentIndex} = this.state
    const newComment = {
      id: uuidv4(),
      name,
      comment,
      isLiked: false,
      initialBgClassName: initialContainerBackgroundClassNames[currentIndex],
    }
    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      currentIndex: prevState.currentIndex + 1,
      count: prevState.count + 1,
      name: '',
      comment: '',
    }))
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeComment = event => {
    this.setState({comment: event.target.value})
  }

  render() {
    const {commentsList, count, name, comment} = this.state
    return (
      <div className="bg-container">
        <h1 className="heading">Comments</h1>
        <div className="comments-body-container">
          <div className="input-card-container">
            <p className="description">Say something about 4.0 Technologies</p>
            <form className="form-container" onSubmit={this.addComment}>
              <input
                value={name}
                placeholder="Your Name"
                className="input"
                onChange={this.onChangeName}
              />
              <textarea
                value={comment}
                rows="3"
                cols="50"
                placeholder="Your Comment"
                className="text-box"
                onChange={this.onChangeComment}
              >
                {comment}
              </textarea>
              <button type="submit" className="comment-button">
                Add Comment
              </button>
            </form>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png "
            alt="comments"
            className="comments-image"
          />
        </div>
        <hr className="seperator" />
        <ul>
          <p>
            <span className="count-element">{count}</span> Comments
          </p>

          {commentsList.map(eachComment => (
            <CommentItem
              commentsList={eachComment}
              key={eachComment.id}
              onDeleteComment={this.onDeleteComment}
              onLikeComment={this.onLikeComment}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Comments
