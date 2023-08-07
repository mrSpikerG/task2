import React from 'react'; // we need this to make JSX compile
import { MyNavbar } from './MyNavbar';
import { Outlet } from 'react-router-dom';

export const BasePage = () => {
    return <div>
        <MyNavbar />
        <Outlet />
    </div>
}