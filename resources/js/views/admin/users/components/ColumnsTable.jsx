import CardMenu from "@/components/admin/card/CardMenu";
import Card from "@/components/admin/card";
import React, { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import {FiSearch} from "react-icons/fi";
import InlineSearchBar from "@/components/admin/search";
import {MdClose, MdModeEditOutline} from "react-icons/md";
import SingleCardWithIcon from "@/components/admin/card/SingleCard";

const ColumnsTable = (props) => {
  const { columnsData, tableData } = props;
  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 5;


    function handleDelete(row) {
        props.handleDelete(row.original.id);
    }

    function handleEdit(row) {
        props.handleEdit(row.original.id);
    }

    return (
    <Card extra={"w-full pb-10 p-4 h-full"}>
      <header className="relative flex items-center justify-between">
          <InlineSearchBar handleInputChange={props.onInputChange}></InlineSearchBar>
{/*        <CardMenu />*/}
          <SingleCardWithIcon handleClick={props.refetchUsers}/>
      </header>

      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
        <table {...getTableProps()} className="w-full">
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={index}
                    className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700"
                  >
                    <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                      {column.render("Header")}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data;
                    if (cell.column.Header === "NAME") {
                      data = (
                        <p className="text-sm text-navy-700 dark:text-white">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.Header === "SURNAME") {
                      data = (
                        <p className="mr-[10px] text-sm text-navy-700 dark:text-white">
                          {cell.value}
                        </p>
                      );
                    }  else if (cell.column.Header === "ROLE") {
                      data = (
                        <p className="mr-[10px] text-sm text-navy-700 dark:text-white">
                          {cell.value[0].name}
                        </p>
                      );
                    } else if (cell.column.Header === "E-MAIL") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value}
                        </p>
                      );
                    }  else if (cell.column.Header === "CREATED-DATE") {
                        const date = new Date(cell.value);
                        data = (
                            <p className="text-sm font-bold text-navy-700 dark:text-white">
                                {date.toLocaleString(undefined, { timeZone: 'UTC' })}
                            </p>
                        );
                    }else if (cell.column.Header === "CREATED-DATE") {
                        const date = new Date(cell.value);
                        data = (
                            <p className="text-sm font-bold text-navy-700 dark:text-white">
                                {date.toLocaleString(undefined, { timeZone: 'UTC' })}
                            </p>
                        );
                    }else if (cell.column.Header === "EDIT") {
                        return (
                            <td {...cell.getCellProps()}  key={`edit-${index}`}>
                                <button
                                    className={"mr-4 flex items-center justify-center text-gray-600 dark:text-white"}
                                    onClick={() => handleEdit(row)}>
                                    <MdModeEditOutline size={"18"} className={"text-blue-400"}/>
                                </button>
                            </td>
                        );
                    }else if (cell.column.Header === "DELETE") {
                        return (
                            <td {...cell.getCellProps()}  key={`edit-${index}`}>
                                <button
                                    className={"mr-4 flex items-center justify-center text-gray-600 dark:text-white"}
                                    onClick={() => handleDelete(row)}>
                                    <MdClose size={"18"} className={"text-red-400"}/>
                                </button>
                            </td>
                        );
                    }
                    return (
                      <td className="pt-[14px] pb-[20px] sm:text-[14px]"{...cell.getCellProps()} key={index}>
                        {data}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default ColumnsTable;
