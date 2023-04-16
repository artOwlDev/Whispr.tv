

import React from 'react'
import { Link } from 'react-router-dom'


export const TvItem = ({image,title,year,id,type}) => {

  const IMAGES = "https://image.tmdb.org/t/p/w1280"
  const mediaType = type === "tv" ? "tv" : "movie";

  return (


    <div className='tv-item'>
        <Link to={`${mediaType}/details/${id}`}>
          <div className="image">
            <img src={IMAGES + image} alt="" />
          </div>
        </Link>
        <h1>{title}</h1>
    </div>
  )
}
