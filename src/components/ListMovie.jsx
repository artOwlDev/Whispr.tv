


import React, { useEffect, useState } from 'react'
import {Movie} from "../components/Movie"
import "./listmovie.scss"

export const ListMovie = () => {

  const [popular,setPopular] = useState([]); 
  
  const POPULAR = `https://api.themoviedb.org/3/tv/top_rated?api_key=e04f3c7713a6e4684e77e1e5c66c4908&language=en-US&page=1&number=12`;

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
      {popular.length > 0 && popular.map((tv) => {
        return <Movie title={tv.name} image={tv.poster_path} year={tv.first_air_date.substring(0, 4)}/>
      })}
    </div>
  )
}
