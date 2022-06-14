import * as React from 'react';
import NavBar from '../elements/NavBar';
import { Outlet } from 'react-router-dom';

export default function WithNav() {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    );
}