import React, { Component } from 'react';
import './style.css';
import Comment from '../Comment/index';

function Post({ data }) {
  const { id, author, date, content, comments } = data;
  return (
    <div className="containerPost">
      
      <div className="authPost">
        
        <img src={author.avatar} alt="author's avatar" />
        
        <div>
          <p>{author.name}</p>
          <span>{date}</span>
        </div>

      </div>
      
      <div className="contentPost">
        <span>{content}</span>
        <br />
        <br />
      <hr/>
      </div>
      <div className="commentsPost">
        {comments.map(c => <Comment key={c.id} data={c} />)}
      </div>

    </div>
  )
}

export default Post;