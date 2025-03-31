import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';

const Home: React.FC = () => {
    return (
        <div className="min-h-screen bg-black text-white">
            <Header />
            
            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4">
                <div className="container mx-auto">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
                            Create Viral Reels from YouTube Videos
                        </h1>
                        <p className="text-xl text-gray-400 mb-8">
                            Transform your YouTube content into engaging social media reels with AI-powered editing
                        </p>
                        <div className="flex flex-col md:flex-row gap-4 justify-center">
                            <Link 
                                to="/editor" 
                                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition flex items-center justify-center space-x-2"
                            >
                                <span className="material-icons">play_circle</span>
                                <span>Start Creating</span>
                            </Link>
                            <Link 
                                to="/templates" 
                                className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg text-lg font-semibold transition flex items-center justify-center space-x-2"
                            >
                                <span className="material-icons">template</span>
                                <span>View Templates</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white/5 p-6 rounded-xl backdrop-blur-sm border border-white/10">
                                <span className="material-icons text-4xl text-red-600 mb-4">{feature.icon}</span>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-400">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <div key={index} className="text-center">
                                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-xl font-bold">{index + 1}</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                                <p className="text-gray-400">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">Ready to Create Viral Reels?</h2>
                    <p className="text-xl text-gray-400 mb-8">
                        Join thousands of creators who are already using our platform
                    </p>
                    <Link 
                        to="/signup" 
                        className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition inline-flex items-center space-x-2"
                    >
                        <span>Get Started Free</span>
                        <span className="material-icons">arrow_forward</span>
                    </Link>
                </div>
            </section>
        </div>
    );
};

const features = [
    {
        icon: 'auto_awesome',
        title: 'AI-Powered Editing',
        description: 'Automatically detect and extract the most engaging moments from your videos'
    },
    {
        icon: 'speed',
        title: 'Smart Cutting',
        description: 'Intelligent video cutting that maintains context and flow'
    },
    {
        icon: 'music_note',
        title: 'Background Music',
        description: 'Add trending music tracks to make your reels more engaging'
    }
];

const steps = [
    {
        title: 'Paste URL',
        description: 'Copy and paste your YouTube video URL'
    },
    {
        title: 'AI Analysis',
        description: 'Our AI analyzes your video for the best moments'
    },
    {
        title: 'Customize',
        description: 'Edit and customize your reel with our tools'
    },
    {
        title: 'Export',
        description: 'Download your reel in high quality'
    }
];

export default Home; 