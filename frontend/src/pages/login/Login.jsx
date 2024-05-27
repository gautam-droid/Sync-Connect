import React from 'react'

const Login = () => {
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className="p-6 w-full bg-gray-400 rounded-lg bg-clip-padding backdrop-filter 
      backdrop-blur-lg bg-opacity-0 ">
        <h1 className='text-3xl font-semibold text-center text-gray-300'>Login
          <span className='text-orange-500'> Sync Connect</span>
        </h1>
        <form action="">
          <div>
            <label htmlFor='username' className='label p-2'>
              <span className='text-base label-text'>Username</span>
            </label>
            <input id="username" type='text' placeholder='Enter username' className='w-full input input-bordered h-10 border-black bg-transparent' />
          </div>
          <div>
            <label htmlFor='password' className='label p-2'>
              <span className='text-base label-text'>password</span>
            </label>
            <input id="password" type='password' placeholder='Enter password' className='w-full input input-bordered h-10 border-black bg-transparent' />
          </div>
        <a href="#" className='text-sm hover:underline hover:text-orange-500 mt-2 inline-block'>
          {"Don't"} have an account?
        </a>
        <div>
          <button className='btn btn-block btn-sm mt-2 bg-transparent border-black hover:bg-transparent hover:text-orange-500'>Login</button>
        </div>
        </form>

      </div>
    </div>
  )
}

export default Login