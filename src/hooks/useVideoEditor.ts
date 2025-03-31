import { useState, useCallback, useEffect } from 'react';
import { YouTubeService, VideoSegment } from '../services/youtube';

interface VideoEditorState {
    videoUrl: string;
    segments: VideoSegment[];
    currentSegment: number;
    isProcessing: boolean;
    error: string | null;
    videoBlob: Blob | null;
}

export const useVideoEditor = () => {
    const [state, setState] = useState<VideoEditorState>({
        videoUrl: '',
        segments: [],
        currentSegment: 0,
        isProcessing: false,
        error: null,
        videoBlob: null
    });

    const youtubeService = new YouTubeService();

    const loadVideo = useCallback(async (url: string) => {
        try {
            setState(prev => ({ ...prev, isProcessing: true, error: null }));
            const videoBlob = await youtubeService.downloadVideo(url);
            const videoUrl = URL.createObjectURL(videoBlob);
            
            setState(prev => ({
                ...prev,
                videoUrl,
                videoBlob,
                segments: [{
                    start: 0,
                    end: 30, // Durée par défaut de 30 secondes
                    url: videoUrl
                }]
            }));
        } catch (error) {
            setState(prev => ({
                ...prev,
                error: error instanceof Error ? error.message : 'Une erreur est survenue'
            }));
        } finally {
            setState(prev => ({ ...prev, isProcessing: false }));
        }
    }, []);

    const cutSegment = useCallback(async (start: number, end: number) => {
        try {
            setState(prev => ({ ...prev, isProcessing: true, error: null }));
            const currentSegment = state.segments[state.currentSegment];
            const videoBlob = await youtubeService.downloadVideo(currentSegment.url);
            const cutBlob = await youtubeService.cutVideo(videoBlob, start, end);
            const newUrl = URL.createObjectURL(cutBlob);

            setState(prev => ({
                ...prev,
                segments: prev.segments.map((segment, index) => 
                    index === prev.currentSegment 
                        ? { ...segment, start, end, url: newUrl }
                        : segment
                )
            }));
        } catch (error) {
            setState(prev => ({
                ...prev,
                error: error instanceof Error ? error.message : 'Une erreur est survenue'
            }));
        } finally {
            setState(prev => ({ ...prev, isProcessing: false }));
        }
    }, [state.currentSegment, state.segments]);

    const addText = useCallback(async (text: string, position: { x: number; y: number }) => {
        try {
            setState(prev => ({ ...prev, isProcessing: true, error: null }));
            const currentSegment = state.segments[state.currentSegment];
            const videoBlob = await youtubeService.downloadVideo(currentSegment.url);
            const processedBlob = await youtubeService.addText(videoBlob, text, position);
            const newUrl = URL.createObjectURL(processedBlob);

            setState(prev => ({
                ...prev,
                segments: prev.segments.map((segment, index) => 
                    index === prev.currentSegment 
                        ? { ...segment, url: newUrl }
                        : segment
                )
            }));
        } catch (error) {
            setState(prev => ({
                ...prev,
                error: error instanceof Error ? error.message : 'Une erreur est survenue'
            }));
        } finally {
            setState(prev => ({ ...prev, isProcessing: false }));
        }
    }, [state.currentSegment, state.segments]);

    const addMusic = useCallback(async (musicBlob: Blob, volume: number = 0.5) => {
        try {
            setState(prev => ({ ...prev, isProcessing: true, error: null }));
            const currentSegment = state.segments[state.currentSegment];
            const videoBlob = await youtubeService.downloadVideo(currentSegment.url);
            const processedBlob = await youtubeService.addMusic(videoBlob, musicBlob, volume);
            const newUrl = URL.createObjectURL(processedBlob);

            setState(prev => ({
                ...prev,
                segments: prev.segments.map((segment, index) => 
                    index === prev.currentSegment 
                        ? { ...segment, url: newUrl }
                        : segment
                )
            }));
        } catch (error) {
            setState(prev => ({
                ...prev,
                error: error instanceof Error ? error.message : 'Une erreur est survenue'
            }));
        } finally {
            setState(prev => ({ ...prev, isProcessing: false }));
        }
    }, [state.currentSegment, state.segments]);

    const setCurrentSegment = useCallback((index: number) => {
        setState(prev => ({ ...prev, currentSegment: index }));
    }, []);

    // Nettoyage des URLs d'objets lors du démontage
    useEffect(() => {
        return () => {
            state.segments.forEach(segment => {
                URL.revokeObjectURL(segment.url);
            });
            if (state.videoUrl) {
                URL.revokeObjectURL(state.videoUrl);
            }
        };
    }, [state.segments, state.videoUrl]);

    return {
        ...state,
        loadVideo,
        cutSegment,
        addText,
        addMusic,
        setCurrentSegment
    };
}; 