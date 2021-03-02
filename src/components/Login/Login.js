import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { login } from "../../store/actions/login";
import { ReactComponent as ThreeDotsIndicator } from "../../assets/images/icons/three-dots.svg";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: {
      value: "",
      valid: false,
      validation: {
        required: true,
      },
    },
    password: {
      value: "",
      valid: false,
      validation: {
        required: true,
      },
    },
  });

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(login(inputs.username.value, inputs.password.value));
  };

  const handleChange = (event, inputName) => {
    const updatedInputs = {
      ...inputs,
      [inputName]: {
        ...inputs[inputName],
        value: event.target.value,
        valid: checkValidity(event.target.value, inputs[inputName].validation),
      },
    };
    setInputs(updatedInputs);
  };

  const checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    return isValid;
  };

  let displayLoginErrors = null;

  if (auth.error) {
    displayLoginErrors = <p className='error text-small'>{auth.error}</p>;
  }

  let loginBtnName = "Login";

  if (auth.loading) {
    loginBtnName = <ThreeDotsIndicator className='tree-dots-indicator' />;
  }

  if (auth.isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <div className='auth-form'>
      <form onSubmit={handleLogin}>
        {displayLoginErrors}
        <div className='form__group'>
          <input
            className='form-input'
            type='text'
            placeholder='Username'
            value={inputs.username.value}
            disabled={false}
            onChange={(event) => handleChange(event, "username")}
          />
        </div>
        <div className='form__group'>
          <input
            className='form-input'
            type='password'
            placeholder='Password'
            value={inputs.password.value}
            disabled={false}
            onChange={(event) => handleChange(event, "password")}
          />
        </div>
        <button
          className='btn btn-green btn-submit'
          disabled={
            inputs.username.valid === false ||
            inputs.password.valid === false ||
            auth.loading === true
          }
          type='submit'
        >
          {loginBtnName}
        </button>
        <p className='text-small margin-top-small'>
          <span>No account?</span>{" "}
          <Link className='text-small text-blue text-bold' to='/register'>
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
