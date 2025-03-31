import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';

const Preview: React.FC = () => {
    const navigate = useNavigate();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [progress, setProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying && progress < 100) {
            interval = setInterval(() => {
                setProgress((prev) => Math.min(prev + 1, 100));
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isPlaying, progress]);

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
        }
    };

    const handleExport = () => {
        // TODO: Implement export functionality
        console.log('Exporting reel...');
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <Header />
            
            <main className="pt-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Video Preview */}
                        <div className="lg:col-span-2">
                            <div className="glass-effect p-6">
                                <div className="relative aspect-video rounded-lg overflow-hidden">
                                    <video
                                        ref={videoRef}
                                        src="https://example.com/video.mp4"
                                        className="w-full h-full"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                                        <div
                                            className="h-full bg-red-600 transition-all duration-100"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                                        <button
                                            onClick={() => navigate('/editor')}
                                            className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition flex items-center space-x-2"
                                        >
                                            <span className="material-icons">arrow_back</span>
                                            <span>Back to Editor</span>
                                        </button>
                                        <div className="flex space-x-4">
                                            <button
                                                onClick={handlePlayPause}
                                                className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full transition"
                                            >
                                                <span className="material-icons">
                                                    {isPlaying ? 'pause' : 'play_arrow'}
                                                </span>
                                            </button>
                                            <button
                                                onClick={handleExport}
                                                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition flex items-center space-x-2"
                                            >
                                                <span className="material-icons">download</span>
                                                <span>Export</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Info Panel */}
                        <div className="lg:col-span-1">
                            <div className="glass-effect p-6">
                                <h2 className="text-xl font-semibold mb-6">Reel Information</h2>
                                
                                <div className="space-y-4">
                                    <div className="bg-gray-800 p-4 rounded-lg">
                                        <div className="text-sm text-gray-400">Duration</div>
                                        <div className="text-lg font-medium">0:30</div>
                                    </div>
                                    
                                    <div className="bg-gray-800 p-4 rounded-lg">
                                        <div className="text-sm text-gray-400">Quality</div>
                                        <div className="text-lg font-medium">1080p</div>
                                    </div>
                                    
                                    <div className="bg-gray-800 p-4 rounded-lg">
                                        <div className="text-sm text-gray-400">Size</div>
                                        <div className="text-lg font-medium">15.2 MB</div>
                                    </div>
                                </div>

                                <div className="mt-6 space-y-4">
                                    <button className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg transition flex items-center justify-center space-x-2">
                                        <span className="material-icons">download</span>
                                        <span>Download Reel</span>
                                    </button>
                                    
                                    <button className="w-full bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition flex items-center justify-center space-x-2">
                                        <span className="material-icons">share</span>
                                        <span>Share Reel</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Preview; 