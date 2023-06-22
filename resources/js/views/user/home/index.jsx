import React, {useState} from 'react';
import UserProductListing from "@/components/user/product/listing";
import {useProductsQuery} from "@/store/api/products";
import TableLoading from "@/components/admin/loading/table";
import ProductSlider from "@/components/components/slider";

function UserHome() {
    const [paginationAmount, setPaginationAmount] = useState(8); // Varsayılan sayfa boyutu
    const [page, setPage] = useState(1); // Page
    const orderDir ='asc'; // Page
    const orderBy = 'id'; // Page

    const {data: datas, refetch, isLoading} = useProductsQuery({
        perPage: paginationAmount,
        page: page,
        orderDir: orderDir,
        orderBy: orderBy,
        withImages: true,
        withCategories: true
    });

    const {data: sliderDatas, isLoading: isSliderDataLoading} = useProductsQuery({
        perPage: paginationAmount,
        page: 1,
        orderDir: 'asc',
        orderBy: 'price',
        withImages: true,
        withCategories: true
    });

    if (isLoading || isSliderDataLoading) {
        return (
            <TableLoading/>
        );
    }

    const data = datas.data;
    const products = data.pagination.data;
    const sliderData = sliderDatas.data.pagination.data;
    return (
            <>
                <div className={"my-4"}>
                    <ProductSlider
                        products={sliderData}
                    />
                </div>
                <div className="mt-10">
                    <UserProductListing
                        products={products}
                        page={page}
                        setPage={setPage}
                        pageCount={data.pagination.last_page}
                        paginationAmount={paginationAmount}
                    />
                </div>
            </>
    );
}

export default UserHome;
