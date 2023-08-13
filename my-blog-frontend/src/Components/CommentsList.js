import React from 'react';

const CommentsList=({comment})=>(
    <>
     <h3>Comment : </h3>
     {
        comment.map((comment,key)=>(
            <div className='comment'key={key}>
                <h4>{comment.username}</h4>
                <h4>{comment.text}</h4>
                
            </div>
        ))
     }
    </>
);
export default CommentsList;