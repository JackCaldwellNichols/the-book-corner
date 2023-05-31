import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './home.scss'
import Mystery from '../../Components/Mystery/Mystery'
import Fantasy from '../../Components/Fantasy/Fantasy'
import Travel from '../../Components/Travel/Travel'

const Home = () => {

  return (
    <div className='home'>
      <h1 className='title'>The Book Corner</h1>
        <Mystery />
        <Fantasy />
        <Travel />
    </div>
  )
}

export default Home