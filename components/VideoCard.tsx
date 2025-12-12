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
      <div className="w-full h-full min-h-[300px] sm:min-h-[350px] md:min-h-[400px] rounded-lg sm:rounded-xl border border-teal-500/20 bg-zinc-900/50 backdrop-blur-md p-4 sm:p-6 shadow-sm flex flex-col relative overflow-hidden">
        <div className="absolute inset-0 bg-teal-500/5 z-0"></div>
        <div className="z-10 flex flex-col items-center justify-center h-full gap-3 sm:gap-4 text-teal-400">
             <Loader2 size={32} className="sm:w-10 sm:h-10 md:w-12 md:h-12 animate-spin text-teal-500" />
             <div className="text-center">
                 <h3 className="font-bold text-base sm:text-lg">Generating Video...</h3>
                 <p className="text-xs sm:text-sm opacity-70">Creating your masterpiece</p>
                 <p className="text-xs opacity-50 mt-1 sm:mt-2">This may take a minute</p>
             </div>
        </div>
      </div>
    );
  }

  if (!videoPost) {
      return null; // Don't render empty state if not requested
  }

  return (
    <div className="w-full bg-zinc-900/50 backdrop-blur-md rounded-lg sm:rounded-xl border border-teal-500/20 shadow-sm sm:shadow-lg overflow-hidden flex flex-col h-full transition-all hover:shadow-xl hover:border-teal-500/40">
      {/* Header */}
      <div className="px-3 sm:px-4 py-2 sm:py-3 border-b border-teal-500/20 flex items-center justify-between bg-teal-500/5 text-teal-400">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Video size={14} className="sm:w-4 sm:h-4" />
          <span className="font-bold text-xs sm:text-sm tracking-wide uppercase truncate">Video Reels</span>
        </div>
        <button 
            onClick={handleDownload}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg font-medium text-xs bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all min-h-[32px]"
        >
            <Download size={12} className="sm:w-3.5 sm:h-3.5" />
            <span className="hidden xs:inline">Download</span>
            <span className="inline xs:hidden">DL</span>
        </button>
      </div>

      {/* Video Area */}
      <div className="relative bg-black w-full flex-grow group min-h-[250px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[400px] flex items-center justify-center">
          <video 
             ref={videoRef}
             src={videoPost.url} 
             className="w-full h-full max-h-[300px] sm:max-h-[350px] md:max-h-[400px] lg:max-h-[500px] object-contain pointer-events-none"
             loop
             autoPlay
             muted={isMuted}
             playsInline
             onContextMenu={(e) => e.preventDefault()} // Disable right-click
          />
          
          {/* Custom Controls Overlay */}
          <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 right-2 sm:right-3 md:right-4 z-20 flex gap-1.5 sm:gap-2">
              <button 
                  onClick={toggleMute}
                  className="p-1.5 sm:p-2 bg-black/50 backdrop-blur-md text-white rounded-full hover:bg-black/70 transition-colors border border-white/10 min-w-[36px] min-h-[36px] flex items-center justify-center"
                  title={isMuted ? "Unmute" : "Mute"}
              >
                  {isMuted ? <VolumeX size={16} className="sm:w-5 sm:h-5" /> : <Volume2 size={16} className="sm:w-5 sm:h-5" />}
              </button>
          </div>
          
           <div className="absolute top-2 sm:top-3 right-2 sm:right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                 <button 
                    className="p-1.5 sm:p-2 bg-black/50 backdrop-blur-md text-white rounded-full hover:bg-black/70 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
                    title="View Fullscreen"
                    onClick={() => window.open(videoPost.url, '_blank')}
                >
                    <Maximize2 size={16} className="sm:w-5 sm:h-5" />
                </button>
           </div>
      </div>

      {/* Footer Info */}
      <div className="p-3 sm:p-4 bg-white/5 border-t border-white/5">
         <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            {videoPost.content || videoPost.prompt}
         </p>
      </div>
    </div>
  );
};

export default VideoCard;