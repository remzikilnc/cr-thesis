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
        }), showProduct: builder.query({
            query: ({id, withCategories}) => {
                const params = new URLSearchParams();
                if (withCategories) params.append('with', 'categories');

                const paramString = params.toString() ? `?${params.toString()}` : '';

                return {
                    url: `/products/${id}${paramString}`, method: 'GET',
                }
            }
        }), updateProduct: builder.mutation({
            query: (productData) => {
                const {id, ...data} = productData;
                return {
                    url: `/products/${id}`, method: 'PUT', body: JSON.stringify(data), headers: {
                        'Content-Type': 'application/json'
                    }
                };
            },
        }), deleteProduct: builder.mutation({
            query: id => ({
                url: `/products/${id}`, method: 'DELETE',
            })
        })
    })
})
export const {
    useUpdateProductMutation, useProductsQuery, useShowProductQuery, useDeleteProductMutation
} = productsApiSlice;
