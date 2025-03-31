import axios from 'axios';
import ytdl from 'ytdl-core';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { toBlobURL } from '@ffmpeg/util';

const YOUTUBE_API_KEY = process.env.VITE_YOUTUBE_API_KEY;
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';

export interface VideoInfo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  duration: string;
}

export interface VideoSegment {
    start: number;
    end: number;
    url: string;
}

export const extractVideoId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

export const getVideoInfo = async (videoId: string): Promise<VideoInfo> => {
  try {
    const response = await axios.get(`${YOUTUBE_API_URL}/videos`, {
      params: {
        part: 'snippet,contentDetails',
        id: videoId,
        key: YOUTUBE_API_KEY,
      },
    });

    const video = response.data.items[0];
    return {
      id: video.id,
      title: video.snippet.title,
      description: video.snippet.description,
      thumbnailUrl: video.snippet.thumbnails.high.url,
      duration: video.contentDetails.duration,
    };
  } catch (error) {
    console.error('Error fetching video info:', error);
    throw new Error('Failed to fetch video information');
  }
};

export const downloadVideo = async (videoId: string): Promise<Blob> => {
  try {
    const response = await axios.get(`/api/download-video/${videoId}`, {
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    console.error('Error downloading video:', error);
    throw new Error('Failed to download video');
  }
};

export class YouTubeService {
    private ffmpeg = createFFmpeg({ 
        log: true,
        coreURL: await toBlobURL(`/ffmpeg/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`/ffmpeg/ffmpeg-core.wasm`, 'application/wasm'),
    });

    constructor() {
        this.initializeFFmpeg();
    }

    private async initializeFFmpeg() {
        if (!this.ffmpeg.isLoaded()) {
            await this.ffmpeg.load();
        }
    }

    async downloadVideo(url: string): Promise<Blob> {
        try {
            const info = await ytdl.getInfo(url);
            const format = ytdl.chooseFormat(info.formats, { quality: 'highestvideo' });
            const response = await fetch(format.url);
            return await response.blob();
        } catch (error) {
            console.error('Error downloading video:', error);
            throw new Error('Failed to download video');
        }
    }

    async cutVideo(videoBlob: Blob, start: number, end: number): Promise<Blob> {
        try {
            const inputFileName = 'input.mp4';
            const outputFileName = 'output.mp4';

            // Write the video file to FFmpeg's virtual filesystem
            this.ffmpeg.FS('writeFile', inputFileName, await fetchFile(videoBlob));

            // Run FFmpeg command to cut the video
            await this.ffmpeg.run(
                '-i', inputFileName,
                '-ss', start.toString(),
                '-t', (end - start).toString(),
                '-c', 'copy',
                outputFileName
            );

            // Read the result
            const data = this.ffmpeg.FS('readFile', outputFileName);

            // Clean up files
            this.ffmpeg.FS('unlink', inputFileName);
            this.ffmpeg.FS('unlink', outputFileName);

            return new Blob([data.buffer], { type: 'video/mp4' });
        } catch (error) {
            console.error('Error cutting video:', error);
            throw new Error('Failed to cut video');
        }
    }

    async addText(videoBlob: Blob, text: string, position: { x: number; y: number }): Promise<Blob> {
        try {
            const inputFileName = 'input.mp4';
            const outputFileName = 'output.mp4';

            this.ffmpeg.FS('writeFile', inputFileName, await fetchFile(videoBlob));

            // Add text overlay using FFmpeg
            await this.ffmpeg.run(
                '-i', inputFileName,
                '-vf', `drawtext=text='${text}':x=${position.x}:y=${position.y}:fontsize=24:fontcolor=white:box=1:boxcolor=black@0.5`,
                '-c:a', 'copy',
                outputFileName
            );

            const data = this.ffmpeg.FS('readFile', outputFileName);

            // Clean up
            this.ffmpeg.FS('unlink', inputFileName);
            this.ffmpeg.FS('unlink', outputFileName);

            return new Blob([data.buffer], { type: 'video/mp4' });
        } catch (error) {
            console.error('Error adding text:', error);
            throw new Error('Failed to add text to video');
        }
    }

    async addMusic(videoBlob: Blob, musicBlob: Blob, volume: number = 0.5): Promise<Blob> {
        try {
            const inputFileName = 'input.mp4';
            const musicFileName = 'music.mp3';
            const outputFileName = 'output.mp4';

            this.ffmpeg.FS('writeFile', inputFileName, await fetchFile(videoBlob));
            this.ffmpeg.FS('writeFile', musicFileName, await fetchFile(musicBlob));

            // Mix video with music
            await this.ffmpeg.run(
                '-i', inputFileName,
                '-i', musicFileName,
                '-filter_complex', `[1:a]volume=${volume}[a1];[0:a][a1]amix=inputs=2:duration=first:dropout_transition=2`,
                '-c:v', 'copy',
                outputFileName
            );

            const data = this.ffmpeg.FS('readFile', outputFileName);

            // Clean up
            this.ffmpeg.FS('unlink', inputFileName);
            this.ffmpeg.FS('unlink', musicFileName);
            this.ffmpeg.FS('unlink', outputFileName);

            return new Blob([data.buffer], { type: 'video/mp4' });
        } catch (error) {
            console.error('Error adding music:', error);
            throw new Error('Failed to add music to video');
        }
    }
} 