import {apiSlice} from "./../../apiSlice";

export const commentsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        comments: builder.query({
            query: ({product_id,page, perPage, orderDir, orderBy}) => {
                    const params = new URLSearchParams();
                    if (page) params.append('page', page);
                    if (perPage) params.append('perPage', perPage);
                    if (orderDir) params.append('orderDir', orderDir);
                    if (orderBy) params.append('orderBy', orderBy);

                    const paramString = params.toString() ? `?${params.toString()}` : '';

                return {
                    url: `/products/${product_id}/comments${paramString}`,
                    method: "GET",
                };
            },
        }),addComment: builder.mutation({
            query: ({productId, comment}) => {
                return {
                    url: `/products/${productId}/comments`, method: 'POST', body: {comment},
                };
            },
        }),
        deleteComment: builder.mutation({
            query: ({productId, commentId}) => ({
                url: `/products/${productId}/comments/${commentId}`,
                method: "DELETE",
            }),
        }), updateComment: builder.mutation({
            query: (credentials) => {
                return {
                    url: `/products/${credentials.product_id}/comments/${credentials.id}`, method: 'PUT', body: {...credentials},
                };
            },
        }),
    })
})
export const {
    useCommentsQuery,
    useAddCommentMutation,
    useDeleteCommentMutation,
    useUpdateCommentMutation
} = commentsApiSlice;
