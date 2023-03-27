
import React from 'react'
import "./homepageinfo.scss"
import banner from "../img/watch.png"
import rating from "../img/rating.png"

const HomePageInfo = () => {
  return (
    <div className='home-page-info'>
      <div className="watch">
        <div className="box1">
              <div className="box1-description">
                  <h1>Find your favorite TV-shows</h1>
                  <p>We've gathered thousands of movies and tv-shows from the internet. Search for one to get started!</p>
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
                    <p>Share what you think about the tv-show and give a rating.</p>
                </div>
            </div>
            
      </div>
        
    </div>
  )
}

export default HomePageInfo