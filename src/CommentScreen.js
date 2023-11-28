import React, { useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import './CommentScreen.css';
import useTokenStore from './tokenStore';
import useCommentsStore from './commentsStore';

const CommentScreen = () => {
  const [commentText, setCommentText] = useState('');
  const navigate = useNavigate(); 
  const { postId } = useParams();
  const { token, decodeToken } = useTokenStore();
  const { setCommentedBlogId } = useCommentsStore();

  const handleComment = async () => {

    try {
      const response = await fetch(`http://localhost:3000/blog/comment/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ text: commentText }),
      });

      if (!response.ok) {
    
        throw new Error('Failed to comment on the blog post');
      }

      const result = await response.json();
  setCommentedBlogId(postId);
  console.log("im here");
      navigate('/'); 

     
    } catch (error) {
      console.error('Error commenting on blog post:', error);
    }
  };

  return (
    <div className="comment-screen">
      <h2>Comment on Blog Post!</h2>
      <textarea  className="comment-textarea"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Type your comment here..."
      />
      <button  className="comment-button" onClick={handleComment}>Comment</button>
    </div>
  );
};

export default CommentScreen;
