import React, {useState} from 'react';
import {Formik} from "formik";
import * as Yup from "yup";
import {NavLink, useNavigate} from "react-router-dom";
import {  useDispatch } from 'react-redux'
import {
    Card,
    Body,
    LeadFont,
    DefaultInput,
    DefaultButton, DefaultLabel,
} from "@/views/Auth/styles";
import AlertDanger from "@/components/CustomFormComponents/Alert/AlertDanger";
import {setCredentials} from "@/store/auth/authSlice";
import {useRegisterMutation} from "@/store/api/authApiSlice";





function Register() {
    const [backErrors, setBackErrors] = useState({});
    const [backError, setBackError] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [register,{isLoading}] = useRegisterMutation()


    async function handleSumbit(values, actions) {
        try {
            const userData = await register({...values}).unwrap()
            dispatch(setCredentials({...userData.data}))
            navigate("/");
            actions.setSubmitting(false);
        } catch (error) {
            if (error.data.errors) {
                let errorData = error.data.errors;
                if (typeof errorData === 'object' && errorData !== null) {
                    setBackErrors(errorData);
                }
            } else {
                setBackError(error.message);
            }
            actions.setSubmitting(false);
        }
    }
    let errs = [];
        if (Object.values(backErrors)){
            Object.values(backErrors).forEach(value => {
                errs.push(value)
            });
        }

    return (
        <Card>
            <Body>
                <LeadFont className="mt-0.5">Hesap oluştur</LeadFont>
               { errs.length !== 0 &&  errs.map((error) => <AlertDanger text={error} key={error}/>)}
                { backError !== '' && ( <AlertDanger text={backError}/>) }
                <form className="mt-5" method="post">
                    <Formik
                        initialValues={{
                            first_name:'',
                            last_name:'',
                            email:'',
                            password:'',
                            password_confirmation:''
                        }}
                        onSubmit={handleSumbit}
                        validationSchema={
                            Yup.object().shape({
                                first_name: Yup.string().required('Geçerli bir ad girmen gerekiyor.').min(4, 'Adın en az 4 karakterden oluşmalı').trim(),
                                last_name: Yup.string().required('Geçerli bir soyad girmen gerekiyor.').min(4, 'Soyadın en az 4 karakterden oluşmalı').trim(),
                                email: Yup.string().email('Geçerli bir e-posta adresi girmen gerekiyor.').required('E-posta adresini girmen gerekiyor.').min(6,'E-posta adresini girmen gerekiyor').max(128,'E-posta en fazla 128 karakter olabilir').trim(),
                                password: Yup.string().required('Bir parola girmen gerekiyor.').min(6, 'Parola en az 6 karakterden oluşmalı.').max(32,'Parola en fazla 64 karakter olabilir'),
                                password_confirmation:Yup.string().oneOf([Yup.ref('password'),null],'Parolanı onaylaman gerekiyor.')
                            })}>
                        {({
                              values,
                              handleChange,
                              handleSubmit,
                              handleBlur,
                              errors,
                              isValid,
                              isSubmitting,
                              touched
                          }) => (
                            <>
                                <div className="flex row  grid grid-cols-2 gap-x-4">
                                    <div className="mb-4 ">
                                        <DefaultLabel htmlFor="first-name">Ad</DefaultLabel>
                                        <DefaultInput
                                            className={errors.first_name && touched.first_name ? "border border-red-400 placeholder-red-400" : ""}
                                            autoComplete={"given-name"}
                                            type="text"
                                            name="first_name"
                                            id="first-name"
                                            placeholder="Adın."
                                            onBlur={handleBlur}
                                            value={values.first_name}
                                            onChange={handleChange('first_name')}>
                                        </DefaultInput>
                                        {(errors.first_name && touched.first_name) && <AlertDanger text={errors.first_name}/> }
                                    </div>
                                    <div className="mb-4 ">
                                        <DefaultLabel htmlFor="last-name">Soyad</DefaultLabel>
                                        <DefaultInput
                                            className={errors.last_name && touched.last_name ? "border border-red-400 placeholder-red-400" : ""}
                                            autoComplete={"family-name"}
                                            type="text"
                                            name="last_name"
                                            id="last-name"
                                            placeholder="Soyadın."
                                            onBlur={handleBlur}
                                            value={values.last_name}
                                            onChange={handleChange('last_name')}>
                                        </DefaultInput>
                                        {(errors.last_name && touched.last_name) && <AlertDanger text={errors.last_name}/> }
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <DefaultLabel htmlFor="signin-mail">E-posta</DefaultLabel>
                                    <DefaultInput
                                        className={errors.email && touched.email ? "border border-red-400 placeholder-red-400" : ""}
                                        autoComplete={"email"}
                                        type="email"
                                        name="email"
                                        id="signin-mail"
                                        placeholder="E-posta adresini gir."
                                        onBlur={handleBlur}
                                        value={values.email}
                                        onChange={handleChange('email')}>
                                    </DefaultInput>
                                    {(errors.email && touched.email) && <AlertDanger text={errors.email}/>}
                                </div>
                                <div className="mb-4">
                                    <DefaultLabel htmlFor="password">Parola</DefaultLabel>
                                    <DefaultInput
                                        className={errors.password && touched.password ? "border border-red-400 placeholder-red-400" : ""}
                                        type="password"
                                        name="password"
                                        id="password"
                                        autoComplete={"new-password"}
                                        placeholder="Parola oluştur"
                                        onBlur={handleBlur}
                                        value={values.password}
                                        onChange={handleChange('password')}>
                                    </DefaultInput>
                                    {(errors.password && touched.password) && <AlertDanger text={errors.password}/>}
                                </div>
                                <div className="mb-4">
                                    <DefaultLabel htmlFor="password_confirmation">Parola Tekrarı</DefaultLabel>
                                    <DefaultInput
                                        className={errors.password_confirmation && touched.password_confirmation ? "border border-red-400 placeholder-red-400" : ""}
                                        type="password"
                                        name="password_confirmation"
                                        id="password_confirmation"
                                        autoComplete={"new-password"}
                                        placeholder="Parolanı tekrar gir."
                                        onBlur={handleBlur}
                                        value={values.password_confirmation}
                                        onChange={handleChange('password_confirmation')}>
                                    </DefaultInput>
                                    {(errors.password_confirmation && touched.password_confirmation) && <AlertDanger text={errors.password_confirmation}/> }
                                </div>
                                <DefaultButton className={"mt-2"} onClick={handleSubmit} type={"submit"} disabled={!isValid || isSubmitting}>Kayıt ol</DefaultButton>
                            </>
                        )}
                    </Formik>
                    <div className="mt-3">
                                    <span className="mb-10 flex-col flex">
                                        <span className="font-thin text-black">Hesabın var mı?</span>
                                        <NavLink className="mt-2 text-themePrimary underline" to={"/auth"}>Oturum aç.</NavLink>
                                    </span>
                    </div>
                </form>
            </Body>
        </Card>
    );
}

export default Register;
