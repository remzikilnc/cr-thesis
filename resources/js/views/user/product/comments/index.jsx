import React, {memo, useCallback, useEffect, useState} from "react";
import {useCommentsQuery} from "@/store/api/products/comments";
import ProductComments from "@/views/user/product/comments/components/ProductComments";

const commentsDataColumns = [{
    Header: "USER", accessor: "name",
}, {
    Header: "COMMENT", accessor: "comment",
}];

const loadingColumns = [{
    "user": "", "comment": '',
},]

const ProductCommentListing = ({product_id}) => {
    const [page, setPage] = useState(false); // Page
    const [fetchedComments, setFetchedComments] = useState(false); // Backend'den alınmış comment verileri
    const [fetchedData, setFetchedData] = useState(false); // Backend'den alınmış sayfalama & comment verileri

    const {data: commentDatas,  isLoading} = useCommentsQuery({product_id: product_id, perPage: 15, page: page ?? page});

    useEffect(() => {
        if (!isLoading && commentDatas?.data) {
            setFetchedComments(commentDatas.data.pagination.data);
            setFetchedData(commentDatas?.data);
        }
    }, [commentDatas]);

    return (<div className={"mt-10"}>
        <div className="mt-5 grid h-full grid-cols-1 gap-2">
            <ProductComments
                columnsData={commentsDataColumns}
                tableData={fetchedComments ? fetchedComments : loadingColumns}
                fullData={fetchedData}
                paginationAmount={15}
                product_id={product_id}
                onPageChange={(newPageIndex) => setPage(newPageIndex)}
            />
        </div>
    </div>);
};

export default memo(ProductCommentListing);
