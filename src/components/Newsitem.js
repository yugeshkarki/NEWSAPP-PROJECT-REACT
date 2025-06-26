import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {
    let {title,description,imageUrl,newsUrl,author,date, source}=this.props;
    return (
      <div  className='my-3'>
       <div className="card" >
         <span class="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left :'90%', zIndex:1}}>{source} </span>
         <img src={!imageUrl?"https://t3.ftcdn.net/jpg/01/33/49/22/360_F_133492249_piBI1o2jc2auyjUq6rfPRiAiDgcok4BQ.jpg":imageUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
    <h5 className="card-title">{title} </h5>
    <p className="card-text">{description}</p>
      <p className="card-text text-success"><small>By {!author?"unknowm":author} on { new Date(date).toGMTString()}</small></p>
    <a  rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-primary">Read more</a>
  </div>
</div>
      </div>
    )
  }
}

export default Newsitem
