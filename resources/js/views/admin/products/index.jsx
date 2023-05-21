import React, {useState} from "react";
import {useDeleteProductMutation, useProductsQuery} from "@/store/api/products";
import AdminProductListing from "@/views/admin/products/listing";
import TableLoading from "@/components/admin/loading/table";

const AdminProducts = () => {
    const paginationChoices = [7, 14, 21, 28, 63]; // Varsayılan sayfa boyutları
    const [searchTerm, setSearchTerm] = useState('');  //Arama
    const [paginationAmount, setPaginationAmount] = useState(paginationChoices[0]); // Varsayılan sayfa boyutu
    const [page, setPage] = useState(1); // Page
    const [orderDir, setOrderDir] = useState('asc'); // Page
    const [orderBy, setOrderBy] = useState('id'); // Page

    const {data: datas, refetch, isLoading} = useProductsQuery({
        searchTerm: searchTerm ?? searchTerm,
        perPage: paginationAmount,
        page: page,
        orderDir: orderDir,
        orderBy: orderBy,
        withImages: true,
        withCategories: true
    });

    if (isLoading) {
        return (
            <TableLoading/>
        );
    }

    const data = datas.data;
    const products = data.pagination.data;

    return (
        <AdminProductListing
            products={products}
            setSearchTerm={setSearchTerm}
            searchTerm={searchTerm}
            paginationAmount={paginationAmount}
            setPaginationAmount={setPaginationAmount}
            paginationChoices={paginationChoices}
            page={page}
            setPage={setPage}
            pageCount={data.pagination.last_page}
            setOrderDir={setOrderDir}
            setOrderBy={setOrderBy}
        />
    );
};

export default AdminProducts;
