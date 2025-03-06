import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import { UserContext } from '../App';
import Cookies from 'js-cookie';
import { Menu, MenuItem, Button } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function Navbar() {
    const { state, dispatch } = useContext(UserContext)
    function changeToDark() {
        document.body.setAttribute("data-bs-theme", "dark");
    }
    function changeToLight() {
        document.body.setAttribute("data-bs-theme", "light");
    }


    const [anchorEl, setAnchorEl] = useState(null);

    // Handle Dropdown Open
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Handle Dropdown Close
    const handleClose = () => {
        setAnchorEl(null);
    };




    // Get a cookie
    const token = Cookies.get('token');
    console.log('Token:', token);

    const RenderMenu = () => {


        if (state) {
            return (
                <>
                    <Link className="btn btn-primary mx-2" to="/logout">Logout</Link>
                </>
            )
        }
        else {
            return (
                <>
                    <Link className="btn btn-primary mx-2" to="/login">Login</Link>
                    <Link className="btn btn-primary mx-2" to="/signup">Sign Up</Link>
                </>
            )
        }
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <div className="navbar-brand">Dailyscope News</div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {/* <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/">All</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/science">Science & Technology</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/sports">Sports</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/entertainment">Entertainment</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/politics">Politics</Link>
                            </li> */}
                            {/* <li className="nav-item">
                                <Link className="nav-link" to="/education">Education</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/personalizedfeed">Personalized Feed</Link>
                            </li>  */}
                            <li className="nav-item">
                                <Link className="nav-link" to="/latestnews">Latest news</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/trendingnews">Trending news</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/userpreferences">My preferences</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/profile">Your Profile</Link>
                            </li>




                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Change Theme
                                </Link>
                                <ul className="dropdown-menu">
                                    <li>
                                        <button className="dropdown-item d-flex justify-content-between" onClick={changeToLight}>
                                            <div className="lightMode">Light</div>
                                            <div className="lightModeIco"><i className="fa-solid fa-sun"></i></div>
                                        </button>
                                    </li>
                                    <li>
                                        <button className="dropdown-item d-flex justify-content-between" onClick={changeToDark}>
                                            <div className="darkMode">Dark</div>
                                            <div className="darkModeIco"><i className="fa-solid fa-moon"></i></div>
                                        </button>
                                    </li>

                                </ul>

                            </li>
                        </ul>


                        <Button
                            color="primary"
                            variant="contained"
                            onClick={handleClick}
                            endIcon={<ArrowDropDownIcon />}
                        >
                            Categories
                        </Button>

                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                            <MenuItem onClick={handleClose} component={Link} to="/">All</MenuItem>
                            <MenuItem onClick={handleClose} component={Link} to="/science">Science & Technology</MenuItem>
                            <MenuItem onClick={handleClose} component={Link} to="/sports">Sports</MenuItem>
                            <MenuItem onClick={handleClose} component={Link} to="/entertainment">Entertainment</MenuItem>
                            <MenuItem onClick={handleClose} component={Link} to="/politics">Politics</MenuItem>
                            <MenuItem onClick={handleClose} component={Link} to="/education">Education</MenuItem>
                            <MenuItem onClick={handleClose} component={Link} to="/personalizedfeed">Personalized Feed</MenuItem>
                        </Menu>



                        <div className="d-flex" role="search">
                            <RenderMenu />
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Navbar