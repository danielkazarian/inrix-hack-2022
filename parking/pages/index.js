import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import React, {useRef} from "react";

import DefaultMap from '../components/map'
import Search from '../components/search'
import LocationCards from '../components/LocationCards';
import {SearchContextProvider} from '../context/search-context'

export default function Home() {

  return (
    <>
    <SearchContextProvider>
        <div className='flex flex-row h-screen w-screen'>
            <div className='flex flex-col w-1/3'>
              <div className='flex justify-center mt-[2rem]'>
                <Search/>
              </div>
              <LocationCards/>
            </div>
            <div className='w-2/3'>
              <DefaultMap/>
            </div>
        </div>
      </SearchContextProvider>
    </>

  )
}
