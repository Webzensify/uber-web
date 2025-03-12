import React from 'react'
import OwnerLogin from '../../components/OwnerLogin'
import OwnerRegister from '../../components/OwnerRegister'
import { useState } from 'react';

const OwnerAuth = () => {
    const [isLoginSelected, setIsLoginSelected] = useState(true);
    return (
        <>


            {isLoginSelected ? <OwnerLogin /> : <OwnerRegister />}
            <div className='my-4'>
                OR
            </div>
            <div className="flex space-x-4 w-full">
                {isLoginSelected ? <button
                    className={`flex-1 bg-primary-dark text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline  ${!isLoginSelected ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => setIsLoginSelected(false)}
                    disabled={!isLoginSelected}
                >
                    Register
                </button> : <button
                    className={`flex-1 bg-primary-dark text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline ${isLoginSelected ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => setIsLoginSelected(true)}
                    disabled={isLoginSelected}
                >
                    Login
                </button>}

            </div>

        </>
    )
}

export default OwnerAuth
