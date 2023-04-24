// src/middlewares/authMiddleware.js

const authMiddleware = (storeAPI) => (next) => (action) => {
    if (action.payload && action.payload.config && action.payload.config.url.startsWith('/api/')) {
        const token = storeAPI.getState().auth.token;
        if (token) {
            action.payload.config.headers['Authorization'] = `Bearer ${token}`;
        }
        const onSuccess = (response) => response;
        const onError = (error) => {
            handleApiError(storeAPI, error);
            throw error;
        };

        action.payload.promise = action.payload.promise.then(onSuccess).catch(onError);
    }

    // Eylem işlemini devam ettirin
    return next(action);
};

const handleApiError = (storeAPI, error) => {
    if (error.response && error.response.status === 401) {
        storeAPI.dispatch({ type: 'auth/logout' });
    }
};

export default authMiddleware;
