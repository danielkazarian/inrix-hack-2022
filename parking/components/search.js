import React, {useState, useContext} from "react";
import { addressToCoordinates } from "../services/geocode"
import { SearchContext } from '../context/search-context'

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
        <form className="flex flex-row w-[22rem] h-[3em] border-2 border-black" onSubmit={saveSearch}>
            <input className='w-full' placeholder="address" value={search} onChange={changeSearch}></input>
            <button onClick={saveSearch}>Search</button>
        </form>
    )
}

export default Search