import React, {useState} from 'react';

const Header = (props) => {
    const [searchTerm, setSearchTerm] = useState("");

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
            <input onChange={(e)=>props.searchFilter(e.target.value.toUpperCase())}  type="text" placeholder='Search...'/>
        </div>
            

    </div>
    )
}

export default Header;