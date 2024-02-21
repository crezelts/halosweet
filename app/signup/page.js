"use client"
import React, { useState } from "react";
import axios from 'axios';


function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('/api/index', { email, password });
      
      console.log(response.data); // 서버에서 받은 응답 로그에 출력
      
      // 회원가입 성공 시 홈페이지로 리다이렉트
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing up:', error);
      
      if (error.response) {
        // 서버에서 받은 오류 메시지를 화면에 표시
        setError(error.response.data.message);
      } else {
        setError('Failed to sign up');
      }
    }
  };

  return (
   <div>
      <div className="mt-20">
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-6"> 
              <div>
                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">Email address</label>
                <div className="mt-2">
                  <input id="email" name="email" type="email" autoComplete="email" onChange={(e) => setEmail(e.target.value)} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-blue-600 sm:text-sm sm:leading-6 pl-2 font-semibold" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                  <div className="text-sm">
                    <a href="/sup" className="font-semibold text-blue-600 hover:text-blue-500">Forgot password?</a>
                  </div>
                </div>
                <div className="mt-2">
                  <input id="password" name="password" type="password" autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-blue-600 sm:text-sm sm:leading-6 pl-2 font-semibold" />
                </div>
              </div>

              <div>
                <button type="submit" className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Sign up</button> 
              </div>
            </form>

            <div className="flex items-center mt-7">
              <div className="flex-1 h-0 border-t border-gray-200"></div>
              <span className="px-4 text-black">Or continue with</span>
              <div className="flex-1 h-0 border-t border-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
    </div>  
  );
}

export default SignUpForm;
