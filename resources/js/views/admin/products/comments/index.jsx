import React, {memo, useCallback, useEffect, useState} from "react";
import LayoutAlert from "@/components/admin/alert";
import {useCommentsQuery, useDeleteCommentMutation, useUpdateCommentMutation} from "@/store/api/products/comments";
import CommentListTable from "./components/CommentListTable";
import {useDisclosure} from "@chakra-ui/hooks";
import CommentEditModalInput from "@/views/admin/products/comments/components/modal/input";
import EditModal from "@/components/admin/modal/edit";

const commentsDataColumns = [{
    Header: "USER", accessor: "user_id",
}, {
    Header: "COMMENT", accessor: "comment",
}, {
    Header: "STATUS", accessor: "status",
}, {
    Header: "BAN-REASON", accessor: "banReason",
}, {
    Header: "CREATED-DATE", accessor: "created_at",
}, {
    Header: "MODIFY",
}];

const loadingColumns = [{
    "user": "", "comment": '', "status": 0, "banReason": "", "created_at": '',
},]

const CommentList = ({product_id}) => {
    const paginationChoices = [5, 15, 25, 50, 75, 100]; // Varsayılan sayfa boyutları
    const [paginationAmount, setPaginationAmount] = useState(paginationChoices[1]); // Varsayılan sayfa boyutu
    const [page, setPage] = useState(false); // Page
    const [fetchedComments, setFetchedComments] = useState(false); // Backend'den alınmış comment verileri
    const [fetchedData, setFetchedData] = useState(false); // Backend'den alınmış sayfalama & comment verileri
    const [searchTerm, setSearchTerm] = useState("");  //Arama
    const [alertMessage, setAlertMessage] = useState(null);  //Alert Message

    const {data: commentDatas, error, refetch, isLoading} = useCommentsQuery({product_id: product_id, perPage: paginationAmount ?? paginationAmount, page: page ?? page});

    useEffect(() => {
        if (!isLoading && commentDatas?.data) {
            setFetchedComments(commentDatas.data.pagination.data);
            setFetchedData(commentDatas?.data);
        }
    }, [commentDatas]);


    /*Delete User*/
    const [deleteComment] = useDeleteCommentMutation();

    async function handleDelete(commentId) {
        if (commentId) {
            try {
                await deleteComment({productId: product_id, commentId}).unwrap()
                setAlertMessage({type: 'success', head: 'Success', message: 'Comment deleted successfully.'});
                setFetchedComments(fetchedComments.filter((comment) => comment.id !== commentId));
            } catch (error) {
                if (error.data.message) {
                    setAlertMessage({type: 'error', head: 'Error!', message: error.data.message});
                }
            }
        }
    }

    /*Refresh */
    const refetchComments = useCallback(() => {
        refetch();
        setAlertMessage({type: 'Success', head: 'Success', message: 'Data refreshed successfully.'});
    }, [refetch, paginationAmount]);
    /*Refresh END*/

    /*       Alert         */
    useEffect(() => {
        if (alertMessage) {
            const timer = setTimeout(() => {
                setAlertMessage(null);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [alertMessage]);
    /*       Alert    END     */

    const [selectedRow, setSelectedRow] = useState(null);
    const {isOpen, onOpen, onClose} = useDisclosure();
    function setCommentsForModal(row) {
        setSelectedRow(row)
        onOpen();
    }
    const [updateComment] = useUpdateCommentMutation()

    async function handleModifyFormSubmit(...values) {
        console.log(values)
        try {
            await updateComment(...values).unwrap()
            const updatedComment = {...values}
            setAlertMessage({type: 'success', head: 'Success', message: 'Successfully.'});
            setFetchedComments((prevComment) => {
                return prevComment.map((comment) => comment.id === updatedComment[0].id ? {...comment, ...updatedComment[0]} : comment);
            });
        } catch (error) {
            if (error.data.message) {
                setAlertMessage({type: 'error', head: 'Error!', message: error.data.message});
            }
        }
    }

    return (<div className={"mt-10"}>
        {alertMessage && (<LayoutAlert
            type={alertMessage.type}
            head={alertMessage.head}
            desc={alertMessage.message}
        />)}
        <EditModal isOpen={isOpen}
                   onClose={onClose}
                   title={'Update Comment'}
                   data={selectedRow}
                   handleModifyForm={handleModifyFormSubmit}
                   InputComponent={CommentEditModalInput}
        />
        <div className="mt-5 grid h-full grid-cols-1 gap-2">
            <CommentListTable
                columnsData={commentsDataColumns}
                tableData={fetchedComments ? fetchedComments : loadingColumns}
                fullData={fetchedData}
                handleDelete={handleDelete}
                getCommentsForModal={setCommentsForModal}
                refetchComments={refetchComments}
                setPaginationAmount={setPaginationAmount}
                paginationChoices={paginationChoices}
                paginationAmount={paginationAmount}
                onPageChange={(newPageIndex) => setPage(newPageIndex)}
            />
        </div>
    </div>);
};

export default memo(CommentList);
