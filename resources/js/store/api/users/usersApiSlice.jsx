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
    })
})
export const {useAllUsersQuery, useDeleteUserMutation} = usersApiSlice
