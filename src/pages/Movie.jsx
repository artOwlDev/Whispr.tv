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


const Movie = () => {
  
  const {id} = useParams();

  const[details, setDetails] = useState([]);
  const[movieGenreList, setMovieGenreList] = useState([]);
  const[topRated, setTopRated] = useState([]);
  const[upcoming, setUpcoming] = useState([]);
  const[nowPlaying, setNowPlaying] = useState([]);
  const[hotMovies, setHotMovies] = useState([]);
  const IMAGES = "https://image.tmdb.org/t/p/original"
  const [hoveredIndex, setHoveredIndex] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const[tab, setActiveTab] = useState('genre');
  const[genre, setGenre] = useState(28);
  const [displayResultsText, setDisplayResultsText] = useState("Action")


  useEffect(() => {
    document.title = `Movies | Whispr`;
    const timer = setTimeout(() => {
      setIsLoading(false);
    },500); 

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

            <div className="movie-filter">
							<div className="filter-panel">
									<div className="general-filters">
									  <div className="header">
										  <h1>General</h1>
										</div>

										<div className="options">

											<div className={tab === 'whatsNew' ? 'options-element active': 'options-element'} onClick={() => setActiveTab('whatsNew')}><p>What's new</p></div>
											<div className={tab === 'comingSoon' ? 'options-element active': 'options-element'} onClick={() => setActiveTab('comingSoon')}><p>Coming soon</p></div>
											<div className={tab === 'popular' ? 'options-element active': 'options-element'}><p>Popular</p></div>									
											<div className={tab === 'highest' ? 'options-element active': 'options-element'} onClick={() => setActiveTab('highest')}><p>Sort by rating: Highest</p></div>																		
											<div className={tab === 'lowest' ? 'options-element active': 'options-element'}><p>Sort by rating: Lowest</p></div>																		
										</div>
															
									</div>

									
									<div className="genre-filters">
										<div className="header">
											<h1>Genre</h1>
										</div>

										<div className="options">

											<div className={genre === '28' ? 'options-element active': 'options-element'} onClick={() => setGenre('28')}>Action</div>
											<div className={genre === '12' ? 'options-element active': 'options-element'} onClick={() => setGenre('12')}>Adventure</div>
											<div className={genre === '16' ? 'options-element active': 'options-element'} onClick={() => setGenre('16')}>Animation</div>									
											<div className={genre === '35' ? 'options-element active': 'options-element'} onClick={() => setGenre('35')}>Comedy</div>																		
											<div className={genre === '99' ? 'options-element active': 'options-element'} onClick={() => setGenre('99')}>Documentary</div>																		
											<div className={genre === '18' ? 'options-element active': 'options-element'} onClick={() => setGenre('18')}>Drama</div>																		
											<div className={genre === '14' ? 'options-element active': 'options-element'} onClick={() => setGenre('14')}>Fantasy</div>																		
											<div className={genre === '27' ? 'options-element active': 'options-element'} onClick={() => setGenre('27')}>Horror</div>																		
											<div className={genre === '878' ? 'options-element active': 'options-element'} onClick={() => setGenre('878')}>Science Fiction</div>																		
											<div className={genre === '10749' ? 'options-element active': 'options-element last'} onClick={() => setGenre('10749')}>Romance</div>																		
										</div>
                    

									</div>

									<div className="release-year-filters">

									</div>
							</div>

							<div className="filter-results">

                {tab === 'genre' && (
                  <div className="genre-results">
                    
                    {movieGenreList.length > 0 && movieGenreList.slice(0,28).map((movie) => {

                      return <div className='filter-result-item'>
                        <Link to={`./details/${movie.id}`}>
                          <img src={IMAGES + movie.poster_path}/>
                        </Link>

                        <div className="movie-rating">
                        {[...Array(5)].map((_, index) => (
                          <span
                            key={index}
                            className={`star ${index < Math.floor(movie.vote_average / 2) ? 'gold' : 'blue'}`}
                          >
                            {index < Math.floor(movie?.vote_average / 2) ? (
                              <span style={{ color: "white" }} className="star-icon-full">&#9733;</span>
                            ) : (
                              <span className="star-icon-empty">&#9734;</span>
                            )}
                          </span>
                        ))}

                       
                      </div>
                      <Link>
                        <div className="movie-details">
                            <p>{movie.title}</p>
                            <p>{movie.release_date.substring(5)}</p>
                        </div>
                      </Link>
                      
                      </div>
                    })}
                  </div>
                )}

                {tab === 'whatsNew' && (
                  <div className="genre-results">
                    {nowPlaying.length > 0 && nowPlaying.slice(0,20).map((movie) => {

                      return <div className='filter-result-item'>
                        <Link to={`./details/${movie.id}`}>
                          <img src={IMAGES + movie.poster_path}/>
                        </Link>

                        <div className="movie-rating">
                        {[...Array(5)].map((_, index) => (
                          <span
                            key={index}
                            className={`star ${index < Math.floor(movie.vote_average / 2) ? 'gold' : 'blue'}`}
                          >
                            {index < Math.floor(movie?.vote_average / 2) ? (
                              <span style={{ color: "white" }} className="star-icon-full">&#9733;</span>
                            ) : (
                              <span className="star-icon-empty">&#9734;</span>
                            )}
                          </span>
                        ))}

                       
                      </div>
                      <Link>
                        <div className="movie-details">
                            <p>{movie.title}</p>
                            <p>{movie.release_date.substring(5)}</p>
                        </div>
                      </Link>
                      
                      </div>
                    })}
                  </div>
                )}

                {tab === 'comingSoon' && (
                  <div className="genre-results">
                    {upcoming.length > 0 && upcoming.slice(0,20).map((movie) => {

                      return <div className='filter-result-item'>
                        <Link to={`./details/${movie.id}`}>
                          <img src={IMAGES + movie.poster_path}/>
                        </Link>

                        <div className="movie-rating">
                        {[...Array(5)].map((_, index) => (
                          <span
                            key={index}
                            className={`star ${index < Math.floor(movie.vote_average / 2) ? 'gold' : 'blue'}`}
                          >
                            {index < Math.floor(movie?.vote_average / 2) ? (
                              <span style={{ color: "white" }} className="star-icon-full">&#9733;</span>
                            ) : (
                              <span className="star-icon-empty">&#9734;</span>
                            )}
                          </span>
                        ))}

                       
                      </div>
                      <Link>
                        <div className="movie-details">
                            <p>{movie.title}</p>
                            <p>{movie.release_date.substring(5)}</p>
                        </div>
                      </Link>
                      
                      </div>
                    })}
                  </div>
                )}

                {tab === 'highest' && (
                  <div className="genre-results">
                    {topRated.length > 0 && topRated.slice(0,28).map((movie) => {

                      return <div className='filter-result-item'>
                        <Link to={`./details/${movie.id}`}>
                          <img src={IMAGES + movie.poster_path}/>
                        </Link>

                        <div className="movie-rating">
                        {[...Array(5)].map((_, index) => (
                          <span
                            key={index}
                            className={`star ${index < Math.floor(movie.vote_average / 2) ? 'gold' : 'blue'}`}
                          >
                            {index < Math.floor(movie?.vote_average / 2) ? (
                              <span style={{ color: "white" }} className="star-icon-full">&#9733;</span>
                            ) : (
                              <span className="star-icon-empty">&#9734;</span>
                            )}
                          </span>
                        ))}

                       
                      </div>
                      <Link>
                        <div className="movie-details">
                            <p>{movie.title}</p>
                            <p>{movie.release_date.substring(5)}</p>
                        </div>
                      </Link>
                      
                      </div>
                    })}
                  </div>
                )}





                
                    
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
