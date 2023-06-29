

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Footer from '../components/Footer'
import HomePageInfo from '../components/HomePageInfo'
import { Nav } from '../components/Nav'
import Search from '../components/Search'
import { TvItem } from '../components/TvItem'
import { Link } from 'react-router-dom';
import action from "../img/action-genre.jpg"
import comedy from "../img/comedy-genre.jpg"
import scifi from "../img/sci-fi-genre.jpg"
import horror from "../img/horror-genre.jpg"
import adventure from "../img/adventure-genre.jpg"
import drama from "../img/drama-genre.jpg"
import Loader from '../components/Loader';

export const Home = () => {

  const [tv,setTv] = useState([]); 
  const [movies, setMovies] = useState([]);
  const [token, setToken] = useState('');
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const TOP_RATED_TV =  `https://api.themoviedb.org/3/tv/top_rated?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=1`
  const TOP_RATED_ALBUMS = `https://api.deezer.com/chart/0/albums`
  const TOP_RATED_MOVIES = `https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=1`
  

  useEffect(() => {
    axios.get(TOP_RATED_TV)
      .then(res => {
        console.log(res.data);
        setTv(res.data.results);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    document.title = `Home · Whispr`;
    const timer = setTimeout(() => {
      setIsLoading(false);
    },500); 

    return () => clearTimeout(timer);
  },[])


  useEffect(() => {
    axios.get(TOP_RATED_MOVIES)
    .then(res => {
      console.log(res.data);
      const filteredMovies = res.data.results.filter(
        (movie) => movie.original_language === "en"
      );
      setMovies(filteredMovies);
    })
    .catch(err => console.log(err));
  }, []);



  return (
    <div>
      {isLoading ? (
        <Loader/>
      ) : (
        <>
          <div className="home">
            <Nav/>
            <Search/>
            <HomePageInfo/>
            
            <h1 className='genre-title'>Pick a Genre:</h1>

            <div className="home-page-genre">
              <div className="home-page-genre-box">
                <img src={action} alt="" />

                <h1>Action</h1>

                <p>John Wick, 2014</p>
              </div>
              <div className="home-page-genre-box">
                <img src={drama} alt="" />
                <h1>Drama</h1>
              </div>
              <div className="home-page-genre-box">
                <img src={comedy} alt="" />

                <h1>Comedy</h1>
              </div>
              <div className="home-page-genre-box">
                <img src={horror} alt="" />
                <h1>Horror</h1>
              </div>
              <div className="home-page-genre-box">
                <img src={scifi} alt="" />

                <h1>Sci-Fi</h1>
              </div>
              <div className="home-page-genre-box">
                <img src={adventure} alt="" />
                <h1>Adventure</h1>
              </div>
              
              
            </div>

            <div className="critically-acclaimed-home-page">

              <h1 className='home-title'>Critically-acclaimed tv-series</h1>

              <div className="home-tv-display">
                <div className="popular-series-display">
                  {tv.length > 0 && tv.slice(1,8).map((tv) => {
                    return <TvItem key={tv.id} image={tv.poster_path} title={tv.name} year={tv.first_air_date.substring(0, 4)} id={tv.id} type="tv"/>
                  })}

                </div>
              </div>
              
            </div>
            <br></br>


            <div className="popular-movies-home-page">

              <h1 className='home-title'>Popular movies</h1>


              <div className="home-tv-display">
                <div className="popular-series-display">
                  {movies.length > 0 && movies.slice(0,7).map((movie) => {
                    return <TvItem key={movie.id} image={movie.poster_path} title={movie.original_title} year={movie.release_date.substring(0, 4)} id={movie.id} type="movie"/>
                  })}

                </div>
              </div>        
            </div>

            <Footer/>
      </div>
        </>
      )}
    </div>
  )
    
}



