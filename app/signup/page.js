"use client";
import React, { useEffect } from "react";

function SignUpForm() {
  useEffect(() => {
    const signUpForm = document.getElementById('signUpForm');

    signUpForm.addEventListener('submit', async function(event) { 
      event.preventDefault();

      const formData = new FormData(signUpForm); 
      const email = formData.get('email');
      const password = formData.get('password');

      try {
        const response = await fetch('/api/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
          const errorMessage = await response.json(); // 서버에서 보낸 오류 메시지를 가져옵니다.
          throw new Error(errorMessage.message); // 오류 메시지를 throw하여 catch 블록으로 이동합니다.
        }

        // { 가입 성공 }
        console.log('User signed up successfully'); 
        window.location.href = '/'; 
      } catch (error) {
        console.error('Error signing up:', error); 
        // 서버에서 오류 메시지를 받지 못한 경우에 대한 기본적인 오류 메시지를 출력합니다.
        alert('Failed to sign up');
      }
    });
  }, []);

  return (
    <div>
      <div className="mt-20">
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form id="signUpForm" className="space-y-6"> 
              <div>
                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">Email address</label>
                <div className="mt-2">
                  <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-blue-600 sm:text-sm sm:leading-6 pl-2 font-semibold" />
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
                  <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-blue-600 sm:text-sm sm:leading-6 pl-2 font-semibold" />
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
