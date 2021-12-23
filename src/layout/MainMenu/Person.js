import React from 'react';
import { Avatar, Typography, Box } from '@mui/material';

const initials = (fullname) => fullname.split(' ').map((n) => n[0]).join('.');

const Person = ({ user }) => (
    <Box sx={{ display: 'flex' }}>
        <Avatar className="avatar" sx={{ backgroundColor: 'primary.main' }}>
            <Typography noWrap sx={{ fontSize: '14px', color:'white' }}>{ initials(`${user.firstname} ${user.lastname}`) }</Typography>
        </Avatar>
        <Box sx={{ ml: '10px', backgroundColor: 'white' }}>
            <Typography noWrap className="full-name" sx={{ fontSize: '14px' }} component="section">
                { `${user.firstname} ${user.lastname}` }
            </Typography>
            <Typography noWrap className="email" sx={{ fontSize: '12px' }} component="section">
                { user.email }
            </Typography>
        </Box>
    </Box>
);
export default Person;
