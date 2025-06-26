import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Loader from './Loader';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

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
   capitalizeFirstLetter=(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
   }
    constructor(props){
        super(props);
        // console.log("hello");
        this.state={
           articles:[], 
            loading:false,
            page:1,
            totalResults:0
    }
    document.title=`${this.capitalizeFirstLetter(this.props.category)}-NEWS`;
}    
async updateNews(pageNo){
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a49bdb94064440c6a0d6d15ff43ec540&page=${this.state.page}&pageSize=${this.props.pagesize}`;
    this.setState({loading:true})
    let data=await fetch(url);
     let parsedData=await data.json();
  console.log(parsedData);
  this.setState({articles:parsedData.articles,
    totalResults:parsedData.totalResults,
     loading:false
  })
}
    async componentDidMount(){

  //   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a49bdb94064440c6a0d6d15ff43ec540&page=1&pageSize=${this.props.pagesize}`;
  //   this.setState({loading:true})
  //   let data=await fetch(url);
  //    let parsedData=await data.json();
  // console.log(parsedData);
  // this.setState({articles:parsedData.articles,
  //   totalResults:parsedData.totalResults,
  //    loading:false
  // })
  this.updateNews();
  }
    
  handleNextClick= async()=>{
// console.log("Next")
// if (!this.state.page + 1 <= Math.ceil(this.state.totalResults / this.props.pagesize)) {

// let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a49bdb94064440c6a0d6d15ff43ec540&page=${ this.state.page +1}&pageSize=${this.props.pagesize}`;
//       this.setState({loading:true})
// let data=await fetch(url);
//      let parsedData=await data.json();
//       console.log(parsedData);
// this.setState({
//   page:this.state.page +1,
//   articles:parsedData.articles,
//    loading:false
// })}
  this.setState({ page:this.state.page+1});
  this.updateNews();
  }
  handlePreviousClick= async()=>{
// console.log("previous")
// let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a49bdb94064440c6a0d6d15ff43ec540&page=${ this.state.page -1}&pageSize=${this.props.pagesize}`;
//      this.setState({loading:true})
// let data=await fetch(url);
//      let parsedData=await data.json();
//       console.log(parsedData);
// this.setState({
//   page:this.state.page -1,
//   articles:parsedData.articles,
//   loading:false
// })
this.setState({ page:this.state.page-1});
  this.updateNews();
  
  }
  fetchMoreData=async()=>{
    this .setState({page:this.state.page+1})
      const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a49bdb94064440c6a0d6d15ff43ec540&page=${this.state.page}&pageSize=${this.props.pagesize}`;
    
    let data=await fetch(url);
     let parsedData=await data.json();
  console.log(parsedData);
  this.setState(
    {articles: this.state.articles.concat(parsedData.articles),
    totalResults:parsedData.totalResults,
     
  })
   
  }
  
  render() {
    return (
      <div className='container'>
        <h1 className="text-center my-3"> TOP  {this.capitalizeFirstLetter(this.props.category)} HeadLines</h1>
       {this.state.loading&& <Loader/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Loader/>}
        >
          <div className="container">
       <div className="row">
        { this.state.articles.map((element)=>{
        
          return  <div className="col-md-4" key={element.url} >
        <Newsitem title={element.title?element.title.slice(0,45):""}  imageUrl={element.urlToImage} description={element.description?element.description.slice(0,90):""} newsUrl={element.url} author=
        {element.author} date={element.publishedAt} source={element.source.name}/>
        </div> 
        
        })}
        </div>
        </div>
        </InfiniteScroll>
         {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1}  type="button" className="btn btn-dark" onClick={this.handlePreviousClick}> &larr; Previous</button>
          <button disabled={this.state.page +1>Math.ceil(this.state.totalResults/this.props.pagesize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}> Next &rarr; </button>
         </div> */}
       
      </div>
    )
  }
}


export default News
