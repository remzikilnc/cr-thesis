import React, {useState} from 'react';
import {Field, Formik} from "formik";
import * as Yup from "yup";
import ModalDefaultInput from "@/components/admin/modal/input";
import ModalDefaultButton from "@/components/admin/modal/button/save";
import {ModalDefaultLabelStyled, ModalDefaultSelectStyled} from "@/components/admin/modal/input/styles";

function UserProfileEdit(props) {
    const {user, handleFormSubmit} = props;
    const handleSumbit = (values, actions) => {
        handleFormSubmit({...values, id: user.id});
        actions.setSubmitting(false);
    };

    return (<form className="mt-5">
            <Formik initialValues={{
                first_name: user?.first_name ?? '',
                last_name: user?.last_name ?? '',
                email: user?.email ?? '',
                gender: user?.gender ?? 'male',
                address: user?.address ?? 'male',
                city: user?.city ?? '',
                postcode: user?.postcode ?? '',
                old_password: '',
                new_password: '',
                new_password_confirmation: ''
            }} onSubmit={handleSumbit} validationSchema={Yup.object().shape({
                first_name: Yup.string().required('Please enter a valid first name.').min(2, 'First name must be at least 2 characters.').trim(),
                last_name: Yup.string().required('Please enter a valid last name.').min(3, 'Last name must be at least 3 characters.').trim(),
                email: Yup.string().email('Please enter a valid email address.').required('Email is required.').min(6, 'Email is required.').max(128, 'Email must be no more than 128 characters.').trim(),
                address: Yup.string().min(2, 'Adress name must be at least 2 characters.').max(256, 'Adress name must be at least 256 characters.').trim(),
                city: Yup.string().min(2, 'City name must be at least 2 characters.').max(256, 'City name must be at least 256 characters.').trim(),
                postcode: Yup.string().min(2, 'Postcode name must be at least 2 characters.').max(8, 'Postcode name must be at least 8 characters.').trim(),
                old_password: Yup.string().when(['new_password', 'new_password_confirmation'], {
                    is: (new_password, new_password_confirmation) => new_password || new_password_confirmation,
                    then: Yup.string().required('You must enter your old password.')
                }),
                new_password: Yup.string().min(6, 'Password must be at least 6 characters.').max(32, 'Password must be no more than 64 characters.'),
                new_password_confirmation: Yup.string()
                    .oneOf([Yup.ref('new_password'), null], 'Passwords must match.')
            })}>
                {({
                      values, handleChange, handleSubmit, handleBlur, errors, isValid, isSubmitting, touched
                  }) => (<>
                    <div className="">
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
                    </div>
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
                        name={'address'}
                        label='Address'
                        placeholder='Address'
                        type='text'
                        value={values.address}
                        onChange={handleChange('address')}
                        errors={errors.address}
                        touched={touched.address}
                        onBlur={handleBlur}
                    />
                    <ModalDefaultInput
                        name={'city'}
                        label='City'
                        placeholder='City'
                        type='text'
                        value={values.city}
                        onChange={handleChange('city')}
                        errors={errors.city}
                        touched={touched.city}
                        onBlur={handleBlur}
                    />
                    <ModalDefaultInput
                        name={'postcode'}
                        label='Post Code'
                        placeholder='Post Code'
                        type='text'
                        value={values.postcode}
                        onChange={handleChange('postcode')}
                        errors={errors.postcode}
                        touched={touched.postcode}
                        onBlur={handleBlur}
                    />
                    <div className="flex-col flex mb-4">
                        <ModalDefaultLabelStyled htmlFor={'gender'}>Gender</ModalDefaultLabelStyled>
                        <Field as={ModalDefaultSelectStyled} name="gender">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </Field>
                    </div>
                    <ModalDefaultInput
                        name='old_password'
                        label='Old Password'
                        placeholder='Old Password'
                        type='password'
                        value={values.old_password}
                        onChange={handleChange('old_password')}
                        errors={errors.old_password}
                        touched={touched.old_password}
                        onBlur={handleBlur}
                    />
                    <ModalDefaultInput
                        name='new_password'
                        label='New Password'
                        placeholder='New Password'
                        type='password'
                        value={values.new_password}
                        onChange={handleChange('new_password')}
                        errors={errors.new_password}
                        touched={touched.new_password}
                        onBlur={handleBlur}
                    />
                    <ModalDefaultInput
                        name='new_password_confirmation'
                        label='Confirm New Password'
                        placeholder='Confirm New Password'
                        type='password'
                        value={values.new_password_confirmation}
                        onChange={handleChange('new_password_confirmation')}
                        errors={errors.new_password_confirmation}
                        touched={touched.new_password_confirmation}
                        onBlur={handleBlur}
                    />
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

export default UserProfileEdit;
