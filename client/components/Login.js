import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, me } from '../store/auth';
import { useHistory, Link } from 'react-router-dom';
import { Container, Box, Typography, Avatar, TextField, Button } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';

const Login = () => {
	const [emailError, setEmailError] = useState('')
	const [passwordError, setPasswordError] = useState('')

	const dispatch = useDispatch();
	const history = useHistory()

	const handleSubmit = (event) => {
    event.preventDefault();
		const data = new FormData(event.currentTarget);
		const user = {email: data.get('email'),password: data.get('password')}

		let tempEmailError = ''
		let tempPasswordError = ''

		if(!isEmail(user.email)){
			tempEmailError = 'Please enter in a valid email'
		}

		if(user.password.length < 3){
			tempPasswordError = 'Password must be more than three characters'
		}

		if(tempEmailError || tempPasswordError){
			setEmailError(tempEmailError)
			setPasswordError(tempPasswordError)
			return
		} else {
			dispatch(login(user))
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

	return (
		<Container>
			<Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlined />
        </Avatar>
				<Typography variant='h4'>Log In</Typography>

				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

					<TextField id="email" label="Email" name='email' variant="filled"
					margin="normal" fullWidth required autoComplete='email' autoFocus
					error={!!emailError} helperText={emailError}/>

					<TextField id="password" label="Password" name='password' variant="filled"
					margin="normal" fullWidth required autoComplete="current-password"
					type="password" error={!!passwordError}
					helperText={passwordError}/>

					<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign In</Button>
					<Link to='/signup' variant="body2">Don't have an account? Sign Up</Link>
				</Box>
			</Box>
		</Container>
	);
};

export default Login;

				// At Rent-a-Buddy™ we take the capitalistic approach to having friends.
				// Have your buddy spend time with you for as little as one day or up to a
				// week! Your buddy can accompany you to a wedding, vacation to the
				// Bahamas, or just a walk in the park. As one customer notes, “I have real
				// friends, this is just more convenient.”
