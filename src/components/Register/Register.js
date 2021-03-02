import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { Link, Redirect } from "react-router-dom";
import { registerUserSchema } from "../../utils/validationSchema";
import { registerUser } from "../../store/actions/registerUser";
import { ReactComponent as ThreeDotsIndicator } from "../../assets/images/icons/three-dots.svg";

const Register = () => {
  const registeredUser = useSelector((state) => state.registeredUser);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { name: "", username: "", password: "" },
    validateOnChange: true,
    validationSchema: registerUserSchema,
    onSubmit: async (values) => {
      await dispatch(registerUser(values));
    },
  });

  if (registeredUser.error && Object.keys(registeredUser.error).length) {
    formik.errors = { ...registeredUser.error };
  }

  let registerBtnName = "Register";

  if (registeredUser.loading) {
    registerBtnName = <ThreeDotsIndicator className='tree-dots-indicator' />;
  }

  if (registeredUser.user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='auth-form'>
      <form onSubmit={formik.handleSubmit}>
        <div className='form__group'>
          <input
            className='form-input'
            type='text'
            placeholder='Name'
            name='name'
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.errors.name && <p className='error'>{formik.errors.name}</p>}
        </div>
        <div className='form__group'>
          <input
            className='form-input'
            type='text'
            placeholder='Username'
            name='username'
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          {formik.errors.username && (
            <p className='error'>{formik.errors.username}</p>
          )}
        </div>
        <div className='form__group'>
          <input
            className='form-input'
            type='password'
            placeholder='Password'
            name='password'
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password && (
            <p className='error'>{formik.errors.password}</p>
          )}
        </div>
        <button
          className='btn btn-green btn-submit'
          disabled={false}
          type='submit'
        >
          {registerBtnName}
        </button>
        <p className='text-small margin-top-small'>
          <span>Got an account?</span>{" "}
          <Link className='text-small text-blue text-bold' to='/Login'>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
