
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import banner from "../img/banner.jpg"
import { authFirebase } from '../../utils/firebase'; 
import { useAuthState } from 'react-firebase-hooks/auth';


const Search = () => {
  const searchTMDBMovie =  `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US$page=1&query=`
  const searchTMDBTV = ` https://api.themoviedb.org/3/search/tv?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=1&query=`

  const [filteredData, setFilteredData] = useState([]);
  const [filteredTV, setFilteredTV] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [activeButton, setActiveButton] = useState("");
  const IMAGES = "https://image.tmdb.org/t/p/w1280"
  const searchRef = useRef(null);
  const[user, loading] = useAuthState(authFirebase);

  


  const handleFilter = (event) => {
    event.preventDefault();
    axios.get(searchTMDBMovie + searchVal).then(res => {
      console.log(res.data + "hi");
      setFilteredData(res.data.results);
    })
    .catch(err => console.log(err));
  }

  useEffect(() => {
    if (searchVal !== '') {
      const timeoutId = setTimeout(() => {
        Promise.all([
          axios.get(searchTMDBMovie + searchVal),
          axios.get(searchTMDBTV + searchVal)
        ])
        .then(responses => {
          const movies = responses[0].data.results;
          const tvShows = responses[1].data.results;
          const combinedResults = movies.concat(tvShows);
          console.log(combinedResults);
          setFilteredData(combinedResults);
        })
        .catch(err => console.log(err));
      }, 500); // Wait for 500ms after user stops typing to make API call
      return () => clearTimeout(timeoutId);
    } else {
      setFilteredData([]);
    }
  }, [searchVal]);
  

  const handleSearch = (e) => {
    if (e.target.value == ""){
      setFilteredData([]);
    }
    setSearchVal(e.target.value);
  }

  const handleClick = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setFilteredData([]);
    }
  }

  useEffect(() => {
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);


 



  return (
    <React.Fragment>
      <div className='search'>
          

          <h1 className='search-title'>Movies, TV series all in one.</h1>

          <form onSubmit={handleFilter}>
            <input id="search" type="search" placeholder="Got something in mind?" autofocus required value={searchVal} onChange={handleSearch}/>
          </form>

          <div className="search-results" ref={searchRef}>
            {searchVal != '' && filteredData.length > 0 && filteredData.sort((a, b) => b.popularity - a.popularity).slice(0,3).map((movie) => {
                  return <Link to={`/${movie.release_date ? 'movie' : 'tv'}/details/${movie.id}`}><div className="loaded-info">
                      <img src={IMAGES + movie.poster_path} alt="" />
                      <h1>{movie.title || movie.name} </h1>
                      <p>{movie.release_date?.substring(0,4) || movie.first_air_date?.substring(0,4)}</p>
                  </div>
                  </Link>
              })
            }
          </div>  
          
      </div>
    </React.Fragment>
  )
}

export default Search