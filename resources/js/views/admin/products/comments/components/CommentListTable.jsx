import Card from "@/components/admin/card";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {
    useGlobalFilter, usePagination, useSortBy, useTable,
} from "react-table";
import InlineSearchBar from "@/components/admin/search";
import {MdCancel, MdCheckCircle, MdClose, MdModeEditOutline, MdOutlineError} from "react-icons/md";
import SingleCardWithIcon from "@/components/admin/card/SingleCard";
import TableDefaultPaginationAmount from "@/components/admin/table/pagination/amount";
import TableDefaultPagination from "@/components/admin/table/pagination";

const CommentListTable = (props) => {
    const {columnsData, tableData, paginationAmount, fullData} = props;
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

    function handleEdit(row) {
        props.getCommentsForModal(row.original);
    }

    function handleDelete(row) {
        props.handleDelete(row.original.id);
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
                            } else if (cell.column.Header === "STATUS") {
                                data = (<p className="mr-[10px] text-sm text-navy-700 dark:text-white">
                                    {cell.value === 1 ? (
                                        <MdCheckCircle className="text-green-500" size={'20'}/>
                                    ) : cell.value === 0 ? (
                                        <MdCancel className="text-red-500" size={'20'} />
                                    )  : null}
                                </p>);
                            } else if (cell.column.Header === "BAN-REASON") {
                                data = (<p className="text-sm text-navy-700 dark:text-white text-left">
                                    {cell.value}
                                </p>);
                            } else if (cell.column.Header === "CREATED-DATE") {
                                const date = new Date(cell.value);
                                data = (<p className="text-sm  text-navy-700 dark:text-white text-left">
                                    {date.toLocaleString(undefined, {timeZone: 'UTC'})}
                                </p>);
                            } else if (cell.column.Header === "MODIFY") {
                                return (<td {...cell.getCellProps()} className={"flex mt-3"}
                                            key={`MODIFY-${index}`}>
                                    <button
                                        className={"mr-4 flex items-center justify-center text-gray-600 dark:text-white"}
                                        onClick={() => handleEdit(row)}>
                                        <MdModeEditOutline size={"18"} className={"text-blue-400"}/>
                                    </button>
                                    <button
                                        className={"mr-4 flex items-center justify-center text-gray-600 dark:text-white"}
                                        onClick={() => handleDelete(row)}>
                                        <MdClose size={"18"} className={"text-red-400"}/>
                                    </button>
                                </td>);
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
                <TableDefaultPaginationAmount
                    selected={props.paginationAmount}
                    setSelected={props.setPaginationAmount}
                    paginationChoices={props.paginationChoices}
                />
            </div>
        </div>

    </Card>);
};

export default CommentListTable;
