import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import ExploreCategories from '../../components/ExploreCategories/ExploreCategories'
import AboutTT from '../../components/AboutTT/AboutTT'
import MostVisited from '../../components/MostVisited/MostVisited'


const Home = ({setShowLogin}) => {

  const [category,setCategory] = useState("All")

  return (
    <>
      <Header setShowLogin={setShowLogin}/>
      <AboutTT/>
      <MostVisited/>
    </>
  )
}

export default Home
