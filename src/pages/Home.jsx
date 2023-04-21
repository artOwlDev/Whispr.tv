

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Footer from '../components/Footer'
import HomePageInfo from '../components/HomePageInfo'
import { Nav } from '../components/Nav'
import Search from '../components/Search'
import { TvItem } from '../components/TvItem'
import { Link } from 'react-router-dom';

export const Home = () => {

  const [tv,setTv] = useState([]); 
  const [movies, setMovies] = useState([]);
  const [token, setToken] = useState('');
  const [albums, setAlbums] = useState([]);

  const TOP_RATED_TV =  `https://api.themoviedb.org/3/tv/top_rated?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=1`
  const TOP_RATED_ALBUMS = `https://api.deezer.com/chart/0/albums`
  const TOP_RATED_MOVIES = `https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=1`


  // useEffect(() => {
  //   const fetchToken = async () => {
  //     const response = await axios.post("https://accounts.spotify.com/api/token", 
  //     "grant_type=client_credentials", {
  //       headers: {
  //         Authorization: `Basic ${btoa(`${import.meta.env.VITE_SPOTIFY_CLIENT_ID}:${import.meta.env.VITE_SPOTIFY_CLIENT_SECRET_ID}`)}`,
  //           "Content-Type": "application/x-www-form-urlencoded",
  //       }
  //     });
  //     setToken(response.data.access_token);
  //   };

  //   fetchToken();
  // }, []);

  
  

  useEffect(() => {
    axios.get(TOP_RATED_TV)
      .then(res => {
        console.log(res.data);
        setTv(res.data.results);
      })
      .catch(err => console.log(err));
  }, []);

  


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
    <div className="home">
        <Nav/>
        <Search/>
        <HomePageInfo/>

        <h1 className='home-title'>Critically-acclaimed tv-series</h1>

        <div className="home-tv-display">
          <div className="popular-series-display">
            {tv.length > 0 && tv.slice(1,13).map((tv) => {
              return <TvItem key={tv.id} image={tv.poster_path} title={tv.name} year={tv.first_air_date.substring(0, 4)} id={tv.id} type="tv"/>
            })}

          </div>
        </div>
        
        <br></br>

        <h1 className='home-title'>Popular movies</h1>


        <div className="home-tv-display">
          <div className="popular-series-display">
            {movies.length > 0 && movies.slice(0,12).map((movie) => {
              return <TvItem key={movie.id} image={movie.poster_path} title={movie.original_title} year={movie.release_date.substring(0, 4)} id={movie.id} type="movie"/>
            })}

          </div>
        </div>        

        <Footer/>
    </div>
  )
}



