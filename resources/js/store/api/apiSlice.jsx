import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {logOut} from '@/store/Auth/authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_API_URL, credentials: 'include', prepareHeaders: (headers, {getState}) => {
        const token = getState().auth.token;
        if (token) {
            headers.set('Authorization', `Bearer ${token.access_token}`);
        } else {
        }
        return headers;
    },
});

const baseQueryWithReauth =  async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result?.error) {
        let status = result.error.status;
        switch (status) {
            case 401:
            case 403:
                api.dispatch(logOut());
                break;
            //todo Diğer hatalar için farklı işlemler yapılabilir
            // case 404:
            //     api.dispatch(handleNotFoundError(result.error));
            //     break;
            // case 500:
            //     api.dispatch(handleServerError(result.error));
            //     break;
            default:
                //todo Tüm diğer hatalar için genel bir işlem yapılabilir
                // api.dispatch(handleApiError(result.error));
                break;
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
});

