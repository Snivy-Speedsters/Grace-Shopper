import React, { useState } from "react";
import { addTag, changeGender } from "../store/filter";
import { useDispatch, useSelector } from "react-redux";
import { FilterTagCard } from "./Cards/FilterTagCard"

const AllProductsFilter = () => {
  const { tags } = useSelector((state) => state.filter)
  const [tag, setTag] = useState('')

  const dispatch = useDispatch()

  const handleAdd = () => {
    dispatch(addTag(tag.toLowerCase()))
    setTag('')
  }

  const handleChange = (event) => {
    setTag(event.target.value)
  }

  const tagContainer = (tags) => {
    if(!tags.length){
      return (<></>)
    } else {
      return(
        <div>
          {tags.map(tag => <FilterTagCard tag={tag} key={tag} />)}
        </div>
      )
    }
  }

  return(
    <div>
      <h3>Gender: </h3>
      <select onChange={(event) => {dispatch(changeGender(event.target.value))}}>
        <option value=''>Any</option>
        <option value='male'>Male</option>
        <option value='female'>Female</option>
      </select>
      <h3>Tag: </h3>
      <input type='text' value={tag} onChange={(event) => {handleChange(event)}} />
      <button onClick={() => {handleAdd()}}>Add Tag</button>
      {tagContainer(tags)}
    </div>
  )
}

export default AllProductsFilter
