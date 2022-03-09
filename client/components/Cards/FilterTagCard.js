import React from "react";
import { removeTag } from "../../store/filter";
import { useDispatch } from "react-redux";
import { Chip } from "@mui/material";

export const FilterTagCard = (props) => {
  const { tag } = props

  const dispatch = useDispatch()


  return(
    <Chip label={tag} variant="outlined" onClick={() => {dispatch(removeTag(tag))}}/>
  )
}

export default FilterTagCard
