import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const CardCommentar = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const user_id = localStorage.getItem('userId');

  useEffect(() => {
    fetchComments(postId);
  }, [postId]);

  const fetchComments = (postId) => {
    axios
      .post('http://localhost:8080/comment/findPostID', { post_id: postId })
      .then((response) => {
        console.log(response.data.data);
        setComments(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCommentChange = (e) => {
    const { value } = e.target;
    setComment(value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    const commentData = {
      user: { id: user_id },
      post: { id: postId },
      comment: comment
    };

    axios
      .post('http://localhost:8080/comment', commentData)
      .then((response) => {
        console.log(response.data);
        setComment('')
        fetchComments(postId)
      })
      .catch((error) => {
        console.error(error);
        alert('Failed to Comment');
      });
  };

  const formatCommentDate = (commentDate) => {
    const date = new Date(commentDate);
    const now = new Date();
  
    const timeDifference = now.getTime() - date.getTime();
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
  
    if (hoursDifference < 24) {
      return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString('en-GB');
    }
  };
  

  return (
    <div>
        <div className='mt-2 mb-2'>
            <span className='ml-2'>{comments.length} Komentar</span>
        </div>
        {comments.map((comment) => (
            <div key={comment.id} className='mt-2'>
            <div className="card-body" style={{ background: 'white', borderRadius: '0.375rem' }}>
                <div className='mb-1' style={{ fontSize: '14px' }}>
                {formatCommentDate(comment.commentDate)} - {comment.user.username}
                </div>
                <div>{comment.comment}</div>
            </div>
            </div>
        ))}
        <div className='col'>
          <div className='d-flex'>
            <form onSubmit={handleCommentSubmit} className='mt-2 flex-grow-1 me-2'>
              <input
                type='text'
                className='form-control'
                value={comment}
                onChange={handleCommentChange}
                placeholder='Masukkan Komentar'
                required
                />
            </form>
            <button type='submit' className='btn btn-primary mt-2'>
              <FontAwesomeIcon icon={faPaperPlane} onClick={handleCommentSubmit} />
            </button>
          </div>
        </div>
    </div>
  );
};

export default CardCommentar;