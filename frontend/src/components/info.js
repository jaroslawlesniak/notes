import React from 'react';

function Info({ icon, message }) {
    return (
        <div className="info">
            <div className="wrapper">
                <i className={ icon }></i>
                <p>{ message }</p>
            </div>
        </div>
    );
}

export default Info;