import React from 'react'
import './nav.scss'


import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Search } from '@mui/icons-material';

export const Nav = () => {
  return (
    <div className='navbg'>
      <div className="nav">
        <div className='left-side'>
          

          <h1>Whisper</h1>
          
        </div> 



        <div className='right-side'>
          <div className="nav-items">
              <span>Albums</span>
              <span>Reviews</span>
              <span>Watchlist</span>
              <span>Discover</span>
              <span>ArtuniPuni</span>
              <Search className='search-icon'/>
          </div>
        </div>
      </div>
    </div>
  )
}
