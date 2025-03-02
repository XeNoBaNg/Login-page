import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSnackbar } from 'notistack'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const data = {
      email,
      password
    }

    try {
      const res = await axios.post('http://localhost:5000/users/login', data)

      if (res.data.userName) {
          localStorage.setItem('userName', res.data.userName);
          enqueueSnackbar('Logged In Successfully!', {variant : 'success'})
          navigate('/')
        } else {
          enqueueSnackbar('Invalid Credentials!', {variant : 'error'})
        }
      } catch (err) {
        if (err.response) {
          enqueueSnackbar(err.response.data.message, {variant : 'error'})
        } else {
          enqueueSnackbar('An error occurred. Please try again.', {variant : 'error'})
        }
        console.log(err)
      }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-center text-red-500 text-3xl font-bold mb-6">Login</h1>
        <form className="flex flex-col space-y-4" onSubmit={handleFormSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-3 rounded-md font-semibold hover:bg-red-600 transition"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4 text-gray-500 border-t pt-4">
          New here?{' '}
          <Link className="underline text-red-500 hover:text-red-600" to={'/register'}>
            Register here &raquo;
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login
