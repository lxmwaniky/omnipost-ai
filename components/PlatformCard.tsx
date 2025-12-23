import React, { useState, useEffect, useRef } from 'react';
import { SocialPost, Platform } from '../types';
import { Copy, Download, Image as ImageIcon, Maximize2, Loader2, Pencil, Check, ChevronLeft, ChevronRight, Linkedin, Instagram, Facebook, Share2, X, Minus } from 'lucide-react';

// Custom X Icon
const XIcon = ({ size = 16, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

// Custom Pinterest Icon
const PinterestIcon = ({ size = 16, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.644 0-5.784 2.749-5.784 5.585 0 1.102.424 2.291.953 2.934.107.133.122.248.089.385-.098.408-.322 1.303-.366 1.485-.057.243-.192.294-.442.176-1.645-.767-2.675-3.182-2.675-5.118 0-4.152 3.028-7.964 8.74-7.964 4.586 0 8.147 3.268 8.147 7.637 0 4.546-2.869 8.218-6.855 8.218-1.334 0-2.589-.693-3.021-1.517l-.824 3.136c-.298 1.133-1.105 2.554-1.645 3.422 1.241.366 2.535.562 3.881.562 6.616 0 11.979-5.368 11.979-11.987C23.996 5.367 18.633 0 12.017 0z"/>
  </svg>
);

interface PlatformCardProps {
  post: SocialPost | null;
  isLoading: boolean;
  isGenerating: boolean;
  platform: Platform;
  onDownload: (url: string, filename: string) => void;
  onRemove?: () => void;
  onMinimize?: () => void;
}

// Helper functions moved outside component to avoid scope issues
const getHeaderColor = (platform: Platform) => {
   switch (platform) {
      case Platform.LINKEDIN: return "bg-blue-600/10 text-blue-400 border-b border-blue-500/20";
      case Platform.TWITTER: return "bg-white/10 text-white border-b border-white/20";
      case Platform.INSTAGRAM: return "bg-pink-500/10 text-pink-400 border-b border-pink-500/20";
      case Platform.FACEBOOK: return "bg-blue-500/10 text-blue-400 border-b border-blue-500/20";
      case Platform.PINTEREST: return "bg-red-600/10 text-red-500 border-b border-red-600/20";
      default: return "bg-gray-500/10 text-gray-400 border-b border-gray-500/20";
   }
};

const getPlatformIcon = (platform: Platform) => {
   switch (platform) {
      case Platform.LINKEDIN: return <Linkedin size={20} />;
      case Platform.TWITTER: return <XIcon size={20} />;
      case Platform.INSTAGRAM: return <Instagram size={20} />;
      case Platform.FACEBOOK: return <Facebook size={20} />;
      case Platform.PINTEREST: return <PinterestIcon size={20} />;
      default: return <Share2 size={20} />;
   }
};

const LoadingMessage = () => {
    const messages = [
        "Dreaming up visuals...",
        "Mixing colors...",
        "Applying style...",
        "Rendering pixels...",
        "Adding magic...",
        "Polishing details..."
    ];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % messages.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <span className="text-xs font-medium text-gray-500 animate-pulse min-w-[120px] text-center">
            {messages[index]}
        </span>
    );
};

const PlatformCard: React.FC<PlatformCardProps> = ({ 
  post, 
  isLoading, 
  isGenerating, 
  platform, 
  onDownload,
  onRemove,
  onMinimize
}) => {
  const [copied, setCopied] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync local state with prop when post changes
  useEffect(() => {
    if (post) {
      setEditedContent(post.content);
      setCurrentImageIndex(0);
    }
  }, [post]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current && !isMinimized) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [editedContent, isMinimized]);

  const handleCopy = () => {
    if (!post) return;
    // Use the edited content for clipboard
    const text = `${editedContent}\n\n${post.hashtags.map(t => `#${t}`).join(' ')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const onDownloadClick = () => {
      const currentUrl = post?.imageUrls?.[currentImageIndex];
      if (currentUrl) {
          onDownload(currentUrl, `${platform.toLowerCase().replace(' ', '-')}-post-${currentImageIndex + 1}.png`);
      }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (post?.imageUrls) {
        setCurrentImageIndex((prev) => (prev + 1) % post.imageUrls!.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (post?.imageUrls) {
        setCurrentImageIndex((prev) => (prev - 1 + post.imageUrls!.length) % post.imageUrls!.length);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemove) onRemove();
  };

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized((prev) => !prev);
  };
  if (isLoading) {
    return (
      <div className="h-full min-h-[400px] bg-zinc-900/50 backdrop-blur-md rounded-2xl border-2 border-white/20 p-6 shadow-lg shadow-black/20 flex flex-col animate-pulse overflow-hidden">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-white/10" />
          <div className="h-4 w-32 bg-white/10 rounded" />
        </div>
        <div className="space-y-3 mb-6">
          <div className="h-4 w-full bg-white/10 rounded" />
          <div className="h-4 w-3/4 bg-white/10 rounded" />
          <div className="h-4 w-5/6 bg-white/10 rounded" />
        </div>
        <div className="flex-1 bg-white/5 rounded-xl w-full aspect-square border border-white/10" />
      </div>
    );
  }

  if (!post && !isGenerating) {
     return null;
  }

  if (!post) return null;

  const hasMultipleImages = (post.imageUrls?.length || 0) > 1;
  const currentImageUrl = post.imageUrls?.[currentImageIndex];

  return (
    <div className="bg-zinc-900/80 backdrop-blur-xl rounded-2xl border-2 border-white/20 shadow-xl hover:shadow-2xl hover:border-emerald-500/30 transition-all duration-300 flex flex-col overflow-hidden group h-full w-full mx-auto">
      {/* Header with controls */}
      <div className={`px-4 py-3 ${getHeaderColor(platform)} flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          {getPlatformIcon(platform)}
          <span className="font-bold text-sm tracking-wide">{platform}</span>
        </div>
        
        <div className="flex items-center gap-2">
          {hasMultipleImages && !isMinimized && (
              <span className="text-xs text-gray-300 font-medium bg-black/30 px-2 py-1 rounded-full">
                  {currentImageIndex + 1} / {post.imageUrls!.length}
              </span>
          )}
          
          <div className="flex gap-1">
            <button 
              onClick={handleMinimize}
              className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
              title={isMinimized ? "Expand" : "Minimize"}
            >
              <Minus size={16} />
            </button>
            
            <button 
              onClick={handleRemove}
              className="p-1.5 hover:bg-red-500/20 rounded-lg transition-colors text-gray-400 hover:text-red-400"
              title="Remove card"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Content Area - Minimizable */}
      {!isMinimized ? (
        <div className="p-4 space-y-4 flex-grow flex flex-col overflow-hidden">
          <div className="relative group flex-grow overflow-hidden">
              <textarea
                  ref={textareaRef}
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="w-full bg-transparent text-gray-300 text-sm resize-none focus:outline-none focus:text-white transition-colors min-h-[80px] border border-white/10 rounded-lg p-3 focus:border-emerald-500/30 overflow-y-auto"
                  placeholder="Write your caption here..."
                  spellCheck={false}
                  style={{ scrollbarWidth: 'none' }}
              />
              <style jsx>{`
                textarea::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              <Pencil size={12} className="absolute top-3 right-3 text-gray-600 opacity-0 group-hover:opacity-100 pointer-events-none" />
          </div>
          
          {/* Hashtags */}
          {post.hashtags.length > 0 && (
              <div className="flex flex-wrap gap-2 overflow-hidden">
                  {post.hashtags.map((tag, i) => (
                      <span key={i} className="text-blue-400 text-sm hover:underline cursor-pointer bg-blue-500/10 px-2 py-1 rounded-full flex-shrink-0">
                          #{tag}
                      </span>
                  ))}
              </div>
          )}

          {/* Generated Image */}
          <div className="relative aspect-video bg-black/30 border-2 border-white/10 rounded-xl overflow-hidden group">
            {isGenerating ? ( 
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-full h-full bg-white/5 animate-pulse relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <div className="p-3 bg-white/5 rounded-full animate-bounce border border-white/10">
                        <ImageIcon size={24} className="text-gray-500" />
                    </div>
                    <LoadingMessage />
                </div>
              </div>
            ) : post?.imageUrls && post.imageUrls.length > 0 ? (
              <>
                <img 
                  src={post.imageUrls[currentImageIndex]} 
                  alt="Generated content" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                  onContextMenu={(e) => e.preventDefault()} // Disable right-click
                />
                
                {/* Image Navigation (if multiple) */}
                {post.imageUrls.length > 1 && (
                    <>
                        <button 
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-black/90 hover:scale-110 border border-white/20"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button 
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-black/90 hover:scale-110 border border-white/20"
                        >
                            <ChevronRight size={18} />
                        </button>
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                            {post.imageUrls.map((_, idx) => (
                                <div key={idx} className={`w-2 h-2 rounded-full ${idx === currentImageIndex ? 'bg-white' : 'bg-white/40'}`} />
                            ))}
                        </div>
                    </>
                )}
                
                <button 
                    onClick={() => window.open(currentImageUrl, '_blank')}
                    className="absolute top-3 right-3 p-2 bg-black/70 text-white rounded-full opacity-0 group-hover/image:opacity-100 transition-all hover:bg-black/90 hover:scale-110 border border-white/20"
                >
                    <Maximize2 size={16} />
                </button>
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 gap-2 bg-gradient-to-br from-black/50 to-zinc-900/50">
                <ImageIcon size={32} className="opacity-20" />
                <span className="text-xs opacity-40">No image generated</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        // Minimized state
        <div className="p-4 text-center overflow-hidden">
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <Minus size={16} />
            <span className="text-sm truncate">Minimized - Click the expand button above to show content</span>
          </div>
        </div>
      )}

      {/* Footer Actions */}
      {/* Footer Actions - Redesigned */}
{!isMinimized && (
  <div className="px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-t from-black/40 to-transparent border-t border-white/10 flex items-center justify-between gap-2 overflow-hidden">
    
    {/* Character Count - Minimal */}
    <div className="flex items-center gap-1.5">
      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 animate-pulse"></div>
      <span className="text-xs text-gray-400 font-medium">
        {editedContent.length}
      </span>
    </div>

    {/* Button Group - Compact & Cool */}
    <div className="flex gap-1.5 sm:gap-2">
      
      {/* Download Button */}
      <button 
        onClick={onDownloadClick}
        className="group relative px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg font-medium text-xs transition-all duration-200 overflow-hidden"
      >
        {/* Background & Border */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 border border-white/20 group-hover:border-emerald-500/40 group-active:border-emerald-500/60 transition-colors rounded-lg"></div>
        
        {/* Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300"></div>
        
        {/* Content */}
        <div className="relative flex items-center gap-1.5 sm:gap-2">
          <Download size={12} className="sm:w-3.5 sm:h-3.5 text-emerald-400 group-hover:text-emerald-300 group-active:text-emerald-200 transition-colors" />
          <span className="hidden xs:inline text-gray-300 group-hover:text-white group-active:text-white transition-colors">
            Download
          </span>
          <span className="inline xs:hidden text-gray-300 group-hover:text-white group-active:text-white transition-colors">
            Download
          </span>
        </div>
      </button>

      {/* Copy Button */}
      <button 
        onClick={handleCopy}
        className={`group relative px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg font-medium text-xs transition-all duration-200 overflow-hidden ${
          copied ? 'scale-95' : ''
        }`}
      >
        {/* Background & Border */}
        <div className={`absolute inset-0 border rounded-lg transition-colors ${
          copied 
            ? 'bg-emerald-500/10 border-emerald-500/40' 
            : 'bg-white/5 border-white/20 group-hover:border-cyan-500/40 group-active:border-cyan-500/60'
        }`}></div>
        
        {/* Hover/Active Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-r rounded-lg transition-opacity duration-300 ${
          copied 
            ? 'from-emerald-500/20 via-emerald-500/10 to-emerald-500/20 opacity-100' 
            : 'from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 group-active:opacity-100'
        }`}></div>
        
        {/* Pulsing Success Effect */}
        {copied && (
          <div className="absolute inset-0 bg-emerald-500/10 animate-pulse rounded-lg"></div>
        )}
        
        {/* Content */}
        <div className="relative flex items-center gap-1.5 sm:gap-2">
          {copied ? (
            <Check size={12} className="sm:w-3.5 sm:h-3.5 text-emerald-400" />
          ) : (
            <Copy size={12} className="sm:w-3.5 sm:h-3.5 text-cyan-400 group-hover:text-cyan-300 group-active:text-cyan-200 transition-colors" />
          )}
          <span className={`hidden xs:inline transition-colors ${
            copied 
              ? 'text-emerald-400' 
              : 'text-gray-300 group-hover:text-white group-active:text-white'
          }`}>
            {copied ? 'Copied!' : 'Copy'}
          </span>
          <span className={`inline xs:hidden transition-colors ${
            copied 
              ? 'text-emerald-400' 
              : 'text-gray-300 group-hover:text-white group-active:text-white'
          }`}>
            {copied ? '✓' : 'Copy'}
          </span>
        </div>
      </button>

    </div>
  </div>
)}
    </div>
  );
};

export default PlatformCard;