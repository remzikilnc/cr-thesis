import Card from "@/components/admin/card";
import React, {useEffect, useMemo, useState} from "react";
import {
    useGlobalFilter, usePagination, useSortBy, useTable,
} from "react-table";
import SingleCardWithIcon from "@/components/admin/card/SingleCard";
import TableDefaultPagination from "@/components/admin/table/pagination";
import { Input} from "@chakra-ui/react";
import ModalDefaultButton from "@/components/admin/modal/button/save";
import {useAddCommentMutation} from "@/store/api/products/comments";

const ProductComments = (props) => {
    const {columnsData, tableData, paginationAmount, fullData,product_id} = props;
    const [comments, setComments] = useState('');
    const columns = useMemo(() => columnsData, [columnsData]);
    const data = useMemo(() => tableData, [tableData]);
    const paginationVal = useMemo(() => paginationAmount, [paginationAmount]);
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        state: {pageSize, pageIndex},
        setPageSize,
        canNextPage,
        canPreviousPage,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
    } = useTable({
        columns,
        data,
        initialState: {pageSize: paginationVal, pageIndex: fullData.current_page - 1},
        manualPagination: true,
        pageCount: fullData.last_page
    }, useGlobalFilter, useSortBy, usePagination);

    useEffect(() => {
        if (pageSize !== paginationAmount) {
            setPageSize(paginationAmount);
        }
    }, [paginationAmount, pageSize, setPageSize]);

    const handleChange = (e) => {
        setComments(e.target.value);
    };

    const [addComment] = useAddCommentMutation()
    async function handleSubmit() {
        if (comments !== ''){
            try {
                await addComment({ productId: product_id, comment: comments }).unwrap();
            } catch (error) {
                if (error.data.message) {
                }
            }
        }
        setComments('');
    }



    return (<Card extra={"w-full pb-10 p-4 h-full"}>
        <header className="relative flex flex-row-reverse items-center justify-between">
            <SingleCardWithIcon handleClick={props.refetchComments}/>
        </header>
        <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
            <table {...getTableProps()} className="w-full">
                <thead>
                {headerGroups.map((headerGroup, index) => (<tr {...headerGroup.getHeaderGroupProps()} key={index}>
                    {headerGroup.headers.map((column, index) => (<th
                        {...column.getHeaderProps(column.getSortByToggleProps())}
                        key={index}
                        className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700"
                    >
                        <div
                            className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                            {column.render("Header")}
                        </div>
                    </th>))}
                </tr>))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {page.map((row, index) => {
                    prepareRow(row);
                    return (<tr {...row.getRowProps()} key={index}>
                        {row.cells.map((cell, index) => {
                            let data;
                            if (cell.column.Header === "USER") {
                                data = (<p className="text-sm font-bold text-navy-700 dark:text-white text-left">
                                    {cell.value}
                                </p>);
                            } else if (cell.column.Header === "COMMENT") {
                                data = (<p className="mr-[10px] text-sm text-navy-700 dark:text-white text-left">
                                    {cell.value}
                                </p>);
                            }
                            return (<td className="pt-[14px] pb-[20px] sm:text-[14px]"{...cell.getCellProps()}
                                        key={index}>
                                {data}
                            </td>);
                        })}
                    </tr>);
                })}
                </tbody>
            </table>
        </div>
        <div className="flex justify-between items-center">
            <TableDefaultPagination
                canPreviousPage={canPreviousPage}
                canNextPage={canNextPage}
                pageCount={pageCount}
                pageIndex={pageIndex}
                gotoPage={gotoPage}
                nextPage={nextPage}
                previousPage={previousPage}
                paginationData={fullData}
                onPageChange={props.onPageChange}
            />
            <div className="w-[230px] items-center m-0 p-0">
            </div>
        </div>
        <div className="mt-4">
                  <textarea className={"w-full border-2 rounded-xl placeholder:pl-2 placeholder:pt-1"}
                      onChange={handleChange}
                            placeholder={"Add Comment"}
                            value={comments}
                  />
            <ModalDefaultButton onClick={handleSubmit}/>

        </div>
    </Card>);
};

export default ProductComments;
