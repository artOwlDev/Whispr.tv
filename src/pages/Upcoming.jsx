
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import { Nav } from '../components/Nav'
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';


const Upcoming = () => {

    const[upcoming, setUpcoming] = useState([]);
    const IMAGES = "https://image.tmdb.org/t/p/original"
    const[isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        document.title = `Upcoming | Whispr`;
        const timer = setTimeout(() => {
            setIsLoading(false);
          },500); // Set the delay time in milliseconds (2 seconds in this example)
      
          return () => clearTimeout(timer);
    },[])


    useEffect(() => {
        async function getUpcoming(){
            try{
                const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=1`)
                setUpcoming(response.data.results)
            }
            catch(error){
                console.log(error);
            }
        }
        getUpcoming();
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


      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth() + 1; // Adding 1 since getMonth() returns zero-based index
      const currentDay = now.getDate();

      const filteredMovies = upcoming.filter((movie) => {
        const releaseYear = parseInt(movie.release_date.substring(0, 4), 10);
        const releaseMonth = parseInt(movie.release_date.substring(5, 7), 10);
        const releaseDay = parseInt(movie.release_date.substring(8, 10), 10);

        if (currentYear > releaseYear) {
          return false; // Filter out movies from previous years
        } else if (currentYear === releaseYear) {
          return !(currentMonth > releaseMonth || (currentMonth === releaseMonth && currentDay >= releaseDay));
        } else {
          return true; // Include movies from future years
        }
      });

      return (
        <div>
          {isLoading ? (
            <Loader/>
          ) : (
            <>
              <Nav />
    
              <div className="movie-container">
                <Carousel showArrows={true} showThumbs={false} showStatus={false} showIndicators={false} useKeyboardArrows={true} autoPlay={true} interval={6500} infiniteLoop={true}>
                  {filteredMovies.length > 0 && filteredMovies.slice(0, 20).map((movie) => (
                    <div className='upcoming-movie-div' key={movie.id}>
                      <div className="upcoming-movie-div">
                        <img src={IMAGES + movie.backdrop_path} style={{ background: "linear-gradient(to bottom, transparent 50%, #14171d 100%)" }} />
                      </div>
    
                      <div className="upcoming-movie-div-details">
                        <h1>{movie.title}</h1>
    
                        <div className="upcoming-movie-genres">
                          {movie.genre_ids?.slice(0, movie.genre_ids.length - 1).map((genreId) => {
                            const genreName = genreTable[genreId];
                            return (
                              <div className="upcoming-movie-genre-box" key={genreId}>
                                {genreName}
                              </div>
                            );
                          })}
                        </div>
    
                        <p className='upcoming-movie-release-date'>Release Date: {movie.release_date.substring(5)}</p>
    
                        <div className="upcoming-movie-rating">
                          {[...Array(5)].map((_, index) => (
                            <span
                              key={index}
                              className={`star ${index < Math.floor(movie.vote_average / 2) ? 'gold' : 'blue'}`}
                            >
                              {index < Math.floor(movie?.vote_average / 2) ? (
                                <span style={{ color: "gold" }} className="star-icon-full">&#9733;</span>
                              ) : (
                                <span className="star-icon-empty">&#9733;</span>
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

export default Upcoming