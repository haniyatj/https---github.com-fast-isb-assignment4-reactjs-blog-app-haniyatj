import React, { useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import './CommentScreen.css';
const CommentScreen = ({ blogId, onComment }) => {
  const [commentText, setCommentText] = useState('');
  const navigate = useNavigate(); 
  const { postId } = useParams();


  const handleComment = async () => {
    try {
      const response = await fetch(`http://localhost:3000/blog/comment/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjU1MDU3MTczYzAyMDc5NTBlYTMxZjcyIiwidXNlcm5hbWUiOiJ0YXlsb3Jzd2lmdCIsInR5cGUiOiJ1c2VyIiwiaWF0IjoxNzAwOTA1OTE0LCJleHAiOjE3MDExNTQzMTR9.NMnx1SExsKaEZDI3-LY5D9rWR_U1IWLJyoqsBiDHs6c', // Replace with your actual access token
        },
        body: JSON.stringify({ text: commentText }),
      });

      if (!response.ok) {
        throw new Error('Failed to comment on the blog post');
      }

      const result = await response.json();

      onComment();
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
