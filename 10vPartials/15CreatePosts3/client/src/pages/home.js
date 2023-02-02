import React from 'react'
import Status from '../components/home/Status'
import Posts from '../components/home/Posts'
const Home = () => {
  return (
    <div className="home row mx-0">
      <div className="col-md-8">

        <Status />
      </div>
      <div className="col-md-4">
        <Posts />
      </div>
    </div>
  )
}

export default Home