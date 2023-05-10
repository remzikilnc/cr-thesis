import React from 'react';

export default function TableDefaultPagination({
                                                   gotoPage,
                                                   nextPage,
                                                   previousPage,
                                                   canNextPage,
                                                   canPreviousPage,
                                                   pageCount,
                                                   pageIndex,
                                                   onPageChange
                                               }) {

    const currentPage = pageIndex + 1;

    return (<nav className="flex items-center justify-between pt-4" aria-label="Table navigation">
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mr-4">
        Page{' '}
          <strong className="font-semibold text-gray-900 dark:text-white">
          {currentPage} of {pageCount}
        </strong>
      </span>
        <ul className="inline-flex items-center -space-x-px">
            <li>
                <button
                    onClick={() => {
                        previousPage();
                        onPageChange(currentPage - 1); // Önceki sayfa
                    }}
                    disabled={!canPreviousPage}
                    className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    Previous
                </button>
            </li>
            {[...Array(pageCount)].map((_, i) => (<li key={i}>
                <button
                    onClick={() => {
                        gotoPage(i);
                        onPageChange(i + 1);
                    }}
                    className={`px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${pageIndex === i ? 'z-10 text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white' : ''}`}>
                    {i + 1}
                </button>
            </li>))}
            <li>
                <button
                    onClick={() => {
                        nextPage();
                        onPageChange(currentPage+1); // Önceki sayfa
                    }}
                    disabled={!canNextPage}
                    className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    Next
                </button>
            </li>
        </ul>
    </nav>);
}
