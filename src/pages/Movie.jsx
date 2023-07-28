import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Footer from '../components/Footer'
import { Nav } from '../components/Nav'
import { TvItem } from '../components/TvItem';
import { AiFillStar } from 'react-icons/ai';
import { Carousel } from 'react-responsive-carousel';
import { RaceBy } from '@uiball/loaders'
import Loader from '../components/Loader';
import {TbStarHalfFilled, TbStarFilled} from "react-icons/tb"



const Movie = () => {
  
  const {id} = useParams();

  const[details, setDetails] = useState([]);
  const[movieGenreList, setMovieGenreList] = useState([]);
  const[topRated, setTopRated] = useState([]);
  const[lowestRated, setLowestRated] = useState([]);

  const[action, setAction] = useState([]);
  const[scifi, setScifi] = useState([]);
  const[animation, setAnimation] = useState([]);

  const[upcoming, setUpcoming] = useState([]);
  const[nowPlaying, setNowPlaying] = useState([]);
  const[hotMovies, setHotMovies] = useState([]);
  const IMAGES = "https://image.tmdb.org/t/p/original"
  const [hoveredIndex, setHoveredIndex] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const[tab, setActiveTab] = useState('genre');
  const[genre, setGenre] = useState(28);
  const [displayResultsText, setDisplayResultsText] = useState("Action")

  const totalStars = 5;
  const ratingOutOf5 = Math.floor((details.vote_average / 2) * 2) / 2; // Convert rating out of 10 to rating out of 5 and round to the nearest half smaller

  const fullStars = Math.floor(ratingOutOf5);
  const hasHalfStar = (ratingOutOf5 - fullStars) >= 0.5;


  useEffect(() => {
    document.title = `Movies | Whispr`;
    const timer = setTimeout(() => {
      setIsLoading(false);
    },100); 

    
    
    return () => clearTimeout(timer);
  }, [])

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
    async function getUpcoming(){
        try{
            const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=1`)
            setUpcoming(response.data.results)
        }
        catch(error){
            console.log(error);
            console.log("STAR IS" + fullStars + " " + ratingOutOf5)
        }
    }
    getUpcoming();
},[])
  

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

  useEffect(() => {
    async function getActionMovies(){
      try{
          const response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_TMDB_API_KEY}&with_genres=28&page=1`)
          console.log(response.data);
          setAction(response.data.results)
      }
      catch(error){
          console.log(error);
      }
  }
    getActionMovies();
  },[])

  useEffect(() => {
    async function getAnimationMovies(){
      try{
          const response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_TMDB_API_KEY}&with_genres=16&page=1`)
          console.log(response.data);
          setAnimation(response.data.results)
      }
      catch(error){
          console.log(error);
      }
  }
    getAnimationMovies();
  },[])

  useEffect(() => {
    async function getSciFiMovies(){
      try{
          const response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_TMDB_API_KEY}&with_genres=878&page=1`)
          console.log(response.data);
          setScifi(response.data.results)
      }
      catch(error){
          console.log(error);
      }
  }
    getSciFiMovies();
  },[])


  useEffect(() => {
    async function getMovieByGenre(){
      try{
        const response1 = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&with_genres=${genre}&page=1`);
        const response2 = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&with_genres=${genre}&page=2`);
        const response3 = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&with_genres=${genre}&page=3`);

        const movies1 = response1.data.results;
        const movies2 = response2.data.results;
        const movies3 = response3.data.results;

        const updatedMovieGenreList = [...movies1, ...movies2, ...movies3];
        console.log(updatedMovieGenreList)
        

        setMovieGenreList(updatedMovieGenreList);
        
        
      } catch (error) {
        console.log(error);
      }
    
     
    }

    setActiveTab('genre');
    
    getMovieByGenre();
  },[genre])


  useEffect(() => {
    async function getTopRated(){
        try{
          const response1 = await axios.get(`http://api.themoviedb.org/3/discover/movie?sort_by=vote_average.desc&api_key=${import.meta.env.VITE_TMDB_API_KEY}&page=1&vote_count.gte=300`)
          const response2 = await axios.get(`http://api.themoviedb.org/3/discover/movie?sort_by=vote_average.desc&api_key=${import.meta.env.VITE_TMDB_API_KEY}&page=2&vote_count.gte=300`)
          const response3 = await axios.get(`http://api.themoviedb.org/3/discover/movie?sort_by=vote_average.desc&api_key=${import.meta.env.VITE_TMDB_API_KEY}&page=3&vote_count.gte=300`)

          const movies1 = response1.data.results;
          const movies2 = response2.data.results;
          const movies3 = response3.data.results;

          const updatedMovieGenreList = [...movies1, ...movies2, ...movies3];
          console.log(updatedMovieGenreList)
          

          setTopRated(updatedMovieGenreList);
        }
        catch(error){
            console.log(error);
        }
    }
    getTopRated();
  },[id]) 

  useEffect(() => {
    async function getLowestRated(){
        try{
          const response1 = await axios.get(`http://api.themoviedb.org/3/discover/movie?sort_by=vote_average.asc&api_key=${import.meta.env.VITE_TMDB_API_KEY}&page=1&vote_count.gte=300`)
          const response2 = await axios.get(`http://api.themoviedb.org/3/discover/movie?sort_by=vote_average.asc&api_key=${import.meta.env.VITE_TMDB_API_KEY}&page=2&vote_count.gte=300`)
          const response3 = await axios.get(`http://api.themoviedb.org/3/discover/movie?sort_by=vote_average.asc&api_key=${import.meta.env.VITE_TMDB_API_KEY}&page=3&vote_count.gte=300`)

          const movies1 = response1.data.results;
          const movies2 = response2.data.results;
          const movies3 = response3.data.results;

          const updatedMovieGenreList = [...movies1, ...movies2, ...movies3];
          console.log(updatedMovieGenreList)
          

          setLowestRated(updatedMovieGenreList);
        }
        catch(error){
            console.log(error);
        }
    }
    getLowestRated();
  },[id]) 

  


  return (
    <div>
      {isLoading ? (
        <Loader/>
      ) : (
        <>
          <Nav/>

          <div className="movie-container">
            <div className="movie-carousel">

              <Carousel showArrows={true} showThumbs={false} showStatus={false} showIndicators={false} useKeyboardArrows={true} autoPlay={true} interval={5000} infiniteLoop={true}>
                {nowPlaying.length > 0 && nowPlaying.slice(0, 20).map((movie) => (
                  <div className='upcoming-movie-div' key={movie.id}>
                    <div className="upcoming-movie-div">
                      <img loading="lazy" src={IMAGES + movie.backdrop_path} style={{ background: "linear-gradient(to bottom, transparent 50%, #14171d 100%)" }} />
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
                        <div className="star-rating">
                          {[...Array(5)].map((_, index) => {
                            const totalStars = 5;
                            const ratingOutOf5 = Math.floor((movie.vote_average / 2) * 2) / 2; // Convert rating out of 10 to rating out of 5 and round to the nearest half
                            const fullStars = Math.floor(ratingOutOf5);
                            const hasHalfStar = ratingOutOf5 - index >= 0.5;
                            const isFullStar = index < fullStars;

                            return (
                              <span
                                key={index}
                                className={`star ${isFullStar ? "gold" : hasHalfStar ? "gold" : "blue"}`}
                              >
                                {isFullStar ? (
                                  <span className="star-icon full">
                                    <AiFillStar />
                                  </span>
                                ) : hasHalfStar ? (
                                  <span className="star-icon half">
                                    <TbStarHalfFilled />
                                  </span>
                                ) : (
                                  <span className="star-icon-empty">
                                    <AiFillStar />
                                  </span>
                                )}
                              </span>
                            );
                          })}

                      
                        </div>

                      </div>



                      <Link to={`../movies/details/${movie.id}`}>
                        <button className='upcoming-movie-button'>View Details</button>
                      </Link>
															
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>

            

          </div>

          <div className="movie-selection-list">

            <h1 className='title'>Criticlally Acclaimed Movies</h1>


            <div className="movie-display">



              <div className="movie-selection-display">
                {topRated.length > 0 && topRated.slice(0,18).map((movie) => {
                  return <TvItem key={movie.id} image={movie.poster_path} title={movie.title} year={movie.release_date.substring(0, 4)} id={movie.id} type="movie"/>
                })}

              </div>


            </div> 

       
          </div>
          <div className="movie-selection-list">

            <h1 className='title'>Action</h1>


            <div className="movie-display">



              <div className="movie-selection-display">
                {action.length > 0 && action.slice(0,18).map((movie) => {
                  return <TvItem key={movie.id} image={movie.poster_path} title={movie.title} year={movie.release_date.substring(0, 4)} id={movie.id} type="movie"/>
                })}

              </div>


            </div> 

       
          </div>
          <div className="movie-selection-list">

            <h1 className='title'>Sci-Fi</h1>


            <div className="movie-display">



              <div className="movie-selection-display">
                {scifi.length > 0 && scifi.slice(0,18).map((movie) => {
                  return <TvItem key={movie.id} image={movie.poster_path} title={movie.title} year={movie.release_date.substring(0, 4)} id={movie.id} type="movie"/>
                })}

              </div>


            </div> 

       
          </div>
          <div className="movie-selection-list">

            <h1 className='title'>Animation</h1>


            <div className="movie-display">



              <div className="movie-selection-display">
                {animation.length > 0 && animation.slice(0,18).map((movie) => {
                  return <TvItem key={movie.id} image={movie.poster_path} title={movie.title} year={movie.release_date.substring(0, 4)} id={movie.id} type="movie"/>
                })}

              </div>


            </div> 

       
          </div>

          <Footer />
        </>
      )}
    </div>
  )
}

export default Movie
