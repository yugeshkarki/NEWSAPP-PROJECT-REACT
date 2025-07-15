import React, {  useEffect, useState } from 'react'
import Newsitem from './Newsitem'
import Loader from './Loader';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=> {
  const[articles,setArticles]= useState([]);
  const[loading,setloading]= useState(true);
  const[page,setpage]= useState(1);
  const[totalResults,settotalResults]= useState(0);
   
   
  
  
   const capitalizeFirstLetter=(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
   }
      
   const updateNews= async()=>{
   props.setProgress(0)
    const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pagesize}`;
   
    setloading(true)
  const data= await fetch(url);
    props.setProgress(30)
    const parsedData= await data.json();
     props.setProgress(70);

    setArticles(parsedData.articles);
    settotalResults(parsedData.totalResults);
   setloading(false)
  props.setProgress(100)
}
  useEffect( () =>  {
    document.title=`${capitalizeFirstLetter(props.category)}-NewsMonkey`;
    updateNews();
    //eslint-disable-next-line
  },[])

    
//    const handleNextClick= async()=>{
// // console.log("Next")
// // if (!state.page + 1 <= Math.ceil(state.totalResults / props.pagesize)) {

// // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a49bdb94064440c6a0d6d15ff43ec540&page=${ page +1}&pageSize=${props.pagesize}`;
// //       setState({loading:true})
// // let data=await fetch(url);
// //      let parsedData=await data.json();
// //       console.log(parsedData);
// // setState({
// //   page:state.page +1,
// //   articles:parsedData.articles,
// //    loading:false
// // })}
//  setpage(page+1)
//   updateNews();
//   }
//   const handlePreviousClick= async()=>{
// // console.log("previous")
// // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a49bdb94064440c6a0d6d15ff43ec540&page=${ page -1}&pageSize=${props.pagesize}`;
// //      setState({loading:true})
// // let data=await fetch(url);
// //      let parsedData=await data.json();
// //       console.log(parsedData);
// // setState({
// //   page:state.page -1,
// //   articles:parsedData.articles,
// //   loading:false
// // })

// setpage(page-1)
//  updateNews();
  
//   }
   const fetchMoreData=async()=>{
 
      const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pagesize}`;
     setpage(page+1)
    let data=await fetch(url);
     let parsedData=await data.json();
  console.log(parsedData);
  setArticles(articles.concat(parsedData.articles)) 
  settotalResults(parsedData.totalResults)
  
   
  }
  

    return (
   
      <div className='container'>
        <h1 className="text-center my-3 mt-5"> TOP  {capitalizeFirstLetter(props.category)} HeadLines</h1>
       {loading&& <Loader/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={<Loader/>}
        >
          <div className="container">
       <div className="row">
        { articles.map((element)=>{
        
          return  <div className="col-md-4" key={element.url} >
        <Newsitem title={element.title?element.title.slice(0,45):""}  imageUrl={element.urlToImage} description={element.description?element.description.slice(0,90):""} newsUrl={element.url} author=
        {element.author} date={element.publishedAt} source={element.source.name}/>
        </div> 
        
        })}
        </div>
        </div>
        </InfiniteScroll>
         {/* <div className="container d-flex justify-content-between">
          <button disabled={page<=1}  type="button" className="btn btn-dark" onClick={handlePreviousClick}> &larr; Previous</button>
          <button disabled={page +1>Math.ceil(totalResults/props.pagesize)} type="button" className="btn btn-dark" onClick={handleNextClick}> Next &rarr; </button>
         </div> */}
       
      </div>
    
    )
  
}

 News.defaultProps ={
    country:'in',
    pageSize:8,
    category:'general'
   }
  News.propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
   }
export default News
