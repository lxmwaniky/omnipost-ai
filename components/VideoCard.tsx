import React from 'react';
import { VideoPost } from '../types';
import { Download, Video, Loader2, Maximize2, Volume2, VolumeX } from 'lucide-react';

interface VideoCardProps {
  videoPost: VideoPost | undefined;
  isLoading: boolean;
  onDownload: (url: string, filename: string) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ videoPost, isLoading, onDownload }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = React.useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleDownload = () => {
    if (videoPost?.url) {
        onDownload(videoPost.url, 'generated-video.mp4');
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-full min-h-[400px] rounded-xl border border-teal-500/20 bg-zinc-900/50 backdrop-blur-md p-6 shadow-sm flex flex-col relative overflow-hidden">
        <div className="absolute inset-0 bg-teal-500/5 z-0"></div>
        <div className="z-10 flex flex-col items-center justify-center h-full gap-4 text-teal-400">
             <Loader2 size={40} className="animate-spin text-teal-500" />
             <div className="text-center">
                 <h3 className="font-bold text-lg">Generating Video...</h3>
                 <p className="text-sm opacity-70">Creating your masterpiece</p>
                 <p className="text-xs opacity-50 mt-2">This may take a minute</p>
             </div>
        </div>
      </div>
    );
  }

  if (!videoPost) {
      return null; // Don't render empty state if not requested
  }

  return (
    <div className="w-full bg-zinc-900/50 backdrop-blur-md rounded-xl border border-teal-500/20 shadow-lg overflow-hidden flex flex-col h-full transition-all hover:shadow-xl hover:border-teal-500/40">
      {/* Header */}
      <div className="px-4 py-3 border-b border-teal-500/20 flex items-center justify-between bg-teal-500/5 text-teal-400">
        <div className="flex items-center gap-2">
          <Video size={16} />
          <span className="font-bold text-sm tracking-wide uppercase">Video Reels</span>
        </div>
        <button 
            onClick={handleDownload}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium text-xs bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
        >
            <Download size={14} />
            Download
        </button>
      </div>

      {/* Video Area */}
      <div className="relative bg-black w-full flex-grow group min-h-[400px] flex items-center justify-center">
          <video 
             ref={videoRef}
             src={videoPost.url} 
             className="w-full h-full max-h-[500px] object-contain pointer-events-none"
             loop
             autoPlay
             muted={isMuted}
             playsInline
             onContextMenu={(e) => e.preventDefault()} // Disable right-click
          />
          
          {/* Custom Controls Overlay */}
          <div className="absolute bottom-4 right-4 z-20 flex gap-2">
              <button 
                  onClick={toggleMute}
                  className="p-2 bg-black/50 backdrop-blur-md text-white rounded-full hover:bg-black/70 transition-colors border border-white/10"
                  title={isMuted ? "Unmute" : "Mute"}
              >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
          </div>
          
           <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                 <button 
                    className="p-2 bg-black/50 backdrop-blur-md text-white rounded-full hover:bg-black/70 transition-colors"
                    title="View Fullscreen"
                    onClick={() => window.open(videoPost.url, '_blank')}
                >
                    <Maximize2 size={20} />
                </button>
           </div>
      </div>

      {/* Footer Info */}
      <div className="p-4 bg-white/5 border-t border-white/5">
         <p className="text-sm text-gray-300 leading-relaxed">
            {videoPost.content || videoPost.prompt}
         </p>
      </div>
    </div>
  );
};

export default VideoCard;