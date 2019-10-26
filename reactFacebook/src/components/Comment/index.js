import React from 'react';
import './style.css'

function Comment({data}){
  const {id, author, content} = data;
  return (
    <div className="containerComment">
      <div className="avatarComment">
        <img src={author.avatar} alt="author's avatar"/>
      </div>
      <div className="contentComment">
        <strong>{author.name}</strong> {content}
      </div>
    </div>
  )
}

export default Comment;