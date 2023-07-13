
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
                  <p>We've gathered thousands of movies and tv-series from the internet. Search for one to get started!</p>
                  
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
                <p>Share what you think about the tv-series and give a rating.</p>
                <Link to={'/reviews'}>
                  <button style={{borderRadius: "1rem", margin: "1rem 0px", background: "#2596be", fontSize: "1.2rem", padding: "10px"}}>View Reviews</button>
                </Link>
            </div>
        </div>
      </div>
        
    </div>
  )
}

export default HomePageInfo