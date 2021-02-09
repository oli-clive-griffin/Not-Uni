import React from 'react'

class Comments extends React.Component {

  render (){ 
    return (
      <div className="comments"> 
      <div > 
        <p className='title'>Comments</p>
        {this.props.comments.map((comment, i) => {
          return (
            <div key={i}>
              <p className="user-name" >{comment.user_name}</p>
              <p className="single-comment" >{comment.content}</p>
            </div>
          )
        })}
       </div>
       </div>
    )
  }
}

export default Comments