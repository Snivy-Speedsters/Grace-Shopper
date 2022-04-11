import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchCart } from '../store/cart';
import { logOut } from '../store/auth';
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
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
	const isLoggedIn = !!useSelector((state) => state.auth.id);
	const cartAmount = useSelector((state) => state.cart.amount);
	const isAdmin = useSelector((state) => state.auth.administrator);
	const dispatch = useDispatch();
	const history = useHistory();

	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);
	const [currentPage, setCurrentPage] = useState(history.location.pathname);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};
	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};
	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	useEffect(() => {
		dispatch(fetchCart());
	}, [window.localStorage.getItem('token')]);

	const handleRoute = (page) => {
		if (page === '/logout') {
			history.push('/login');
			dispatch(logOut());
		} else {
			history.push(page);
		}
		setCurrentPage(page);
		handleCloseNavMenu();
		handleCloseUserMenu();
	};

	const selected = (page, location) => {
		return page === location ? 'contained' : '';
	};

	const pages = (loggedIn, admin) => {
		const output = [];
		if (loggedIn) {
			output.push(
				{ name: 'All Products', path: '/products' },
				{ name: 'View Cart', path: '/cart' }
			);
			if (admin) {
				output.push({ name: 'Admin', path: '/admin' });
			}
			return output;
		} else {
			return [
				{ name: 'Log In', path: '/login' },
				{ name: 'All Products', path: '/products' },
				{ name: 'View Cart', path: '/cart' },
			];
		}
	};

	const user = (loggedIn) => {
		const settings = [
			{ name: 'Profile', path: '/profile' },
			{ name: 'Log Out', path: '/logout' },
		];

		if (!loggedIn) {
			return <></>;
		} else {
			return (
				<>
					<Tooltip title="Open settings">
						<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
							<Avatar alt="Remy Sharp" src="" />
						</IconButton>
					</Tooltip>
					<Menu
						sx={{ mt: '45px' }}
						id="menu-appbar"
						anchorEl={anchorElUser}
						anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
						keepMounted
						transformOrigin={{ vertical: 'top', horizontal: 'right' }}
						open={Boolean(anchorElUser)}
						onClose={handleCloseUserMenu}
					>
						{settings.map((setting) => (
							<MenuItem
								key={setting.name}
								onClick={() => {
									handleRoute(setting.path);
								}}
							>
								<Typography textAlign="center">{setting.name}</Typography>
							</MenuItem>
						))}
					</Menu>
				</>
			);
		}
	};

	return (
		<AppBar style={{ backgroundColor: '#787677' }} position="relative">
			<Container maxWidth="xl">
				<Toolbar>
					<Button>
						<Typography
							variant="h6"
							noWrap
							component="div"
							sx={{
								color: 'white',
								mr: 2,
								display: { xs: 'none', md: 'flex' },
							}}
							onClick={() => {
								handleRoute('/home');
							}}
						>
							Plain Grey T's
						</Typography>
					</Button>

					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size="large"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
							keepMounted
							transformOrigin={{ vertical: 'top', horizontal: 'left' }}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{ display: { xs: 'block', md: 'none' } }}
						>
							{pages(isLoggedIn, isAdmin).map((page) => (
								<MenuItem key={page.name}>
									<Typography
										sx={{ color: 'black' }}
										textAlign="center"
										onClick={() => {
											handleRoute(page.path);
										}}
									>
										{page.name}
									</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>

					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{
							color: 'white',
							flexGrow: 1,
							display: { xs: 'flex', md: 'none' },
						}}
						onClick={() => {
							handleRoute('/home');
						}}
					>
						Plain Grey T's
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{pages(isLoggedIn, isAdmin).map((page) => (
							<Button
								key={page.name}
								variant={selected(page.path, currentPage)}
								onClick={() => {
									handleRoute(page.path);
								}}
								sx={{ my: 2, color: 'white', display: 'block' }}
							>
								{page.name}
							</Button>
						))}
					</Box>

					<Box sx={{ flexGrow: 0 }}>{user(isLoggedIn)}</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default Navbar;
