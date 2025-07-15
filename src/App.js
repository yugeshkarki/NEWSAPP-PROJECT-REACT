
import './App.css';
import Navbar from './components/Navbar';
import React, { useState } from 'react'
import News from './components/News';
import LoadingBar from "react-top-loading-bar";
import {
  BrowserRouter as Router,
  
  Route,
  Routes
} from "react-router-dom";


const App =()=>{
  const pagesize=6;
 const  apiKey= process.env.REACT_APP_NEWS_API

 const[progress,setProgress] =useState(0)

   
  
    return (
      
      <div>
        <Router>
     <Navbar/>
           <LoadingBar
        color="#f11946"
        progress={progress}
        
      /> 

   <Routes>
           <Route exact path='/' element={<News setProgress={setProgress} apiKey={apiKey} key="general"  pagesize={pagesize} country="us" category="general"/>}/> 
           <Route exact path='/business' element={<News setProgress={setProgress} apiKey={apiKey} key="business"  pagesize={pagesize} country="us" category="business"/>}/> 
           <Route exact path='/entertainment' element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment"  pagesize={pagesize} country="us" category="entertainment"/>}/> 
           <Route exact path='/general' element={<News setProgress={setProgress} apiKey={apiKey} key="general"  pagesize={pagesize} country="us" category="general"/>}/> 
           <Route exact path='/health' element={<News setProgress={setProgress} apiKey={apiKey} key="health"  pagesize={pagesize} country="us" category="health"/>}/> 
           <Route exact path='/science' element={<News setProgress={setProgress} apiKey={apiKey} key="science"  pagesize={pagesize} country="us" category="science"/>}/> 
           <Route exact path='/sports' element={<News setProgress={setProgress} apiKey={apiKey} key="sports"  pagesize={pagesize} country="us" category="sports"/>}/> 
           <Route exact path='/technology' element={<News setProgress={setProgress}  apiKey={apiKey} key="technology"  pagesize={pagesize} country="us" category="technology"/>}/> 
</Routes>
     </Router>
      </div>
    )
  
}
export default App;