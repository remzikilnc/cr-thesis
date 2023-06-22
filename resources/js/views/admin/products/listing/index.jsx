import React, {useCallback, useEffect, useState} from 'react';
import ExampleProductIMG from "@/assets/images/products/product1.png";
import ExampleAvatar from "@/assets/images/avatars/avatar.png";
import CardSearch from "@/components/admin/card/CardSearch";
import ProductCard from "@/components/components/card/ProductCard";
import {Pagination} from "@mui/material";
import TableDefaultPaginationAmount from "@/components/admin/table/pagination/amount";
import LayoutAlert from "@/components/admin/alert";
import {useDeleteProductMutation} from "@/store/api/products";
import {useNavigate} from "react-router-dom";

function AdminProductListing(props) {
    const [productList, setProductList] = useState(props.products);
    const {searchTerm, setSearchTerm} = props
    const {pageCount, page, setPage} = props
    const {setOrderDir, setOrderBy} = props
    const {paginationAmount, setPaginationAmount, paginationChoices} = props

    const navigate = useNavigate();

    const [alertMessage, setAlertMessage] = useState(null);  //Alert Message
    const [deleteProduct] = useDeleteProductMutation();

    async function handleDelete(id) {
        if (id) {
            try {
                await deleteProduct(id).unwrap()
                setAlertMessage({type: 'success', head: 'Success', message: 'Successfully.'});
                setProductList(productList.filter(product => product.id !== id));
            } catch (error) {
                if (error.data.message) {
                    setAlertMessage({type: 'error', head: 'Error!', message: error.data.message});
                }
            }
        }
    }

    useEffect(() => {
        setProductList(props.products)
    }, [props.products]);

    const handleInputChange = useCallback(newValue => {
        setPage(1);
        setSearchTerm(newValue);
    }, []);


    const handlePaginationChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        setPage(1);
    }, [searchTerm]);

    return (<div className="mt-3 grid h-full grid-cols-1">
        {alertMessage && (<LayoutAlert
            type={alertMessage.type}
            head={alertMessage.head}
            desc={alertMessage.message}
        />)}
        <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
            <CardSearch
                InputChange={handleInputChange}
                placeholder={'Start typing to search by Title, Code'}
                setOrderBy={setOrderBy}
                setIsDescending={setOrderDir}
            />
            <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-1">
                {productList.map(({id, title, description, quantity, price, code, images}) => (<ProductCard
                    key={id}
                    title={title}
                    description={description}
                    price={price}
                    quantity={quantity}
                    code={code}
                    images={images}
                    poster={ExampleProductIMG}
                    backdrop={[ExampleAvatar, ExampleAvatar, ExampleAvatar]}
                    handleDelete={() => handleDelete(id)}
                    handleModify={() => navigate(`${id}`)}
                />))}
            </div>
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
            <div className="w-[230px] items-center m-0 p-0 mr-4 dark:text-white">
                <TableDefaultPaginationAmount
                    selected={paginationAmount}
                    setSelected={setPaginationAmount}
                    paginationChoices={paginationChoices}
                />
            </div>
        </div>
    </div>);
}

export default AdminProductListing;
