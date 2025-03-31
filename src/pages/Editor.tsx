import React, { useState, useRef } from 'react';
import { useVideoEditor } from '../hooks/useVideoEditor';
import Header from '../components/layout/Header';

const Editor: React.FC = () => {
    const {
        videoUrl,
        segments,
        currentSegment,
        isProcessing,
        error,
        loadVideo,
        cutSegment,
        addText,
        addMusic,
        setCurrentSegment
    } = useVideoEditor();

    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [text, setText] = useState('');
    const [textPosition, setTextPosition] = useState({ x: 50, y: 50 });
    const [activeTab, setActiveTab] = useState('edit');
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleLoadVideo = async () => {
        if (youtubeUrl) {
            await loadVideo(youtubeUrl);
        }
    };

    const handleCut = async () => {
        if (videoRef.current) {
            const start = videoRef.current.currentTime;
            const end = start + 30;
            await cutSegment(start, end);
        }
    };

    const handleAddText = async () => {
        if (text) {
            await addText(text, textPosition);
        }
    };

    const handleAddMusic = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            await addMusic(file);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <Header />
            
            <main className="pt-20">
                <div className="container mx-auto px-4">
                    {/* URL Input */}
                    {!videoUrl && (
                        <div className="glass-effect p-6 mb-6">
                            <div className="flex space-x-4">
                                <input
                                    type="text"
                                    value={youtubeUrl}
                                    onChange={(e) => setYoutubeUrl(e.target.value)}
                                    placeholder="Paste YouTube URL"
                                    className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                                    disabled={isProcessing}
                                />
                                <button
                                    onClick={handleLoadVideo}
                                    disabled={isProcessing}
                                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                                >
                                    {isProcessing ? (
                                        <>
                                            <span className="material-icons animate-spin">refresh</span>
                                            <span>Loading...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="material-icons">download</span>
                                            <span>Load Video</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="text-red-500 mb-4 p-4 bg-red-900 bg-opacity-20 rounded-lg">
                            {error}
                        </div>
                    )}

                    {videoUrl && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Video Preview */}
                            <div className="lg:col-span-2">
                                <div className="glass-effect p-6">
                                    <div className="relative aspect-video rounded-lg overflow-hidden">
                                        <video
                                            ref={videoRef}
                                            src={videoUrl}
                                            controls
                                            className="w-full h-full"
                                        />
                                        <div className="absolute bottom-4 left-4 right-4 flex space-x-2">
                                            <button
                                                onClick={handleCut}
                                                disabled={isProcessing}
                                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                                            >
                                                <span className="material-icons">content_cut</span>
                                                <span>Cut</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Timeline */}
                                <div className="glass-effect p-6 mt-6">
                                    <h3 className="text-lg font-semibold mb-4">Timeline</h3>
                                    <div className="flex space-x-4 overflow-x-auto pb-4">
                                        {segments.map((segment, index) => (
                                            <div
                                                key={index}
                                                className={`p-4 rounded-lg cursor-pointer transition ${
                                                    index === currentSegment
                                                        ? 'bg-red-600'
                                                        : 'bg-gray-800 hover:bg-gray-700'
                                                }`}
                                                onClick={() => setCurrentSegment(index)}
                                            >
                                                <div className="text-sm text-gray-400">
                                                    {segment.start}s - {segment.end}s
                                                </div>
                                                <video
                                                    src={segment.url}
                                                    className="w-32 h-20 object-cover rounded"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Tools Panel */}
                            <div className="lg:col-span-1">
                                <div className="glass-effect p-6">
                                    <div className="flex space-x-2 mb-6">
                                        {['edit', 'text', 'music', 'effects'].map((tab) => (
                                            <button
                                                key={tab}
                                                onClick={() => setActiveTab(tab)}
                                                className={`px-4 py-2 rounded-lg transition ${
                                                    activeTab === tab
                                                        ? 'bg-red-600 text-white'
                                                        : 'bg-gray-800 text-gray-400 hover:text-white'
                                                }`}
                                            >
                                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Tab Content */}
                                    <div className="space-y-4">
                                        {activeTab === 'edit' && (
                                            <>
                                                <div className="space-y-4">
                                                    <button className="w-full bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition flex items-center justify-center space-x-2">
                                                        <span className="material-icons">auto_awesome</span>
                                                        <span>Auto-Detect</span>
                                                    </button>
                                                    <button className="w-full bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition flex items-center justify-center space-x-2">
                                                        <span className="material-icons">speed</span>
                                                        <span>Adjust Speed</span>
                                                    </button>
                                                    <button className="w-full bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition flex items-center justify-center space-x-2">
                                                        <span className="material-icons">filter</span>
                                                        <span>Apply Filter</span>
                                                    </button>
                                                </div>
                                            </>
                                        )}

                                        {activeTab === 'text' && (
                                            <div className="space-y-4">
                                                <input
                                                    type="text"
                                                    value={text}
                                                    onChange={(e) => setText(e.target.value)}
                                                    placeholder="Enter text"
                                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                                                />
                                                <button
                                                    onClick={handleAddText}
                                                    className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                                                >
                                                    Add Text
                                                </button>
                                            </div>
                                        )}

                                        {activeTab === 'music' && (
                                            <div className="space-y-4">
                                                <input
                                                    type="file"
                                                    accept="audio/*"
                                                    onChange={handleAddMusic}
                                                    className="hidden"
                                                    id="music-input"
                                                />
                                                <label
                                                    htmlFor="music-input"
                                                    className="w-full bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition cursor-pointer flex items-center justify-center space-x-2"
                                                >
                                                    <span className="material-icons">music_note</span>
                                                    <span>Add Music</span>
                                                </label>
                                            </div>
                                        )}

                                        {activeTab === 'effects' && (
                                            <div className="grid grid-cols-2 gap-4">
                                                {['Fade', 'Zoom', 'Blur', 'Color'].map((effect) => (
                                                    <button
                                                        key={effect}
                                                        className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition"
                                                    >
                                                        {effect}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Export Button */}
                                    <button className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg transition mt-6 flex items-center justify-center space-x-2">
                                        <span className="material-icons">download</span>
                                        <span>Export Reel</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Editor; 