import React, { useState, useEffect } from "react";
import { addTag, changeGender } from "../store/filter";
import { useDispatch, useSelector } from "react-redux";
import { FilterTagCard } from "./Cards/FilterTagCard"
import { Grid, Typography, FormControl, InputLabel, MenuItem, Select, Container, OutlinedInput, IconButton, Box, Chip } from "@mui/material";
import { useAutocomplete } from "@mui/material";
import { fetchTags } from "../store/filter";
import AddIcon from '@mui/icons-material/Add';

const AllProductsFilter = () => {
  const { tags, gender } = useSelector((state) => state.filter)
  const [tag, setTag] = useState('')

  const dispatch = useDispatch()

  const handleAdd = () => {
    dispatch(addTag(tag.toLowerCase()))
    setTag('')
  }

  const handleTagChange = (event) => {
    setTag(event.target.value)
  }

  const handleGenderChange = (event) => {
    dispatch(changeGender(event.target.value))
  }

  const renderTags = (tags) => {
    if(tags.length === 0){
      return(<></>)
    } else {
      return tags.map(tag => <FilterTagCard key={tag} tag={tag} />)
    }
  }

  return(
    <Grid container spacing={2} sx={{mt: 1, mb: 1}}>
      <Grid item xs={12} sm={6} md={5} lg={3}>
        <Container>
          <FormControl fullWidth>
          <InputLabel id="ageLabel">Age</InputLabel>
            <Select value={gender} labelId="ageLabel" id="ageSelect" label="Age" onChange={handleGenderChange}>
              <MenuItem value=''>Any</MenuItem>
              <MenuItem value='male'>Male</MenuItem>
              <MenuItem value='female'>Female</MenuItem>
            </Select>
          </FormControl>
        </Container>
      </Grid>
      <Grid item xs={12} sm={6} md={7} lg={3}>
        <FormControl>
          <InputLabel htmlFor="component-outlined">Add Tag</InputLabel>
          <OutlinedInput id="component-outlined" onChange={handleTagChange} label="Add Tag" value={tag}/>
        </FormControl>
        <IconButton onClick={handleAdd}><AddIcon sx={{ fontSize: 40 }} /></IconButton>
      </Grid>
      <Grid item xs={12} sm={6} md={7} lg={3}>
        {renderTags(tags)}
      </Grid>
    </Grid>
  )
}

export default AllProductsFilter
