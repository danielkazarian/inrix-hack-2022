import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import DefaultMap from '../components/map'

export default function Home() {
  return (
    <>
      <div className='flex flex-row h-screen w-screen'>
          <div className='w-1/3 border-2 border-black'>

          </div>
          <div className='w-2/3'>
            <DefaultMap></DefaultMap>
          </div>
      </div>
    </>

  )
}
