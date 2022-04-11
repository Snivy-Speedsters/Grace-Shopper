import React from 'react';
import { useSelector } from 'react-redux';
import {
	AppBar,
	Typography,
	Container,
	Toolbar,
	Box,
	IconButton,
	Menu,
	MenuItem,
	Button,
	Tooltip,
	Avatar,
} from '@mui/material';
import AllProducts from './AllProducts';
import { useHistory } from 'react-router-dom';

export const Home = () => {
	const history = useHistory();

	const logo = () => {
		return (
			<img
				style={{
					zIndex: '0',
					position: 'absolute',
					width: '100%',
					height: '100%',
				}}
				src="/images/tshirt/hangershirts.jpeg"
			/>
		);
	};

	const firstName = useSelector((state) => state.auth.firstName);

	return (
		<div>
			{logo()}
			<div style={{ zIndex: '-10' }}>Hello</div>
			<div style={{ zIndex: '-100' }}>Hello</div>
			<div style={{ zIndex: '-100' }}>Hello</div>
			<div style={{ zIndex: '-100' }}>Hello</div>
			<div style={{ zIndex: '-100' }}>Hello</div>
			<div style={{ zIndex: '-100' }}>Hello</div>
			<div style={{ zIndex: '-100' }}>Hello</div>
			<div style={{ zIndex: '-100' }}>Hello</div>
			<div style={{ zIndex: '-100' }}>Hello</div>
			<div style={{ zIndex: '-100' }}>Hello</div>

			<div>
				<Box
					style={{
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<Typography variant="h2" style={{ zIndex: '2', color: 'white' }}>
						All Grey. All Plain.
					</Typography>
				</Box>

				<Box
					style={{
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<Typography variant="h2" style={{ zIndex: '2', color: 'white' }}>
						Subtly Different.
					</Typography>
				</Box>
				<div style={{ zIndex: '-100' }}>Hello</div>
				<div style={{ zIndex: '-100' }}>Hello</div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<Button
						size="large"
						variant="contained"
						style={{ marginRight: '1rem' }}
						onClick={() => history.push('/products')}
					>
						Shop T's
					</Button>
				</div>
				<div style={{ zIndex: '-100' }}>Hello</div>
				<div style={{ zIndex: '-100' }}>Hello</div>
				<Box
					style={{
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<Typography variant="h2" style={{ zIndex: '2', color: 'white' }}>
						Coming Soon...
					</Typography>
				</Box>

				<Box
					style={{
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<Typography variant="h2" style={{ zIndex: '2', color: 'white' }}>
						Plain Grey Hoodie
					</Typography>
				</Box>
			</div>
		</div>
	);
};

export default Home;
