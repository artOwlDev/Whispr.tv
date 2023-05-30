
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import { Nav } from '../components/Nav'
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';


const Upcoming = () => {

    const[upcoming, setUpcoming] = useState([]);
    const IMAGES = "https://image.tmdb.org/t/p/original"

    useEffect(() => {
        document.title = `Upcoming · Whispr`;
    },[])




    

    useEffect(() => {
        async function getUpcoming(){
            try{
                const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=1`)
                console.log(response.data);
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



  return (
    <div>
        <Nav/>

        <div className="upcoming-container">
            <Carousel showArrows={true} showThumbs={false} showStatus={false} showIndicators={false} useKeyboardArrows={true} autoPlay={true} interval={10000} infiniteLoop={true}>
                {upcoming.length > 0 && upcoming.slice(0,12).map((movie) => {
                    return <div className='upcoming-movie-div' key={movie.id}>
                        <div className="upcoming-movie-div">
                            <img src={IMAGES + movie.backdrop_path} style={{backgorund: "linear-gradient(to bottom, transparent 50%, #14171d 100%)}}"}}/>
                        </div>
                        
                        
                        <div className="upcoming-movie-div-details">

                            <h1>{movie.title}</h1>

                            <div className="upcoming-movie-genres">
                                {movie.genre_ids?.slice(0, movie.genre_ids.length - 1).map((genreId) => {
                                    const genreName = genreTable[genreId];
                                    return <div className="upcoming-movie-genre-box" key={genreId}>
                                        {genreName}
                                        </div>;
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
                                <span style={{color: "gold"}} className="star-icon-full">&#9733;</span>
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
                })}

                
            </Carousel>
        </div>

        <Footer/>
    </div>
  )
}

export default Upcoming