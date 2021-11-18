import React, { useContext, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Menu, MenuItem } from '@mui/material'
import { MainContext } from '../../context/MainContext';
import Person from './Person';

const User = () => {
    const { main: { user }, dispatch } = useContext(MainContext);

    const [anchorEl, setAnchorEl] = useState(null);
    const history = useHistory();
    const handleMenuOpen = useCallback(event => setAnchorEl(event.currentTarget), [setAnchorEl]);
    const handleMenuClose = useCallback(() => setAnchorEl(null), [setAnchorEl]);
    const redirectPage = useCallback((link) => {
        // Will change the URL, behaves like a link
        history.push(link);
        setAnchorEl(null);
    }, [history, setAnchorEl]);

    const userLogout = async () => {
        // await Post('/logout');
        localStorage.removeItem('User');

        dispatch({
            type: 'logout'
        });
        //setTimeout(() => history.push("/"), 2000);
        history.push('/');
        /*  setDialog({
                 [response.dialog_id]: {
                     is_open: true
                 }
             }); */
    };
    return (
        <Box onClick={ handleMenuOpen } >
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => redirectPage('/profile')}>Profil</MenuItem>
                <MenuItem onClick={userLogout}>Logout</MenuItem>
            </Menu>
            <Person user={user} />
        </Box>
    );
};

export default User;
