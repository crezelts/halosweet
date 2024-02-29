"use client"
import React, { useState } from "react";
import Head from "next/head";

function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch('/api/new-meetup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error('Sign up failed');
      }
      const data = await response.json();
      console.log(data);
      window.location.href = '/'
    } catch (error) {
      console.error('Sign up failed:', error);
      setError(error.message || 'Sign up failed');
    }
  }

  return (
    <div>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="This is the home page" />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
          as="style"
          crossOrigin="anonymous"
        />
      </Head>
      <div className="mt-20">
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {error && <p>{error}</p>}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-blue-600 sm:text-sm sm:leading-6 pl-2 font-semibold"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="/sup"
                      className="font-semibold text-blue-600 hover:text-blue-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-blue-600 sm:text-sm sm:leading-6 pl-2 font-semibold"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Sign up
                </button>
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
