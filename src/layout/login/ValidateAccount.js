import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as Loading } from '../../resource/animation/loading-big.svg';
import { CONFIG, Post } from '../../config/config';
import { MainContext } from '../../context/MainContext';

const ValidateAccount = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const { dispatch } = useContext(MainContext);
    const urlSearchParams = new URLSearchParams(window.location.search);
    const { token } = Object.fromEntries(urlSearchParams.entries());

    useEffect(() => {
        if (!token) {
            dispatch({
                type: 'dialog',
                dialog: { id: 'account_validate_missing_token', severity: 'error', is_open: true }
            });
            return;
        }
        (async () => {
            try {
                await Post('/users/validate', { token });
                setLoading(false);
                dispatch({
                    type: 'dialog',
                    dialog: { id: 'account_validate_success', severity: 'info', is_open: true }
                });
                setTimeout(() => history.push(CONFIG.signin_url), 2000);
            } catch (error) {
                setLoading(false);
                dispatch({
                    type: 'dialog',
                    dialog: { id: 'account_validate_failed', severity: 'error', is_open: true }
                });
            }
        })();
    }, []);

    return (
        <section style={{ margin: 'auto', width: '64px' }}>
            { loading && <Loading />}
        </section>
    );
};

export default ValidateAccount;
