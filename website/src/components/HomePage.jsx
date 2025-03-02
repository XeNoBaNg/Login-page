    import React, {useEffect, useState} from 'react'
    import { Link } from 'react-router-dom'
    import { useSnackbar } from 'notistack'

    const HomePage = () => {

        const [userName, setUserName] = useState('')
        const { enqueueSnackbar } = useSnackbar()

        useEffect(() => {
            const storedUser = localStorage.getItem('userName')
            if (storedUser) {
                setUserName(storedUser)
            }
        }, []);
    
        const handleLogout = () => {
            localStorage.removeItem('userName')
            enqueueSnackbar('Logged Out Successfully!', {variant : 'success'})
            setUserName('')
        }

        return (
            <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <h1 className="text-4xl font-bold text-gray-800 mb-12">Hello, {userName || 'User'}!</h1>
                <div className="flex flex-col space-y-6 w-full max-w-xs">
                <Link to="/register">
                    <button
                    className="w-full bg-red-500 text-white py-3 rounded-md font-semibold hover:bg-red-600 transition shadow-md"
                    >
                    Register
                    </button>
                </Link>
                {userName ? (
                    <button
                        onClick={handleLogout}
                        className="w-full bg-gray-600 text-white py-3 rounded-md font-semibold hover:bg-gray-400 transition shadow-md"
                    >
                        Logout
                    </button>
                ) : (
                    <Link to="/login">
                        <button
                            className="w-full bg-red-500 text-white py-3 rounded-md font-semibold hover:bg-red-600 transition shadow-md"
                        >
                            Login
                        </button>
                    </Link>
                )}
                </div>
            </section>
        )
    }

    export default HomePage