import React, { Fragment, useState } from 'react'
import "./Search.css"
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const navigate=useNavigate()
    const [keyWord,setKeyword] = useState("")
    const handleOnSearch=(e)=>{
        e.preventDefault()
        if(keyWord.trim()){
            navigate(`/products/${keyWord}`)
        }else{
            navigate(`/products`)
        }
    }
  return (
    <Fragment>
        <form className='search-box' onSubmit={handleOnSearch}>
<input 
type="text"
placeholder='Search a product ...' 
onChange={(e)=>setKeyword(e.target.value)}
/>
<input type="submit" value="Search"/>
        </form>
    </Fragment>
  )
}

export default Search