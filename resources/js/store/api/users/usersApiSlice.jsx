import {apiSlice} from "./../apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        allUsers: builder.query({
            query: (query, orderBy, orderDir = 'asc') => {
                const queryParams = query && query !== '' ? `?query=${query}` : '';
                const orderParam = orderBy && orderDir ? `?orderBy=${orderBy}&direction=${orderDir}` : '';
                return {
                    url: `/users${queryParams}${orderParam}`,
                    method: 'GET',
                };
            },
        }),
        deleteUser: builder.mutation({
            query: id =>({
                url: `/users/${id}`,
                method: 'DELETE',
            })
        }),
        updateUser: builder.mutation({
            query: (credentials) => {
                const { id, ...restCredentials } = credentials;
                return {
                    url: `/users/${id}`,
                    method: 'PUT',
                    body: { ...restCredentials },
                };
            },
        }),
    })
})
export const {useAllUsersQuery, useDeleteUserMutation, useUpdateUserMutation} = usersApiSlice
