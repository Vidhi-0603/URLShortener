import React from 'react'
import { Link } from 'lucide-react';
import ShortUrl from '../components/ShortUrl'

const Homepage = () => {
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
                            <Link className="w-8 h-8 text-indigo-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">URL Shortener</h1>
                        <p className="text-gray-600">Make your long URLs short and shareable</p>
                    </div>
                    <ShortUrl/>
                </div>
            </div>
        </>
    )
}

export default Homepage