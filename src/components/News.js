import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Loader from './Loader';
import PropTypes from 'prop-types'

export class News extends Component {
   static defaultProps ={
    country:'in',
    pageSize:8,
    category:'general'
   }
   static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
   }
    constructor(){
        super();
        // console.log("hello");
        this.state={
           articles:[], 
            loading:false,
            page:1
    }
}    
    async componentDidMount(){

    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a49bdb94064440c6a0d6d15ff43ec540&page=1&pageSize=${this.props.pagesize}`;
    this.setState({loading:true})
    let data=await fetch(url);
     let parsedData=await data.json();
  console.log(parsedData);
  this.setState({articles:parsedData.articles,
    totalResults:parsedData.totalResults,
     loading:false
  })
  }
    
  handleNextClick= async()=>{
console.log("Next")
if (!this.state.page + 1 <= Math.ceil(this.state.totalResults / this.props.pagesize)) {

let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a49bdb94064440c6a0d6d15ff43ec540&page=${ this.state.page +1}&pageSize=${this.props.pagesize}`;
      this.setState({loading:true})
let data=await fetch(url);
     let parsedData=await data.json();
      console.log(parsedData);
this.setState({
  page:this.state.page +1,
  articles:parsedData.articles,
   loading:false
})}
  }
  handlePreviousClick= async()=>{
console.log("previous")
let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a49bdb94064440c6a0d6d15ff43ec540&page=${ this.state.page -1}&pageSize=${this.props.pagesize}`;
     this.setState({loading:true})
let data=await fetch(url);
     let parsedData=await data.json();
      console.log(parsedData);
this.setState({
  page:this.state.page -1,
  articles:parsedData.articles,
  loading:false
})
  }
  
  render() {
    return (
      <div className='container'>
        <h1 className="text-center my-3"> TOP HeadLines</h1>
       {this.state.loading&& <Loader/>}
       <div className="row">
        { !this.state.loading&&this.state.articles.map((element)=>{
        
          return  <div className="col-md-4" key={element.url} >
        <Newsitem title={element.title?element.title.slice(0,45):""}  imageUrl={element.urlToImage} description={element.description?element.description.slice(0,90):""} newsUrl={element.url}/>
        </div> 
        })}
         <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1}  type="button" className="btn btn-dark" onClick={this.handlePreviousClick}> &larr; Previous</button>
          <button disabled={this.state.page +1>Math.ceil(this.state.totalResults/this.props.pagesize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}> Next &rarr; </button>
         </div>
       </div>
      </div>
    )
  }
}


export default News
