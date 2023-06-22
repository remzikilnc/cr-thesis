import React, {useCallback, useEffect, useState} from 'react';
import ProductCard from "@/components/components/card/ProductCard";
import {useNavigate} from "react-router-dom";
import {Pagination} from "@mui/material";

function UserProductListing(props) {
    const [productList, setProductList] = useState(props.products);
    const {pageCount, page, setPage, paginationAmount} = props
    const navigate = useNavigate();

    const handlePaginationChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        setProductList(props.products)
    }, [props.products]);

    return (<div className="mt-3 grid h-full grid-cols-1">
        <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
            <div className="z-20 grid grid-cols-2 gap-5 md:grid-cols-2">
                {productList.map(({id, title, description, quantity, price, code, images}) => (<ProductCard
                    key={id}
                    title={title}
                    description={description}
                    price={price}
                    images={images}
                />))}
            </div>
            <div className="mt-2 bg-white pt-3 pb-3 rounded-xl flex flex-row justify-between dark:bg-navy-700">
                <div className="ml-5 flex flex-row items-center">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mr-4">Page{' '}
                    <strong className="font-semibold text-gray-900 dark:text-white">{page} of {pageCount}</strong>
                </span>
                    <Pagination
                        color="primary"
                        className={"ml-2"}
                        count={pageCount}
                        page={page}
                        onChange={handlePaginationChange}
                        variant="outlined"
                        shape="rounded"
                        showFirstButton
                        showLastButton
                    />
                </div>
            </div>
        </div>
    </div>);
}

export default UserProductListing;
