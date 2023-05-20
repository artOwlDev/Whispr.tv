

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Footer from '../components/Footer'
import { Nav } from '../components/Nav'
import { TvItem } from '../components/TvItem';
import { AiFillStar } from 'react-icons/ai';

const Movie = () => {
  
  const {id} = useParams();

  const[details, setDetails] = useState([]);
  const[nowPlaying, setNowPlaying] = useState([]);
  const IMAGES = "https://image.tmdb.org/t/p/w1280"

  const [hoveredIndex, setHoveredIndex] = useState(1);


  useEffect(() => {
    document.title = `Movies · Whispr`;
},[])

const genreTable = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western'
};

  useEffect(() => {
    async function getNowPlaying(){
        try{
            const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=1`)
            console.log(response.data);
            setNowPlaying(response.data.results)
        }
        catch(error){
            console.log(error);
        }
    }
    getNowPlaying();
  },[id]) 

  const handleHover = (index) => {
    if (index !== null) {
      setTimeout(() => {
        setHoveredIndex(index);
      }, 200); // Delay in milliseconds
    } else {
      setHoveredIndex(index);
    }
  }


  return (
    <div style={{minHeight: "100vh"}}>

        <Nav/>
        <div className="movie-container">
            <div className="movie-banner">
                <div className="movie-banner-left">
                  {/* <div className="movie-sort">
                  <select name='Genre' required>
                    <option value="" disabled selected hidden>Genre</option>
                    <option value='action'>Action</option>
                    <option value='comedy'>Comedy</option>
                    <option value='drama'>Drama</option>
                    <option value='horror'>Horror</option>
                    <option value='science-fiction'>Science Fiction</option>
                    <option value='romance'>Romance</option>
                  </select>

                  <select name='Release Year' required>
                    <option value="" disabled selected hidden>Release Year</option>
                    <option value='2020s'>2020s</option>
                    <option value='2010s'>2010s</option>
                    <option value='2000s'>2000s</option>
                    <option value='1990s'>1990s</option>
                    <option value='1980s'>1980s</option>
                    <option value='1970s'>1970s</option>
                  </select>

                    
                  </div> */}

                  <div className="movie-banner-details">

                      <h1 className={`transition-fade ${hoveredIndex !== null ? 'show' : ''}`}>{nowPlaying[hoveredIndex]?.title}</h1>

                      <div className="movie-banner-star-rating">
                        {[...Array(5)].map((_, index) => (
                          <span
                          key={index}
                          className={`star ${index < Math.floor(nowPlaying[hoveredIndex]?.vote_average / 2) ? 'gold' : ''}`}
                        >
                          {index < Math.floor(nowPlaying[hoveredIndex]?.vote_average / 2) ? (
                            <span className="star-icon-full">&#9733;</span>
                          ) : (
                            <span className="star-icon-empty">&#9734;</span>
                          )}
                        </span>
                           
                        ))}
                    </div>
                     
                      <h3 className={`transition-fade ${hoveredIndex !== null ? 'show' : ''}`}>{nowPlaying[hoveredIndex]?.release_date.slice(0,4)}</h3>
                      
                      <div className="movie-banner-genres">
                        {nowPlaying[hoveredIndex]?.genre_ids?.slice(0, nowPlaying[hoveredIndex]?.genre_ids.length - 1).map((genreId) => {
                          const genreName = genreTable[genreId];
                          return <p key={genreId}>{genreName}</p>;
                        })}
                      </div>



                      <p>{nowPlaying[hoveredIndex]?.overview}</p>
                      
                      <Link to={`details/${nowPlaying[hoveredIndex]?.id}`}>
                        <button className='movie-banner-button'>View Details</button>
                      </Link>
                  </div>

                </div>
                <div className="movie-banner-right">

                  <div className="backdrop-div">
                      <div className="backdrop" style={{display: "flex", justifyContent: "center", background: `linear-gradient(to left, transparent 80%, #14171d 100%), linear-gradient(to bottom, transparent 90%, #14171d 100%), linear-gradient(to right, transparent 90%, #14171d 100%), linear-gradient(to top, transparent 98%, #14171d 100%), url(${IMAGES + nowPlaying[hoveredIndex]?.backdrop_path}) no-repeat center center / cover`, objectPosition: 'center bottom', height: "55vh", width: "60vw", border: "0", overflow: "", opacity: "0.8", paddingBottom: "20rem"}}></div>
                  </div>
                  
                </div>
            </div>

            <div className="upcoming">
              <h1 className='upcoming-h1'>Currently in cinemas:</h1>
              <div className="movie-list">
                {nowPlaying.length > 0 && nowPlaying.slice(0,8).map((movie, index) => {
                  return <div onMouseLeave={() => handleHover(index)} onMouseOver={() => handleHover(index)}><TvItem key={movie.id} image={movie.poster_path} title={movie.original_title} year={movie.release_date.substring(0, 4)} id={movie.id} onMouseOver={handleHover}
                  type="movie"/></div>
                })}
              </div>
            </div>
        </div>

        <Footer className="footer"/>
    </div>
  )
}

export default Movie