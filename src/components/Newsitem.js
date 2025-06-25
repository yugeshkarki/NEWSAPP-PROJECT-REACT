import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {
    let {title,description,imageUrl,newsUrl}=this.props;
    return (
      <div  className='my-3'>
       <div className="card" >
         <img src={!imageUrl?"https://t3.ftcdn.net/jpg/01/33/49/22/360_F_133492249_piBI1o2jc2auyjUq6rfPRiAiDgcok4BQ.jpg":imageUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <a  rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-primary">Read more</a>
  </div>
</div>
      </div>
    )
  }
}

export default Newsitem
