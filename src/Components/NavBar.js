import React from 'react';
import 'antd/dist/antd.css';
import './NavBar.css';
import {Link} from 'react-router-dom'

function NavBar(){

    const navStyle = {
        color:'white'
    };

    return(
        <nav>
            <ul className='nav-links'>
                <Link style={navStyle} to='/Profile'><li>Profile</li></Link>
                <Link style={navStyle} to='/Timeline'><li>Timeline</li></Link>
                <Link style={navStyle} to='/Requests'><li>Requests</li></Link>
                <Link style={navStyle} to='/FriendsList'><li>FriendsList</li></Link>
                <Link style={navStyle} to='/Following'><li>Following</li></Link>
                <Link style={navStyle} to='/LogOut'><li>Log Out</li></Link>
            </ul>
        </nav>
    );
}

export default NavBar
