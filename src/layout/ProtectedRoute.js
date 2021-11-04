import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { CONFIG } from '../config/config';

const ProtectedRoute = ({ component: Component }, ...rest) => {
    const user = JSON.parse(localStorage.getItem('User')); // persistant user
    return (
        <Route
            {...rest}
            render={(props) => {
                if (user && user.isAuthenticated) {
                    return <Component {...props} />;
                }
                return (<Redirect to={
                    {
                        pathname: CONFIG.signin_url,
                        state: {
                            from: props.location
                        }
                    }

                }
                />);
            }}
        />
    );
};

export default ProtectedRoute;
