
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Footer from '../components/Footer'
import { Nav } from '../components/Nav'
import { TvItem } from '../components/TvItem';
import { Carousel } from 'react-responsive-carousel';
import Loader from '../components/Loader';


const Tv = () => {
  const {id} = useParams();

  const[details, setDetails] = useState([]);
  const[nowPlaying, setNowPlaying] = useState([]);
  const[hotMovies, setHotMovies] = useState([]);
  const IMAGES = "https://image.tmdb.org/t/p/original"
  const[isLoading, setIsLoading] = useState(true);

  const [hoveredIndex, setHoveredIndex] = useState(1);


  useEffect(() => {
    document.title = `TV · Whispr`;
    const timer = setTimeout(() => {
        setIsLoading(false);
      },500); // Set the delay time in milliseconds (2 seconds in this example)
  
      return () => clearTimeout(timer);
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
          
            const response = await axios.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-CA&page=1`)
            console.log(response.data);
            setNowPlaying(response.data.results)
        }
        catch(error){
            console.log(error);
        }
    }
    getNowPlaying();
  },[id]) 

  useEffect(() => {
    async function getHotMovies(){
        try{
            const response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=1`)
            console.log(response.data);
            setHotMovies(response.data.results)
        }
        catch(error){
            console.log(error);
        }
    }
    getHotMovies();

  },[]) 

  return (
    <div>
      {isLoading ? (
        <Loader/>
      ) : (
        <>
          <Nav />

          <div className="movie-container">
            <Carousel showArrows={true} showThumbs={false} showStatus={false} showIndicators={false} useKeyboardArrows={true} autoPlay={true} interval={6500} infiniteLoop={true}>
              {nowPlaying.length > 0 && nowPlaying.slice(0, 20).map((movie) => (
                <div className='upcoming-movie-div' key={movie.id}>
                  <div className="upcoming-movie-div">
                    <img src={IMAGES + movie.backdrop_path} style={{ background: "linear-gradient(to bottom, transparent 50%, #14171d 100%)" }} />
                  </div>

                  <div className="upcoming-movie-div-details">
                    <h1>{movie.name}</h1>

                    <div className="upcoming-movie-genres">
                      {movie.genre_ids?.slice(0, movie.genre_ids.length - 1).map((genreId) => {
                        const genreName = genreTable[genreId];
                        if (genreName != null){

                            return <div className="upcoming-movie-genre-box" key={genreId}>
                                {genreName}
                                </div>;
                        }
                      })}
                    </div>

                    <p className='upcoming-movie-release-date'>Release Date: {movie.first_air_date.substring(5)}</p>

                    <div className="upcoming-movie-rating">
                      {[...Array(5)].map((_, index) => (
                        <span
                          key={index}
                          className={`star ${index < Math.floor(movie.vote_average / 2) ? 'gold' : 'blue'}`}
                        >
                          {index < Math.floor(movie?.vote_average / 2) ? (
                            <span style={{ color: "gold" }} className="star-icon-full">&#9733;</span>
                          ) : (
                            <span className="star-icon-empty">&#9734;</span>
                          )}
                        </span>
                      ))}
                    </div>

                    <Link to={`../movie/details/${movie.id}`}>
                      <button className='upcoming-movie-button'>View Details</button>
                    </Link>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>

          <Footer />
        </>
      )}
    </div>
  )

  
}

export default Tv

