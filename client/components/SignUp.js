import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUp } from "../store/auth";
import { Container, Box, Typography, Avatar, TextField, Button } from '@mui/material';
import { LockOutlined } from "@mui/icons-material";

const SignUp = () => {
  const [emailError, setEmailError] = useState('')
	const [passwordError, setPasswordError] = useState('')
  const [firstNameError, setFirstNameError] = useState('')
	const [lastNameError, setLastNameError] = useState('')

  const dispatch = useDispatch()
  const history = useHistory()

  const handleSubmit = (event) => {
    event.preventDefault();
		const data = new FormData(event.currentTarget);
		const user = {
      email: data.get('email'),
      password: data.get('password'),
      firstName: toTitleCase(data.get('firstName')),
      lastName: toTitleCase(data.get('lastName'))
    }

		let tempEmailError = ''
		let tempPasswordError = ''
    let tempFirstNameError = ''
    let tempLastNameError = ''

		if(!isEmail(user.email)){
			tempEmailError = 'Please enter in a valid email'
		}

		if(user.password.length < 3){
			tempPasswordError = 'Password must be more than three characters'
		}

    if(user.firstName.length === 0){
      tempFirstNameError = 'Please enter in a first name'
    }

    if(user.lastName.length === 0){
      tempLastNameError = 'Please enter in a last name'
    }

		if(tempEmailError || tempPasswordError || tempFirstNameError || tempLastNameError){
			setEmailError(tempEmailError)
			setPasswordError(tempPasswordError)
      setFirstNameError(tempFirstNameError)
      setLastNameError(tempLastNameError)
			return
		} else {
			dispatch(signUp(user))
      .then(() => {history.push('/home')})
		}
  };

  const isEmail = (mail) => {
		if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
		{
			return (true)
		}
			return (false)
	}

  function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  return (
    <Container>
			<Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlined />
        </Avatar>
				<Typography variant='h4'>SignUp</Typography>

				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

          <TextField id='firstName' label='First Name' name='firstName' variant="filled"
          margin="normal" fullWidth required autoComplete='first name' autoFocus
          error={!!firstNameError} helperText={firstNameError}/>

          <TextField id='lastName' label='Last Name' name='lastName' variant="filled"
          margin="normal" fullWidth required autoComplete='last name'
          error={!!lastNameError} helperText={lastNameError}/>

					<TextField id="email" label="Email" name='email' variant="filled"
					margin="normal" fullWidth required autoComplete='email'
          error={!!emailError} helperText={emailError}/>

					<TextField id="password" label="Password" name='password' variant="filled"
					margin="normal" fullWidth required autoComplete="current-password"
					type="password" error={!!passwordError} helperText={passwordError}/>

					<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign In</Button>
					<Link to='/login' variant="body2">Already have an account? Log in</Link>
				</Box>
			</Box>
		</Container>
  );
};

export default SignUp
