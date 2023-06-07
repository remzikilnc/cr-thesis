import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useShowProductQuery, useUpdateProductMutation} from "@/store/api/products";
import TableLoading from "@/components/admin/loading/table";
import {VStack, FormControl, FormLabel} from "@chakra-ui/react";
import Card from "@/components/admin/card";
import TextField from "@mui/material/TextField";
import EditableTextarea from "@/components/admin/fields/default/textarea";
import CustomImageList from "@/components/admin/image/listing";
import ModalDefaultButton from "@/components/admin/modal/button/save";
import LayoutAlert from "@/components/admin/alert";
import CommentList from "@/views/admin/products/comments";


function EditProduct() {
    const {id} = useParams();
    const {data, isLoading} = useShowProductQuery({id: id, withCategories: true});
    const [updateProduct, {
        data: updateData, isLoading: updateLoading, error: updateError
    }] = useUpdateProductMutation();
    const [alertMessage, setAlertMessage] = useState(null);  //Alert Message

    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (data) {
            setProduct(data.data);
        }
    }, [data]);

    const handleChange = (e) => {
        setProduct({
            ...product, [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {id, title, description, code, price, quantity, views, vote_count} = product;
            const updatedProduct = await updateProduct({
                id, title, description, code, price, quantity, views, vote_count,
            }).unwrap();

            if (updatedProduct) {
                // The product was updated successfully
                setAlertMessage({type: 'success', head: 'Product was updated', message: 'Successfully.'});
            }
        } catch (error) {
            setAlertMessage({
                type: 'error', head: 'Failed to update product!', message: Object.values(error.data.errors)[0]
            });
        }
    };

    useEffect(() => {
        if (alertMessage) {
            const timer = setTimeout(() => {
                setAlertMessage(null);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [alertMessage]);

    if (isLoading) {
        return (<TableLoading/>);
    }

    if (!product) {
        return null;
    }

    return (<>
        {alertMessage && (<LayoutAlert
            type={alertMessage.type}
            head={alertMessage.head}
            desc={alertMessage.message}
        />)}
        <Card extra="!p-[40px] text-center">

            <VStack spacing={10} align="start">
                <div className="flex items-start w-full">
                    <CustomImageList imageData={product.images}></CustomImageList>
                    <div className="flex flex-col w-full ml-5">
                        <div className="flex w-full">
                            <div className="flex flex-row items-center grid grid-cols-2 w-full gap-4">
                                <FormControl id="title">
                                    <TextField
                                        required
                                        color="secondary"
                                        id="title"
                                        label="Title"
                                        name={"title"}
                                        defaultValue={product.title}
                                        className={"w-full !z-0"}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                <FormControl id="price">
                                    <TextField
                                        required
                                        color="secondary"
                                        id="price"
                                        label="Price"
                                        name={"price"}
                                        defaultValue={product.price}
                                        className={"w-full !z-0"}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                <FormControl id="quantity">
                                    <TextField
                                        required
                                        color="secondary"
                                        id="quantity"
                                        label="Quantity"
                                        name={"quantity"}
                                        defaultValue={product.quantity}
                                        className={"w-full !z-0"}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                <FormControl id="code">
                                    <TextField
                                        required
                                        color="secondary"
                                        id="code"
                                        label="Code"
                                        name={"code"}
                                        defaultValue={product.code}
                                        className={"w-full !z-0"}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                <FormControl id="views">
                                    <TextField
                                        required
                                        color="secondary"
                                        id="views"
                                        label="Views"
                                        name="views"
                                        defaultValue={product.views}
                                        className={"w-full !z-0"}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                <FormControl id="vote_count">
                                    <TextField
                                        required
                                        color="secondary"
                                        id="vote_count"
                                        label="Vote Count"
                                        name="vote_count"
                                        defaultValue={product.vote_count}
                                        className={"w-full !z-0"}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </div>
                        </div>
                        <div className="flex items-start mt-2">
                            <FormControl id="description" className={"w-full"}>
                                <FormLabel>Description</FormLabel>
                                <EditableTextarea
                                    label="description"
                                    placeholder="description"
                                    name="description"
                                    defaultValue={product.description}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </div>
                    </div>
                </div>
                <ModalDefaultButton onClick={handleSubmit}/>
            </VStack>
            <CommentList product_id={id}></CommentList>
        </Card>
    </>);
}

export default EditProduct;
