import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import React, {useRef} from "react";

import DefaultMap from '../components/map'
import Search from '../components/search'



export default function Home() {
  const geocoderContainerRef = useRef()

  return (
    <>
      <div className='flex flex-row h-screen w-screen'>
          <div className='flex flex-col w-1/3 border-2 border-black'>
            <div className='flex justify-center mt-[2rem]'>
              <Search geocoderContainerRef={geocoderContainerRef}></Search>
            </div>
          </div>
          <div className='w-2/3'>
            <DefaultMap geocoderContainerRef={geocoderContainerRef}></DefaultMap>
          </div>
      </div>
    </>

  )
}
