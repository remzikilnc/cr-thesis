import {apiSlice} from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials =>({
                url: '/auth/login',
                method: 'POST',
                body: {...credentials}
            })
        }),
        register: builder.mutation({
            query: credentials =>({
                url: '/auth/register',
                method: 'POST',
                body: {...credentials}
            })
        }),
        logout: builder.mutation({
            query: credentials =>({
                url: '/auth/logout',
                method: 'POST',
                body: {...credentials}
            })
        }),
        authenticate: builder.query({
            query: () =>({
                url: '/auth/authenticate',
                method: 'GET',
            })
        }),
        currentUserRoles: builder.query({
            query: () =>({
                url: '/auth/roles',
                method: 'GET',
            })
        }),
    })
})
export const {useLoginMutation, useRegisterMutation, useLogoutMutation, useAuthenticateQuery, useCurrentUserRolesQuery} = authApiSlice
