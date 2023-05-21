import {apiSlice} from "./../apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        products: builder.query({
            query: ({searchTerm, page, perPage, orderDir, orderBy, withImages, withCategories}) => {
                const params = new URLSearchParams();
                if (searchTerm) params.append('query', searchTerm);
                if (page) params.append('page', page);
                if (perPage) params.append('perPage', perPage);
                if (orderDir) params.append('orderDir', orderDir);
                if (orderBy) params.append('orderBy', orderBy);

                let withParams = [];
                if (withImages) withParams.push('images');
                if (withCategories) withParams.push('categories');
                if (withParams.length > 0) params.append('with', withParams.join(','));

                const paramString = params.toString() ? `?${params.toString()}` : '';

                return {
                    url: `/products${paramString}`, method: "GET",
                };
            },
        }), deleteProduct: builder.mutation({
            query: id => ({
                url: `/products/${id}`, method: 'DELETE',
            })
        }),
    })
})
export const {useProductsQuery, useDeleteProductMutation} = productsApiSlice
