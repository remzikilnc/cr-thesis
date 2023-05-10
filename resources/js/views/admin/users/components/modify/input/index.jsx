import React, {useState} from 'react';
import {Formik} from "formik";
import * as Yup from "yup";
import ModalDefaultInput from "@/components/admin/modal/input";
import ModalDefaultSaveButton from "@/components/admin/modal/button/save";
import ModalDefaultButton from "@/components/admin/modal/button/save";
import {FormControl} from "@mui/material";
import ExampleAvatar from "@/assets/images/avatars/avatar.png";


function ModalInput(props) {
    const { data, handleFormSubmit } = props;
    const handleSumbit = (values, actions) => {
        handleFormSubmit({ ...values, id: data.id });
        actions.setSubmitting(false);
    };


    return (<form className="mt-5">
            <Formik initialValues={{
                first_name: data?.first_name ?? '',
                last_name: data?.last_name ?? '',
                email: data?.email ?? '',
                password: ''
            }} onSubmit={handleSumbit} validationSchema={Yup.object().shape({
                first_name: Yup.string().required('Geçerli bir ad girmen gerekiyor.').min(2, 'Ad en az 2 karakterden oluşmalı').trim(),
                last_name: Yup.string().required('Geçerli bir soyad girmen gerekiyor.').min(3, 'Soyad en az 3 karakterden oluşmalı').trim(),
                email: Yup.string().email('Geçerli bir e-posta adresi girmen gerekiyor.').required('E-posta adresini girmen gerekiyor.').min(6, 'E-posta adresini girmen gerekiyor').max(128, 'E-posta en fazla 128 karakter olabilir').trim(),
                password: Yup.string().min(6, 'Parola en az 6 karakterden oluşmalı.').max(32, 'Parola en fazla 64 karakter olabilir')
            })}>
                {({
                      values, handleChange, handleSubmit, handleBlur, errors, isValid, isSubmitting, touched
                  }) => (

                    <>
                        <FormControl className="!flex !flex-row items-center !relative justify-center">
                            <div className="shrink-0 mb-10">
                                <img className="h-40 w-40 object-cover  rounded-full"
                                     src={ExampleAvatar}
                                     alt="Current profile photo"/>
                            </div>
                            <label className="block absolute bottom-0">
                                <span className="sr-only">Choose profile photo</span>
                                <input type="file" className="pl-5 block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm
                    file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 "/>
                            </label>
                        </FormControl>
                        <ModalDefaultInput
                            name={'first_name'}
                            label='Name'
                            placeholder='Name'
                            type='text'
                            value={values.first_name}
                            onChange={handleChange('first_name')}
                            errors={errors.first_name}
                            touched={touched.first_name}
                            onBlur={handleBlur}
                        />
                        <ModalDefaultInput
                            name={'last_name'}
                            label='Last Name'
                            placeholder='Last Name'
                            type='text'
                            value={values.last_name}
                            onChange={handleChange('last_name')}
                            errors={errors.last_name}
                            touched={touched.last_name}
                            onBlur={handleBlur}
                        />
                        <ModalDefaultInput
                            name='email'
                            label='E-Mail'
                            placeholder='E-Mail'
                            type='email'
                            value={values.email}
                            onChange={handleChange('email')}
                            errors={errors.email}
                            touched={touched.email}
                            onBlur={handleBlur}
                        />
                        <ModalDefaultInput
                            name='password'
                            label='New Password'
                            placeholder='New Password'
                            type='password'
                            value={values.password}
                            onChange={handleChange('password')}
                            errors={errors.password}
                            touched={touched.password}
                            onBlur={handleBlur}
                        />
                        <div className="flex mb-3 mt-8">
                            <ModalDefaultButton
                                className={'!bg-gray-500 !rounded !text-white !dark:bg-blue-100'}
                                name="Roles"
                                disabled={true}
                            />
                            <ModalDefaultButton
                                className={'!bg-gray-500 !rounded !text-white !dark:bg-blue-100 ml-5'}
                                name="Permissions"
                                disabled={true}
                            />
                        </div>
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

export default ModalInput;
