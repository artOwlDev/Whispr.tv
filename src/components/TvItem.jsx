

import { style } from '@mui/system'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import notfound from "../img/notfound.png"


export const TvItem = ({image,title,year,id,type, onMouseOver}) => {

  const IMAGES = "https://image.tmdb.org/t/p/w1280"
  const mediaType = type === "tv" ? "tv" : "movie";

  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    setHasError(true);
  };

  return (


    <div className='tv-item'>
        <Link to={`../../${mediaType}/details/${id}`}>
          <div className="image">

          <img
          src={hasError ? notfound : IMAGES + image}
          onError={handleImageError}
          className={hasError ? 'cover-image' : ''}
          alt="Movie poster"
        />
          </div>
        </Link>
        <h1>{title}</h1>
    </div>
  )
}
