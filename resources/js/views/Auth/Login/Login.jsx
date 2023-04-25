import React, {useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Formik} from "formik";
import * as Yup from "yup";
import {
    Card,
    Body,
    LeadFont,
    DefaultInput,
    DefaultButton,
    Link, DefaultLabel
} from "@/views/Auth/styles";
import CheckboxContainer from "@/components/CustomFormComponents/CustomCheckbox";
import AlertDanger from "@/components/CustomFormComponents/Alert/AlertDanger";
import {useLoginMutation} from "@/store/api/authApiSlice";
import {setCredentials} from "@/store/auth/authSlice";



function Login() {

    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [login,{isLoading}] = useLoginMutation()



    async function handleSumbit(values, actions) {
        try {
            const userData = await login({...values}).unwrap()
            dispatch(setCredentials({...userData.data}))
            navigate("/");
            actions.setSubmitting(false);
        } catch(error) {
            if (error.data.message) {
                setError(error.data.message);
                actions.setSubmitting(false);
            }
        }
    }

    return (
        <Card>
            <Body>
                <LeadFont className="mt-0.5">Hesabına giriş yap</LeadFont>
                {error !== '' && (<AlertDanger text={error}/>)}
                <form className="mt-5">
                    <Formik initialValues={{
                        email: '', password: '', remember: false
                    }} onSubmit={handleSumbit} validationSchema={Yup.object().shape({
                        password: Yup.string().required('Bir parola girmen gerekiyor.').min(6, 'Parola en az 6 karakterden oluşmalı.').max(32, 'Parola en fazla 32 karakter olabilir'),
                        email: Yup.string().required('Geçerli bir e-posta adresi girmen gerekiyor.').email('Geçerli bir e-posta adresi girmen gerekiyor.').max(128, 'Eposta en fazla 128 karakter olabilir'),
                        remember: Yup.boolean.required
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
                                <div className="mb-4">
                                    <DefaultLabel htmlFor="signin-mail">E-posta</DefaultLabel>
                                    <DefaultInput
                                        className={errors.email && touched.email ? "border border-red-400 placeholder-red-400" : ""}
                                        autocomplete={"email"}
                                        type="email"
                                        name="email"
                                        id="signin-mail"
                                        placeholder="E-posta"
                                        onBlur={handleBlur}
                                        value={values.email}
                                        onChange={handleChange('email')}>
                                    </DefaultInput>
                                    {(errors.email && touched.email) && <div
                                        className="bg-red-100 border border-red-400 text-red-700 px-1 py-2 rounded relative mt-4"
                                        role="alert">
                                        <span className="block sm:inline">{errors.email}</span>
                                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
                                    </div>}
                                </div>
                                <div className="mb-4">
                                    <DefaultLabel htmlFor="signin-password">Parola</DefaultLabel>
                                    <DefaultInput
                                        className={errors.password && touched.password ? "border border-red-400 placeholder-red-400" : ""}
                                        type="password"
                                        name="password"
                                        id="signin-password"
                                        placeholder="Parola"
                                        autoComplete="true"
                                        onBlur={handleBlur}
                                        value={values.password}
                                        onChange={handleChange('password')}>
                                    </DefaultInput>
                                    {(errors.password && touched.password) && <div
                                        className="bg-red-100 border border-red-400 text-red-700 px-1 py-2 rounded relative mt-4"
                                        role="alert">
                                        <span className="block sm:inline">{errors.password}</span>
                                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
                                    </div>}
                                </div>
                                <div className="flex"><Link href="@/frontend/views/Auth/Login/Login#">Parolanı mı
                                    unuttun?</Link></div>
                                <div className="mb-6 mt-5 items-start flex">
                                    <label className={"flex justify-center items-center"}>
                                        <CheckboxContainer
                                            name="remember"
                                            value={values.remember}
                                            checked={values.remember}
                                            onChange={handleChange}
                                        />
                                        <span className={"text-black font-thin"}>Beni Hatırla</span>
                                    </label>
                                </div>
                                <DefaultButton className={"mt-2"} onClick={handleSubmit} type="submit"
                                               disabled={!isValid || isSubmitting}>Giriş Yap</DefaultButton>
                            </>
                        )}
                    </Formik>
                    <div className="mt-3">
                                    <span className="mb-10 flex-col flex">
                                        <span className="font-thin text-black">Hesabın yok mu?</span>
                                        <NavLink className="mt-2 text-themePrimary underline" to={"register"}>Hesap oluştur</NavLink>
                                    </span>
                    </div>
                </form>
            </Body>
        </Card>
    );
}

export default Login;
