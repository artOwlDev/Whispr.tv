

import React from 'react'
import "./tvItem.scss"


export const TvItem = ({image,title,year,id}) => {

  const IMAGES = "https://image.tmdb.org/t/p/w1280"

  return (


    <div className='tv-item'>
        <img src={IMAGES + image} alt="" />
        <h1>{title}</h1>
    </div>
  )
}
