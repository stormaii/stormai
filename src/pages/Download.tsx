import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';

const Download: React.FC = () => {
    const navigate = useNavigate();
    const [isDownloading, setIsDownloading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleDownload = async () => {
        setIsDownloading(true);
        // Simuler le téléchargement
        for (let i = 0; i <= 100; i += 10) {
            await new Promise(resolve => setTimeout(resolve, 500));
            setProgress(i);
        }
        setIsDownloading(false);
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <Header />
            
            <main className="pt-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto">
                        <div className="glass-effect p-8">
                            <div className="text-center mb-8">
                                <h1 className="text-3xl font-bold mb-4">Your Reel is Ready!</h1>
                                <p className="text-gray-400">
                                    Your reel has been successfully processed and is ready for download.
                                </p>
                            </div>

                            {/* Download Progress */}
                            {isDownloading && (
                                <div className="mb-8">
                                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-red-600 transition-all duration-300"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                    <div className="text-center mt-2 text-sm text-gray-400">
                                        Downloading... {progress}%
                                    </div>
                                </div>
                            )}

                            {/* Download Options */}
                            <div className="space-y-4">
                                <button
                                    onClick={handleDownload}
                                    disabled={isDownloading}
                                    className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-4 rounded-lg transition flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isDownloading ? (
                                        <>
                                            <span className="material-icons animate-spin">refresh</span>
                                            <span>Downloading...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="material-icons">download</span>
                                            <span>Download Reel</span>
                                        </>
                                    )}
                                </button>

                                <button className="w-full bg-gray-800 hover:bg-gray-700 text-white px-6 py-4 rounded-lg transition flex items-center justify-center space-x-2">
                                    <span className="material-icons">share</span>
                                    <span>Share on Social Media</span>
                                </button>

                                <button className="w-full bg-gray-800 hover:bg-gray-700 text-white px-6 py-4 rounded-lg transition flex items-center justify-center space-x-2">
                                    <span className="material-icons">content_copy</span>
                                    <span>Copy Link</span>
                                </button>
                            </div>

                            {/* Reel Details */}
                            <div className="mt-8 pt-8 border-t border-gray-800">
                                <h2 className="text-xl font-semibold mb-4">Reel Details</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gray-800 p-4 rounded-lg">
                                        <div className="text-sm text-gray-400">Duration</div>
                                        <div className="text-lg font-medium">0:30</div>
                                    </div>
                                    <div className="bg-gray-800 p-4 rounded-lg">
                                        <div className="text-sm text-gray-400">Quality</div>
                                        <div className="text-lg font-medium">1080p</div>
                                    </div>
                                    <div className="bg-gray-800 p-4 rounded-lg">
                                        <div className="text-sm text-gray-400">Format</div>
                                        <div className="text-lg font-medium">MP4</div>
                                    </div>
                                    <div className="bg-gray-800 p-4 rounded-lg">
                                        <div className="text-sm text-gray-400">Size</div>
                                        <div className="text-lg font-medium">15.2 MB</div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-8 flex justify-center space-x-4">
                                <button
                                    onClick={() => navigate('/editor')}
                                    className="text-gray-400 hover:text-white transition flex items-center space-x-2"
                                >
                                    <span className="material-icons">edit</span>
                                    <span>Edit Again</span>
                                </button>
                                <button
                                    onClick={() => navigate('/')}
                                    className="text-gray-400 hover:text-white transition flex items-center space-x-2"
                                >
                                    <span className="material-icons">home</span>
                                    <span>Create New Reel</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Download; 