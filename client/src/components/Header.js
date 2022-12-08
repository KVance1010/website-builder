import React from 'react';
import Nav from './Nav';

function Header({ currentPage, handlePageChange }){
return (
    <header className="header">
        <a className="logo_container" onClick={() => handlePageChange('Home')} href='#home'></a>
        <Nav currentPage={currentPage} handlePageChange = {handlePageChange}/>
    </header>
)
}

export default Header;