

import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import HomePageInfo from '../components/HomePageInfo'
import { ListMovie } from '../components/ListMovie'
import { Nav } from '../components/Nav'
import Search from '../components/Search'
import { TvItem } from '../components/TvItem'
import { Link } from 'react-router-dom';

export const Home = () => {

  const [topRated,setTopRated] = useState([]); 
  
  const TOP_RATED =  `https://api.themoviedb.org/3/tv/top_rated?api_key=e04f3c7713a6e4684e77e1e5c66c4908&language=en-US&page=1`

  useEffect(() => {
      fetch(TOP_RATED)
      .then(res => res.json())
      .then(data => {
          console.log(data); 
          console.log(TOP_RATED);
          setTopRated(data.results);
      });
    
    }, []);



  return (
    <div>
        <Nav/>
        <Search/>
        <HomePageInfo/>

        <h1 style={{margin: "4rem 8rem", fontFamily: "'Poppins', sans-serif"}}>Critically-acclaimed TV Series</h1>

        <div className="popular-series-display" style={{display: "flex", alignContent: "center", justifyContent: "center", flexDirection: "row", margin: "2rem", flexWrap: "wrap"}}>
          {topRated.slice(0,12).map((tv) => {
            return <Link to={`tv/details/${tv.id}`}><TvItem key="tv" image={tv.poster_path} title={tv.name} year={tv.first_air_date.substring(0, 4)} id={tv.id}/></Link>
          })}
        </div>

        <Footer/>
    </div>
  )
}



