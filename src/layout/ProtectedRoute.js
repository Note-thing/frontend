import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { CONFIG } from '../config/config';

const ProtectedRoute = ({ component: Component }, ...rest) => {
    const user = JSON.parse(localStorage.getItem('User')); // persistant user
    return (
        <Route
            {...rest}
            render={(props) => {
                if (user) {
                    return <Component {...props} />;
                }
                const redirectionParams = {
                    pathname: `${CONFIG.signin_url}`,
                    state: {
                        from: props.location
                    }
                };
                if (window.location.pathname !== '/') {
                    redirectionParams.search = `?redirect=${window.location.pathname}`;
                }
                return <Redirect to={redirectionParams} />;
            }}
        />
    );
};

export default ProtectedRoute;
