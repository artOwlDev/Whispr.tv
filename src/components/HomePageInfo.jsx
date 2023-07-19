
import React from 'react'
import banner from "../img/watch.png"
import rating from "../img/rating.png"
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const HomePageInfo = () => {
  return (
    <div className='home-page-info'>
      <div className="watch">
        <div className="box1">
              <div className="box1-description">
                  <h1>Find whatever you're looking for.</h1>
                  <p>We have compiled a vast collection of movies and TV series from the internet. Begin your search to find exactly what you're seeking!</p>
                  
              </div>
          </div>
          <div className="box2">
            <img src={banner} />

          </div>
      </div>

      <div className="rating">
        <div className="boxB">
          <img src={rating} />

        </div>
        <div className="boxA">
            <div className="boxA-description">
                <h1>Write a review!</h1>
                <p>Share your thoughts on a variety of selections about a movie or tv series!</p>
                
            </div>
        </div>
      </div>
        
    </div>
  )
}

export default HomePageInfo