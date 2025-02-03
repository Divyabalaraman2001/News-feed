import React from 'react'

function NewsCard(props) {
  return (
    <>
      <div className="card dev-card my-3" alt="">
        <img src={props.urlToImage} className="card-img-top" alt=""/>
          <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <p className="card-text">{props.description}</p>
            <a href={props.url} className="readmore">Read More</a>
          </div>
      </div>
    </>
  )
}

export default NewsCard