

import React from 'react'
import HomePageInfo from '../components/HomePageInfo'
import { ListMovie } from '../components/ListMovie'
import { Nav } from '../components/Nav'
import Search from '../components/Search'

export const Home = () => {
  return (
    <div>
        <Nav/>
        <Search/>
        <HomePageInfo/>
        <ListMovie/>
    </div>
  )
}
