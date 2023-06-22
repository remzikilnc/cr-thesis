import {apiSlice} from "./../apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        allUsers: builder.query({
            query: ({searchTerm, page, perPage, orderDir, orderBy}) => {
                const params = new URLSearchParams();
                if (searchTerm) params.append('query', searchTerm);
                if (page) params.append('page', page);
                if (perPage) params.append('perPage', perPage);
                if (orderDir) params.append('orderDir', orderDir);
                if (orderBy) params.append('orderBy', orderBy);

                const paramString = params.toString() ? `?${params.toString()}` : '';

                return {
                    url: `/users${paramString}`, method: "GET",
                };
            },
        }),
        showUser: builder.query({
            query: id => ({
                url: `/users/${id}`, method: 'GET',
            })
        }),
        deleteUser: builder.mutation({
            query: id => ({
                url: `/users/${id}`, method: 'DELETE',
            })
        }),
        updateUser: builder.mutation({
            query: (credentials) => {
                const {id, ...restCredentials} = credentials;
                return {
                    url: `/users/${id}`, method: 'PUT', body: {...restCredentials},
                };
            },
        }),
    })
})

export const {useAllUsersQuery, useShowUserQuery, useDeleteUserMutation, useUpdateUserMutation} = usersApiSlice
