
import React from 'react'
import "./search.scss"

const Search = () => {
  return (
    <div className='search'>
        
        
        <h1>Got something in mind?</h1>
        <input id="search" type="search" placeholder="Search for a movie or tv show.." autofocus required />
    </div>
  )
}

export default Search