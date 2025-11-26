import React, { useState } from 'react'
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

// Password strength validation helper
const validatePassword = (pwd) => {
  const requirements = {
    hasUpperCase: /[A-Z]/.test(pwd),
    hasLowerCase: /[a-z]/.test(pwd),
    hasNumbers: /[0-9]/.test(pwd),
    hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd),
    isLengthValid: pwd.length >= 8
  };
  const isStrong = Object.values(requirements).every(val => val === true);
  return { requirements, isStrong };
};

// Name validation - only alphabets and spaces
const validateName = (name) => {
  return /^[a-zA-Z\s]+$/.test(name) && name.trim().length > 0;
};

const Login = () => {
  const [currentState, setCurrentState]= useState('Sign Up');
  const {token, setToken, navigate, backendUrl} = useContext(ShopContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordErrors, setPasswordErrors] = useState({});
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try{
      // Validate name for Sign Up
      if(currentState === 'Sign Up'){
        if(!validateName(name)){
          setNameError('Full name must contain only alphabets and spaces');
          toast.error('Full name must contain only alphabets and spaces');
          return;
        }
        const { isStrong } = validatePassword(password);
        if(!isStrong){
          toast.error('Password does not meet the required strength criteria');
          return;
        }
      }

      if(currentState === 'Sign Up'){
  const response = await axios.post(`${backendUrl}/api/user/register`, {name, email, password})
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
          setNameError('');
          setPasswordErrors({});
        }
        else{
          toast.error(response.data.message)
        }
      }
      else{
  const response = await axios.post(`${backendUrl}/api/user/login`, {email, password})
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        }
        else{
          toast.error(response.data.message)
        }
      }
    }
    catch (error){
      console.log(error);
      toast.error(error.message)
    }
  }

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    if(value && !validateName(value)){
      setNameError('Only alphabets and spaces are allowed');
    } else {
      setNameError('');
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    const { requirements } = validatePassword(value);
    setPasswordErrors(requirements);
  };
  useEffect(()=>{
    if(token){
      navigate('/')
    }
  })
  return (
    <div>
      <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
        <div className='inline-flex items-center gap-2 mb-2 mt-10'>
          <p className='prata-regular text-3xl'>{currentState}</p>
          <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
        </div>
        {currentState === 'Login' ? '' : (
          <div className='w-full'>
            <input 
              onChange={handleNameChange} 
              value={name} 
              type="text" 
              className={`w-full px-3 py-2 border ${nameError ? 'border-red-500' : 'border-gray-800'} rounded`}
              placeholder='Full Name (alphabets only)' 
              required
            />
            {nameError && <p className='text-red-500 text-xs mt-1'>{nameError}</p>}
          </div>
        )}
        <input 
          onChange={(e)=>setEmail(e.target.value)} 
          value={email} 
          type="email" 
          className='w-full px-3 py-2 border border-gray-800 rounded' 
          placeholder='Email' 
          required
        />
        <div className='w-full'>
          <input 
            onChange={handlePasswordChange} 
            value={password} 
            type="password" 
            className='w-full px-3 py-2 border border-gray-800 rounded'
            placeholder='Password'
            onFocus={() => currentState === 'Sign Up' && setShowPasswordRequirements(true)}
            onBlur={() => setShowPasswordRequirements(false)}
            required
          />
          {currentState === 'Sign Up' && (showPasswordRequirements || password) && (
            <div className='mt-3 p-3 bg-gray-50 border border-gray-200 rounded text-xs'>
              <p className='font-semibold text-gray-700 mb-2'>Password Requirements:</p>
              <div className='flex items-center gap-2 mb-1'>
                <span className={passwordErrors.isLengthValid ? '✓ text-green-600' : '✗ text-gray-400'}>At least 8 characters</span>
              </div>
              <div className='flex items-center gap-2 mb-1'>
                <span className={passwordErrors.hasUpperCase ? '✓ text-green-600' : '✗ text-gray-400'}>One uppercase letter (A-Z)</span>
              </div>
              <div className='flex items-center gap-2 mb-1'>
                <span className={passwordErrors.hasLowerCase ? '✓ text-green-600' : '✗ text-gray-400'}>One lowercase letter (a-z)</span>
              </div>
              <div className='flex items-center gap-2 mb-1'>
                <span className={passwordErrors.hasNumbers ? '✓ text-green-600' : '✗ text-gray-400'}>One number (0-9)</span>
              </div>
              <div className='flex items-center gap-2'>
                <span className={passwordErrors.hasSpecialChar ? '✓ text-green-600' : '✗ text-gray-400'}>One special character (!@#$%^&*)</span>
              </div>
            </div>
          )}
        </div>
        <div className='w-full flex justify-between text-sm mt-[-8px]'>
          <p className='cursor-pointer'>Forgot your password?</p>
          {
            currentState === 'Login'
            ? <p onClick={()=> setCurrentState('Sign Up')} className='cursor-pointer'>Create account</p>
            : <p onClick={()=> setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
          }
        </div>
        <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
      </form>
    </div>
  )
}

export default Login;
