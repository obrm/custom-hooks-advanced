import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import useInput from '../hooks/useInput';

import { validateEmail } from '../utils/validateEmail';

import { Logo, FormRow } from '../components';
import Wrapper from '../styles/styled/Login.styled';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const {
    value: name,
    error: nameError,
    handleChange: handleNameChange,
    handleBlur: handleNameBlur
  } = useInput('Please enter your name');

  const {
    value: password,
    error: passwordError,
    handleChange: handlePasswordChange,
    handleBlur: handlePasswordBlur
  } = useInput('Please enter your password');

  const {
    value: email,
    error: emailError,
    handleChange: handleEmailChange,
    handleBlur: handleEmailBlur
  } = useInput('Please enter a valid email', validateEmail);

  const onSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (!name || !email || validateEmail(email) || !password) {
      setIsLoading(false);
      handleNameBlur();
      handleEmailBlur();
      handlePasswordBlur();
      return;
    } else {
      setTimeout(() => {
        setIsLoading(false);
        localStorage.setItem('userData', JSON.stringify({ name, email })); 
        navigate('/main');
      }, 2000);
    }
  };

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        {/* name field */}
        <FormRow
          error={nameError.isError}
          type='text'
          name='name'
          value={name}
          handleChange={handleNameChange}
          handleBlur={handleNameBlur}
          message={nameError.message}
        />
        {/* email field */}
        <FormRow
          error={emailError.isError}
          type='email'
          name='email'
          value={email}
          handleChange={handleEmailChange}
          handleBlur={handleEmailBlur}
          message={emailError.message}
        />
        {/* password field */}
        <FormRow
          error={passwordError.isError}
          type='password'
          name='password'
          value={password}
          handleChange={handlePasswordChange}
          handleBlur={handlePasswordBlur}
          message={passwordError.message}
        />
        <button type='submit' className='btn btn-block' disabled={isLoading}>
          {isLoading ? 'loading...' : 'Log In'}
        </button>
        <Link to='/' className='btn btn-block btn-light mt'>
          Back
        </Link>
      </form>
    </Wrapper>
  );
};

export default Login;