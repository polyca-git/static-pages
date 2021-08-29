import React from 'react';

const Header = () => {
    return(
    <div className="headerContainer">
            <ul className="navBar">
                <li>
                    Home
                </li>
                <li>
                    Contact
                </li>
            </ul>
        <div className="searchBar">
            <input type="text" placeholder='Search...'/>
        </div>
            

    </div>
    )
}

export default Header;