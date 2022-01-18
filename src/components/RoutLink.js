import React from 'react';
import {Link} from 'react-router-dom';


const RoutLink = () => {
    return (
        <div>
            <Link to={'/'}>Home</Link>
            <br/>
            <Link to={'/new'}>New</Link>
            <br/>
            <Link to={'/edit'}>Edit</Link>
            <br/>
            <Link to={'/diary'}>Diary</Link>
        </div>
    );
};

export default RoutLink;