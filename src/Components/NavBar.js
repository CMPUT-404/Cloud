import React, {useState} from 'react';
//import { useLocation } from 'react-router-dom'
import 'antd/dist/antd.css';
import './NavBar.css';
import {Link} from 'react-router-dom'

function NavBar(props){
    //console.log(useLocation().pathname);
    const [current, setCurrent] = useState();

    const getStyle = (index) => {
        if (index === current) {
            return {color: 'orange'}
        }
        else return {color:'white'}
    };

    return(
        <nav>
            <ul className='nav-links'>
                <Link style={getStyle(0)} to='/Profile' onClick={()=>(setCurrent(0))}><li>Profile</li></Link>
                <Link style={getStyle(1)} to='/Timeline' onClick={()=>(setCurrent(1))}><li>Timeline</li></Link>
                <Link style={getStyle(2)} to='/GithubEvents' onClick={()=>(setCurrent(2))}><li>Github</li></Link>
                <Link style={getStyle(3)} to='/Requests' onClick={()=>(setCurrent(3))}><li>Requests</li></Link>
                <Link style={getStyle(4)} to='/FriendsList' onClick={()=>(setCurrent(4))}><li>FriendsList</li></Link>
                <Link style={getStyle(5)} to='/Following' onClick={()=>(setCurrent(5))}><li>Following</li></Link>
                <Link style={getStyle(6)} to='/LogOut' onClick={()=>(setCurrent(6))}><li>Log Out</li></Link>
            </ul>
        </nav>
    );
}

export default NavBar
