
import React from 'react'
import "./search.scss"

const Search = () => {
  return (
    <div className='search'>
        
        
        <h1 style={{fontSize: "2rem",fontFamily: "'Poppins', sans-serif"}}>Got something in mind?</h1>
        <input id="search" type="search" placeholder="Search for a TV series..." autofocus required />
    </div>
  )
}

export default Search