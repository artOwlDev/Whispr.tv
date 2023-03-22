


import React, { useEffect, useState } from 'react'
import {Movie} from "../components/Movie"
import "./listmovie.scss"

export const ListMovie = () => {


  const [popular,setPopular] = useState([]); 
  
  const POPULAR = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=e04f3c7713a6e4684e77e1e5c66c4908&page=1`
  var count = 0;

  useEffect(() => {
      fetch(POPULAR)
      .then(res => res.json())
      .then(data => {
          console.log(data);
          console.log(POPULAR);
          setPopular(data.results);
      });
    
    }, []);



  return (
    <div className='list-items'>
      {popular.length > 0 && popular.map((movie) => {
        return <Movie title={movie.title} image={movie.poster_path} year={movie.release_date.substring(0, 4)}/>
      })}
    </div>
  )
}
