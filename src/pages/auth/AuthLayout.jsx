import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = ({children}) => {
  return (
    <div className="flex h-screen">
      <div className="hidden md:flex w-2/3 items-center justify-center bg-primary">
        <img src="/images/logo.png" alt="Login" className="max-w-full h-auto" />
      </div>
      <div className="w-full md:w-1/2 lg:w-1/3 flex flex-col items-center justify-start bg-white py-15 px-6">
        {children}
      </div>
    </div>
  )
}

export default AuthLayout
