import React from 'react';
import './css/LogOut.css';

class LogOut extends React.Component{

    constructor(){
        super()
        this.clear = this.clear.bind(this);
    }

    clear(){
        localStorage.clear();
        window.location.reload();
    }


    render(){
        return(
            <div>
                <h1 className="Logout"> 
                    <span role="img" aria-label="cloud"> 🌧️ </span>
                </h1>
                <h3 className="Logout">We will miss you</h3> 
                {setTimeout(this.clear, 1000)}
            </div>
        )
    }
}


export default LogOut


