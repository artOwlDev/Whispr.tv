
import React from 'react'
import "./homepageinfo.scss"
import banner from "../img/movie.jpg"

const HomePageInfo = () => {
  return (
    <div className='home-page-info'>
        <div className="box1">
            <div className="box1-description">
                <h1>Find your favorite movies and tv-shows</h1>
                <p>We've gathered thousands of movies and tv-shows from the internet. Search for one to get started!</p>
                <img src={banner} />
            </div>
        </div>
        <div className="box2">

        </div>
    </div>
  )
}

export default HomePageInfo