import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/currentUser';

const TopBar = () => {
    const [currentUserState] = useContext(CurrentUserContext)
    // console.log("🔥🚀 ===> TopBar ===> currentUserState", currentUserState);
    const userImage =
        (currentUserState?.isLoggedIn && currentUserState?.currentUser?.image) ||
        'https://static.productionready.io/images/smiley-cyrus.jpg'

    return (
        <nav className="navbar navbar-light">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    <span className="clgray">Green</span>Gray
                </Link>
                <ul className="nav navbar-nav pull-xs-right">
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link" exact>
                            Home
                        </NavLink>
                    </li>
                    {currentUserState.isLoggedIn && (
                        <>
                            <li className="nav-item">
                                <NavLink to="/articles/new" className="nav-link">
                                    <i className="ion-compose" />
                                    &nbsp; New Post
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/settings" className="nav-link">
                                    <i className="ion-gear-a" />
                                    &nbsp; Settings
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to={`/profiles/${currentUserState.currentUser?.username}`}
                                    className="nav-link"
                                >
                                    <img className="user-pic" src={userImage} alt="" />
                                    &nbsp; {currentUserState.currentUser?.username}
                                </NavLink>
                            </li>
                        </>
                    )}
                    {currentUserState.isLoggedIn === false && (
                        <>
                            <li className="nav-item">
                                <NavLink to="/login" className="nav-link">
                                    Sign in
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/register" className="nav-link">
                                    Sign up
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default TopBar;
