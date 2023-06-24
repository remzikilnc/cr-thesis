import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useShowProductQuery} from "@/store/api/products";
import TableLoading from "@/components/admin/loading/table";
import Card from "@/components/admin/card";
import ProductCommentListing from "@/views/user/product/comments";
import ProductImageList from "@/components/components/product/ProductImageList";


function Product() {
    const {id} = useParams();
    const {data, isLoading} = useShowProductQuery({id: id, withCategories: true});
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (data) {
            setProduct(data.data);
        }
    }, [data]);

    if (isLoading) {
        return (<TableLoading/>);
    }

    if (!product) {
        return null;
    }

    console.log(product)

    return (<>
        <Card extra="!p-[40px]">
            <div className="flex">
                <div className="mt-5">
                <ProductImageList imageData={product.images}></ProductImageList>
                </div>
                <div className="flex flex-col ml-5">
                    <h1 className={"text-xl my-4"}>{product.title}</h1>
                    <div className="text-xl my-4">Price <span className={"font-semibold text-green-600"}>{product.price}</span><span className={"text-xs ml-0.5"}>TL</span></div>
                    <p className={"text-sm my-4"}>{product.description}</p>
                    <div className="my-4">Code:<span>{product.code}</span></div>
                </div>
                <div className="my-4">Vote:<p>{product.vote_count}</p></div>

            </div>
            <ProductCommentListing product_id={id}></ProductCommentListing>
        </Card>
    </>);
}

export default Product;
