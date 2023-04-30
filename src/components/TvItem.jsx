

import React from 'react'
import { Link } from 'react-router-dom'
import notfound from "../img/notfound.png"


export const TvItem = ({image,title,year,id,type}) => {

  const IMAGES = "https://image.tmdb.org/t/p/w1280"
  const mediaType = type === "tv" ? "tv" : "movie";

  return (


    <div className='tv-item'>
        <Link to={`../../${mediaType}/details/${id}`}>
          <div className="image">

            <img src={IMAGES + image} onError={(e) => { e.target.onerror = null; e.target.src = notfound }} alt="Movie poster" />
          </div>
        </Link>
        <h1>{title}</h1>
    </div>
  )
}
