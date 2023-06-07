import React from 'react';
import {Formik} from "formik";
import * as Yup from "yup";
import ModalDefaultInput from "@/components/admin/modal/input";
import ModalDefaultButton from "@/components/admin/modal/button/save";
import {FormControl} from "@mui/material";
import Radio from "@/components/admin/radio";
import {Label} from "@mui/icons-material";

function CommentEditModalInput(props) {
    const { data, handleFormSubmit } = props;
    const handleSumbit = (values, actions) => {
        handleFormSubmit({ ...values, id: data.id });
        actions.setSubmitting(false);
    };
    return (<form className="mt-5">
            <Formik initialValues={{
                comment: data?.comment ?? '',
                product_id: data?.product_id ?? '',
                user_id: data?.user_id ?? '',
                status: data?.status ?? false,
            }} onSubmit={handleSumbit} validationSchema={Yup.object().shape({
                comment: Yup.string().required('Geçerli bir yorum girmen gerekiyor.'),
                product_id: Yup.number().required('Geçerli bir id girmen gerekiyor.').typeError('You must specify a number'),
                user_id: Yup.number().required('Geçerli bir id girmen gerekiyor.').typeError('You must specify a number'),
                status: Yup.bool().required('Required')
            })}>
                {({
                      values, handleChange, handleSubmit, handleBlur, errors, isValid, isSubmitting, touched
                  }) => (

                    <>
                        <ModalDefaultInput
                            name={'comment'}
                            label='Comment'
                            placeholder='Comment'
                            type='text'
                            value={values.comment}
                            onChange={handleChange('comment')}
                            errors={errors.comment}
                            touched={touched.comment}
                            onBlur={handleBlur}
                        />
                        <ModalDefaultInput
                            name={'product_id'}
                            label='Product ID'
                            placeholder='Product ID'
                            type='text'
                            value={values.product_id}
                            onChange={handleChange('product_id')}
                            errors={errors.product_id}
                            touched={touched.product_id}
                            onBlur={handleBlur}
                        />
                        <ModalDefaultInput
                            name={'user_id'}
                            label='User ID'
                            placeholder='User ID'
                            type='text'
                            value={values.user_id}
                            onChange={handleChange('user_id')}
                            errors={errors.user_id}
                            touched={touched.user_id}
                            onBlur={handleBlur}
                        />
                        <FormControl className={"flex !flex-row !justify-center !items-center"}>
                            <p className={"mr-2"}>Status</p>
                            <Radio
                                color={'lime'}
                                name={'status'}
                                onChange={handleChange('status')}
                                value={values.status}>
                            </Radio>
                        </FormControl>
                        <div className="mt-10 flex flex-col-reverse">
                            <ModalDefaultButton
                                name="Save"
                                isValid={isValid}
                                onClick={handleSubmit}
                                disabled={!isValid || isSubmitting}
                            />
                        </div>

                    </>)}
            </Formik>
        </form>

    );
}

export default CommentEditModalInput;
