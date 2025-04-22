import { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../App';
import Cookies from 'js-cookie';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Box,
    Tooltip,
    useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function Navbar() {
    const { state } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [anchorEl, setAnchorEl] = useState(null);
    const [themeMode, setThemeMode] = useState('light');
    const isMobile = useMediaQuery('(max-width:768px)');

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const toggleTheme = () => {
        const newTheme = themeMode === 'light' ? 'dark' : 'light';
        setThemeMode(newTheme);
        document.body.setAttribute("data-bs-theme", newTheme);
    };

    const RenderMenu = () => {
        return state ? (
            <AnimatedButton text="Logout" variant="outlined" onClick={() => navigate('/logout')} />
        ) : (
            <>
                <AnimatedButton text="Login" variant="outlined" onClick={() => navigate('/login')} active={location.pathname === "/login"} />
                <AnimatedButton text="Sign Up" variant="contained" onClick={() => navigate('/signup')} active={location.pathname === "/signup"} />
            </>
        );
    };

    return (
        <AppBar position="static" sx={{
            background: 'linear-gradient(45deg, #0f2027, #203a43, #2c5364)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                    variant="h6"
                    component={Link}
                    to="/"
                    sx={{
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        color: '#fff',
                        background: 'linear-gradient(to right, #00f2fe, #4facfe)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontSize: '1.8rem',
                        '&:hover': {
                            textShadow: '0 0 10px #4facfe'
                        }
                    }}
                >
                    Dailyscope News
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Tooltip title="Toggle Theme">
                        <IconButton onClick={toggleTheme} sx={{ color: '#fff', mx: 1, transition: 'all 0.3s ease' }}>
                            {themeMode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
                        </IconButton>
                    </Tooltip>

                    <AnimatedButton
                        text="Categories"
                        onClick={handleClick}
                        endIcon={<ArrowDropDownIcon />}
                        active={
                            [
                                '/', '/science', '/sports',
                                '/entertainment', '/politics',
                                '/education', '/personalizedfeed'
                            ].includes(location.pathname)
                        }
                    />

                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                        {[
                            { label: 'All', path: '/' },
                            { label: 'Science & Tech', path: '/science' },
                            { label: 'Sports', path: '/sports' },
                            { label: 'Entertainment', path: '/entertainment' },
                            { label: 'Politics', path: '/politics' },
                            { label: 'Education', path: '/education' },
                            { label: 'Personalized Feed', path: '/personalizedfeed' }
                        ].map((item) => (
                            <MenuItem
                                key={item.path}
                                onClick={handleClose}
                                component={Link}
                                to={item.path}
                                sx={{
                                    transition: 'all 0.3s',
                                    '&:hover': {
                                        backgroundColor: '#00e5ff33',
                                        transform: 'scale(1.05)',
                                        color: '#1565c0'
                                    }
                                }}
                            >
                                {item.label}
                            </MenuItem>
                        ))}
                    </Menu>

                    {!isMobile && (
                        <>
                            <AnimatedNavButton to="/latestnews" label="Latest" active={location.pathname === "/latestnews"} />
                            <AnimatedNavButton to="/trendingnews" label="Trending" active={location.pathname === "/trendingnews"} />
                            <AnimatedNavButton to="/userpreferences" label="My Preferences" active={location.pathname === "/userpreferences"} />
                            <AnimatedNavButton to="/profile" label="Profile" active={location.pathname === "/profile"} />
                        </>
                    )}

                    <RenderMenu />
                </Box>
            </Toolbar>
        </AppBar>
    );
}

// 🎨 Stylish reusable animated button
function AnimatedButton({ text, variant = 'text', onClick, endIcon, active = false }) {
    return (
        <Button
            variant={variant}
            onClick={onClick}
            endIcon={endIcon}
            sx={{
                mx: 1,
                fontWeight: 600,
                color: active ? '#ffee58' : (variant === 'contained' ? '#fff' : '#90caf9'),
                background: active
                    ? 'linear-gradient(to right, #00c6ff, #0072ff)'
                    : (variant === 'contained'
                        ? 'linear-gradient(to right, #2193b0, #6dd5ed)'
                        : 'none'),
                borderColor: '#90caf9',
                transition: 'all 0.3s ease',
                boxShadow: active ? '0px 0px 10px rgba(0, 123, 255, 0.5)' : 'none',
                '&:hover': {
                    transform: 'scale(1.05)',
                    background: 'linear-gradient(to right, #00c6ff, #0072ff)',
                    color: '#fff',
                    boxShadow: '0px 0px 10px rgba(0, 123, 255, 0.5)'
                },
            }}
        >
            {text}
        </Button>
    );
}

// 🌀 Stylish Nav Button with active indicator
function AnimatedNavButton({ to, label, active }) {
    return (
        <Button
            component={Link}
            to={to}
            sx={{
                color: active ? '#ffee58' : '#fff',
                textTransform: 'capitalize',
                mx: 1,
                fontWeight: 600,
                transition: 'all 0.3s ease',
                background: active ? 'rgba(255,255,255,0.1)' : 'transparent',
                borderRadius: '8px',
                '&:hover': {
                    transform: 'translateY(-2px) scale(1.05)',
                    color: '#ffee58',
                    background: 'rgba(255,255,255,0.1)',
                }
            }}
        >
            {label}
        </Button>
    );
}

export default Navbar;
