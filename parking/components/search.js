import React, {useState, useContext} from "react";
import { addressToCoordinates } from "../services/geocode"
import { SearchContext } from '../context/search-context'
import Image from 'next/image'

const Search = () => {
    const {location, changeLocation} = useContext(SearchContext)

    const [search, setSearch] = useState('')
    const changeSearch = (event) => {
        // console.log(event.target.value)
        setSearch(event.target.value)
    }

    const saveSearch = (event) => {
        event.preventDefault()
        changeLocation(search)
    }

    return (
        <form className="flex flex-row w-[22rem] h-[3em]" onSubmit={saveSearch}>
            <div className="flex flex-row w-full rounded-[1rem] text-[1.5rem] bg-[#EDF5FD] focus:outline-none border-[0.13rem] border-[#648690]">
                <input className='focus:outline-none bg-transparent ml-[0.5rem]' placeholder="address" value={search} onChange={changeSearch}></input>
                <div className='flex justify-end w-full'>
                    <button 
                        className='flex relative justify-end w-[40px] h-[26px] mt-[0.5rem] mr-[0.5rem]' 
                        onClick={saveSearch}
                    >
                        <Image   
                            src={`/images/search.png`} 
                            layout='fill'
                            alt='search'
                        />
                    </button>
                </div>
                
            </div>
        </form>
    )
}

export default Search