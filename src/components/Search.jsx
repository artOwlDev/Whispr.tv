
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import "./search.scss"

const Search = () => {
  const searchTMDB =  `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en&query=`

  const [filteredData, setFilteredData] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const IMAGES = "https://image.tmdb.org/t/p/w1280"
  const searchRef = useRef(null);


  const handleFilter = (event) => {
    event.preventDefault();
    axios.get(searchTMDB + searchVal).then(res => {
      console.log(res.data);
      setFilteredData(res.data.results);
    })
    .catch(err => console.log(err));
  }

  useEffect(() => {
    if (searchVal !== '') {
      const timeoutId = setTimeout(() => {
        axios.get(searchTMDB + searchVal)
        .then(res => {
          console.log(res.data);
          setFilteredData(res.data.results);
        })
        .catch(err => console.log(err));
      }, 100); // Wait for 500ms after user stops typing to make API call
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
          <h1 style={{fontSize: "2rem",fontFamily: "'Poppins', sans-serif"}}>Movies, TV series and music all in one.</h1>
          <form onSubmit={handleFilter}>
            <input id="search" type="search" placeholder="Got something in mind?" autofocus required value={searchVal} onChange={handleSearch}/>
          </form>

          <div className="search-results" style={{position: 'absolute', top: '60%'}} ref={searchRef}>
            {searchVal != '' && filteredData.length > 0 && filteredData.slice(0,3).map((movie) => {
                  return <Link to={`/movie/details/${movie.id}`}><div className="loaded-info" style={{display: "flex", height: "10vh", width: "25vw", justifyContent: "space-around", gap: "1rem", alignItems: "center", boxShadow: "0 0 0.8px white",
                  backgroundSize: "100% 100%", margin: "5px", borderRadius: "1rem"}}>
                      <img src={IMAGES + movie.poster_path} style={{objectFit: "contain", height: "9vh"}} alt="" />
                      <h1 style={{width: "10vw", textAlign: "center"}}>{movie.title}</h1>
                      <p>{movie.release_date.substring(0,4)}</p>
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