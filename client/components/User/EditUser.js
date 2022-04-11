import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser, me } from '../../store/auth';
import { useHistory } from 'react-router-dom';
import { Typography, TextField, Button } from '@mui/material';

const EditUser = () => {
	const user = useSelector((state) => state.auth);

	const [firstName, setFirstName] = useState(user.firstName);
	const [lastName, setLastName] = useState(user.lastName);
	const [email, setEmail] = useState(user.email);
	const [shippingAddress, setShippingAddress] = useState(user.shippingAddress);

	const dispatch = useDispatch();
	const history = useHistory();

	const handleUpdate = () => {
		const updatedUser = {
			firstName,
			lastName,
			email,
			shippingAddress,
		};
		dispatch(updateUser(updatedUser)).then(() => {
			dispatch(me());
		});
	};

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<TextField
				sx={{ paddingBottom: '2rem' }}
				label="First Name"
				type="text"
				value={firstName}
				onChange={(event) => {
					setFirstName(event.target.value);
				}}
			/>
			<TextField
				sx={{ paddingBottom: '2rem' }}
				label="Last Name"
				type="text"
				value={lastName}
				onChange={(event) => {
					setLastName(event.target.value);
				}}
			/>
			<TextField
				sx={{ paddingBottom: '2rem' }}
				label="Email"
				type="text"
				value={email}
				onChange={(event) => {
					setEmail(event.target.value);
				}}
			/>
			<TextField
				sx={{ paddingBottom: '2rem' }}
				label="Shipping Address"
				type="text"
				value={shippingAddress}
				onChange={(event) => {
					setShippingAddress(event.target.value);
				}}
			/>
			<Button
				size="large"
				variant="contained"
				onClick={() => {
					handleUpdate();
				}}
			>
				Submit
			</Button>
		</div>
	);
};

export default EditUser;
