import React from "react";
import { removeTag } from "../../store/filter";
import { useDispatch } from "react-redux";

export const FilterTagCard = (props) => {
  const { tag } = props

  const dispatch = useDispatch()


  return(
    <div>
      <h3>{tag}</h3>
      <button onClick={() => {dispatch(removeTag(tag))}}>X</button>
    </div>
  )
}

export default FilterTagCard
