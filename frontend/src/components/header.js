import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <header>
                <nav>
                    <input type="text" placeholder="Wyszukaj notatkę"/>
                </nav>
            </header>
        );
    }
}

export default Header;