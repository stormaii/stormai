import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
                            ReelCreator
                        </span>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link to="/features" className="text-gray-300 hover:text-white transition">
                            Features
                        </Link>
                        <Link to="/pricing" className="text-gray-300 hover:text-white transition">
                            Pricing
                        </Link>
                        <Link to="/templates" className="text-gray-300 hover:text-white transition">
                            Templates
                        </Link>
                        <Link to="/blog" className="text-gray-300 hover:text-white transition">
                            Blog
                        </Link>
                    </nav>

                    {/* Auth Buttons */}
                    <div className="flex items-center space-x-4">
                        <Link 
                            to="/login" 
                            className="text-gray-300 hover:text-white transition"
                        >
                            Login
                        </Link>
                        <Link 
                            to="/signup" 
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden text-gray-300 hover:text-white">
                        <span className="material-icons">menu</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header; 