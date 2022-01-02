import React, { useContext, useState, useCallback } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { useHistory } from 'react-router-dom';
import { Box, Menu, MenuItem } from '@mui/material';
import { MainContext } from '../../context/MainContext';
import Person from './Person';

const User = () => {
    const { main: { user }, dispatch } = useContext(MainContext);

    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const history = useHistory();
    const redirectPage = useCallback((link) => {
        // Will change the URL, behaves like a link
        history.push(link);
        setAnchorEl(null);
        setOpen(false);
    }, [history, setAnchorEl]);
    const userLogout = async () => {
        // await Post('/logout');
        localStorage.removeItem('User');
        localStorage.removeItem('Token');
        dispatch({
            type: 'dialog',
            dialog: { id: 'logout', is_open: true }
        });
        setTimeout(() => history.push('/'), 2000);
    };

    const handleMenuToogle = useCallback((event) => {
        if (!open) setAnchorEl(event.currentTarget);
        setOpen(!open);
    }, [setOpen, open]);
    const handleMenuClose = useCallback(() => {
        setAnchorEl(null);
        setOpen(false);
    }, [setAnchorEl, setOpen]);

    return (
        <ClickAwayListener onClickAway={handleMenuClose}>
            <Box onClick={handleMenuToogle}>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                    <MenuItem onClick={() => redirectPage('/profile')}>Profil</MenuItem>
                    <MenuItem onClick={userLogout}>Logout</MenuItem>
                </Menu>
                <Person user={user} />
            </Box>
        </ClickAwayListener>
    );
};

export default User;
