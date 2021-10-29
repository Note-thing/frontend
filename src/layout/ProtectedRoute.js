import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ( { component: Component }, ...rest ) => {
    let user = JSON.parse(localStorage.getItem('User')); // persistant user 
    return (
        <Route 
        {...rest}
        render={props => {
            if(user && user.isAuthenticated){
                return <Component {...props} />
            }else{
                return <Redirect to={
                    { 
                        pathname: "/login",
                        state: {
                            from: props.location
                        }
                    }

                } />
            }
        }} />
    )
}

export default ProtectedRoute;