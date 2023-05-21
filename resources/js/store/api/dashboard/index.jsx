import {apiSlice} from "./../apiSlice";

export const dashboardApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        dashboard: builder.query({
            query: () =>({
                url: '/admin/dashboard',
                method: 'GET',
            })
        }),
    })
})
export const {useDashboardQuery} = dashboardApiSlice
