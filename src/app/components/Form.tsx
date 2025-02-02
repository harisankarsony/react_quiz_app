import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Form = () => {
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required')
                .matches(
                    /^[a-zA-Z0-9@ ]+$/,
                    "Cannot have special characters"
                ),
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
        }),
        onSubmit: () => {
            //call api
        },
    });
    const { handleChange, handleBlur, handleSubmit } = formik;

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto m-6">
            <div className="mb-4">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder='Less than 15 characters'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={formik.values.firstName}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    disabled={formik.isSubmitting}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                    <div className="text-red-500 text-sm">{formik.errors.firstName}</div>
                ) : null}
            </div>

            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder='Eg: id@domain.com'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={formik.values.email}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    disabled={formik.isSubmitting}
                />
                {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500 text-sm">{formik.errors.email}</div>
                ) : null}
            </div>

            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 my-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60" disabled={formik.isSubmitting}>
                Get score via Email
            </button>
            {formik.isSubmitting &&
                <div className="text-green-500 text-sm">Score sent to Email</div>}
        </form>
    );
};

export default Form;