import React, { useRef, useState, useEffect } from 'react';
import { Tone, ImageSize, AspectRatio, Platform } from '../types';
import { Wand2, Settings2, Upload, X, ImagePlus, Video, Sparkles, Layers, Send, BrainCircuit, Linkedin, Twitter, Instagram, Facebook, ChevronDown, MonitorPlay } from 'lucide-react';
import { improvePrompt } from '../services/geminiService';

// Custom Pinterest Icon since Lucide's Pin isn't the logo
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

interface GenerationFormProps {
  idea: string;
  setIdea: (val: string) => void;
  tone: Tone;
  setTone: (val: Tone) => void;
  imageSize: ImageSize;
  setImageSize: (val: ImageSize) => void;
  aspectRatio: AspectRatio;
  setAspectRatio: (val: AspectRatio) => void;
  imageCount: number;
  setImageCount: (val: number) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  sourceImage: string | null;
  setSourceImage: (val: string | null) => void;
  includeVideo: boolean;
  setIncludeVideo: (val: boolean) => void;
  selectedPlatforms: Record<Platform, boolean>;
  setSelectedPlatforms: (val: Record<Platform, boolean>) => void;
  hasKey: boolean;
}

const GenerationForm: React.FC<GenerationFormProps> = ({
  idea, setIdea, tone, setTone, imageSize, setImageSize, aspectRatio, setAspectRatio, 
  imageCount, setImageCount, onGenerate, isGenerating,
  sourceImage, setSourceImage, includeVideo, setIncludeVideo, selectedPlatforms, setSelectedPlatforms, hasKey
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isImproving, setIsImproving] = useState(false);
  const [isRatioOpen, setIsRatioOpen] = useState(false);
  const ratioRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSourceImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const clearImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSourceImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleImprovePrompt = async () => {
      if (!idea.trim() && !sourceImage) return;
      if (!hasKey) return; // Need key for Gem 3
      
      setIsImproving(true);
      try {
          const improved = await improvePrompt(idea, sourceImage);
          setIdea(improved);
      } catch (e) {
          console.error(e);
      } finally {
          setIsImproving(false);
      }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ratioRef.current && !ratioRef.current.contains(event.target as Node)) {
        setIsRatioOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Typewriter Effect for Placeholder
  const [placeholder, setPlaceholder] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(50); // Faster typing

  const placeholders = [
    "A Halloween offer for a coffee shop...",
    "Launch post for a new AI startup...",
    "Motivational quote for LinkedIn...",
    "Product showcase for a sleek watch...",
    "Hiring announcement for a Senior Dev...",
    "Behind the scenes of our office party..."
  ];

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % placeholders.length;
      const fullText = placeholders[i];

      setPlaceholder(isDeleting 
        ? fullText.substring(0, placeholder.length - 1) 
        : fullText.substring(0, placeholder.length + 1)
      );

      setTypingSpeed(isDeleting ? 20 : 50); // Faster typing and deleting

      if (!isDeleting && placeholder === fullText) {
        setTimeout(() => setIsDeleting(true), 1500); // Pause at end
      } else if (isDeleting && placeholder === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [placeholder, isDeleting, loopNum, typingSpeed]);

  const togglePlatform = (p: Platform) => {
      setSelectedPlatforms({ ...selectedPlatforms, [p]: !selectedPlatforms[p] });
  };

  const hasSelectedPlatform = Object.values(selectedPlatforms).some(Boolean);
  const canGenerate = (idea.trim() || sourceImage) && (hasSelectedPlatform || includeVideo) && !isGenerating;

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '80px'; // Reset to min-height
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = Math.min(Math.max(scrollHeight, 80), 200) + 'px';
    }
  }, [idea]);

    const [isHelpOpen, setIsHelpOpen] = useState(false);
    const [helpInput, setHelpInput] = useState('');

    const handleHelpSubmit = async () => {
        if (!helpInput.trim()) return;
        setIsImproving(true);
        // setIsHelpOpen(false); // Keep open to show progress
        try {
            // We use the same service but contextually it's "drafting" now
            const improved = await improvePrompt(helpInput, null); 
            setIdea(improved);
            setHelpInput('');
            setIsHelpOpen(false); // Close on success
        } catch (e) {
            console.error(e);
        } finally {
            setIsImproving(false);
        }
    };

  return (
    <div className="w-full mx-auto relative z-20">
      {/* Search Bar Container */}
      <div className={`
        relative group transition-all duration-300
        ${isGenerating ? 'opacity-50 pointer-events-none' : ''}
      `}>
         {/* The Bar */}
         <div className="relative flex items-center w-full bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl shadow-black/50 transition-all overflow-hidden focus-within:border-white/20 focus-within:ring-1 focus-within:ring-white/10">
            
            {/* Main Input */}
            <textarea
                ref={textareaRef}
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        if (canGenerate) onGenerate();
                    }
                }}
                placeholder={sourceImage ? "Describe how to change this image..." : placeholder}
                className="w-full bg-transparent border-none text-xl font-medium text-white placeholder:text-gray-500 focus:ring-0 py-8 pl-10 pr-48 resize-none min-h-[120px] max-h-[300px] leading-relaxed transition-all relative z-10"
                style={{ scrollbarWidth: 'none' }}
            />

             {/* Help Me Write Badge (Only if empty) */}
             {hasKey && !idea && !sourceImage && (
                 <button
                     onClick={() => setIsHelpOpen(true)}
                     className="absolute bottom-3 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all border backdrop-blur-md z-20 bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20 animate-fade-in-up"
                 >
                     <Sparkles size={12} />
                     Help me write
                 </button>
             )}

            {/* Right Actions (Absolute positioned) */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                
                {/* Image Upload */}
                <div className="relative">
                    <button 
                        onClick={!sourceImage ? triggerFileInput : clearImage}
                        className={`p-3 rounded-xl transition-colors relative group/tooltip ${sourceImage ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' : 'text-gray-400 hover:text-white hover:bg-white/10 border border-transparent'}`}
                        title={sourceImage ? "Remove Image" : "Upload Reference Image"}
                    >
                        {sourceImage ? <X size={20} /> : <ImagePlus size={20} />}
                    </button>
                    <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                </div>

                {/* Generate Button (Now using Send icon) */}
                <button
                    onClick={onGenerate}
                    disabled={!canGenerate}
                    className={`h-12 w-12 flex items-center justify-center rounded-xl transition-all transform active:scale-95 ${
                        !canGenerate
                        ? 'bg-white/5 text-gray-600 cursor-not-allowed'
                        : 'bg-white text-black hover:bg-gray-200 shadow-lg shadow-white/10'
                    }`}
                    title={(!hasSelectedPlatform && !includeVideo) ? "Select at least one platform or video" : "Generate Content"}
                >
                    {isGenerating ? (
                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    ) : (
                        <Send size={20} className="ml-0.5" />
                    )}
                </button>
            </div>
         </div>

         {/* Image Preview (if uploaded) */}
         {sourceImage && (
             <div className="mt-4 p-2 bg-zinc-900/90 border border-white/10 rounded-2xl backdrop-blur-md animate-fade-in flex items-center gap-4 relative z-10">
                 <img src={sourceImage} alt="Reference" className="h-16 w-16 object-cover rounded-xl border border-white/10" />
                 <div>
                     <p className="text-sm font-medium text-white">Reference Image Uploaded</p>
                     <p className="text-xs text-gray-400">We'll use this as inspiration</p>
                 </div>
             </div>
         )}
      </div>

      {/* Help Me Write Modal/Popover */}
      {isHelpOpen && (
          <div className="absolute top-0 left-0 w-full h-full bg-zinc-900/95 backdrop-blur-xl rounded-3xl z-30 flex flex-col items-center justify-center p-6 animate-fade-in border border-emerald-500/20">
              <div className="w-full max-w-md space-y-4">
                  <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                          <Sparkles size={18} className="text-emerald-400" />
                          Help me write
                      </h3>
                      <button onClick={() => setIsHelpOpen(false)} disabled={isImproving} className="text-gray-500 hover:text-white disabled:opacity-50">
                          <X size={18} />
                      </button>
                  </div>
                  
                  {isImproving ? (
                      <div className="h-32 flex flex-col items-center justify-center gap-3 text-center animate-fade-in">
                          <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                          <p className="text-sm text-emerald-400 font-medium animate-pulse">Drafting your masterpiece...</p>
                      </div>
                  ) : (
                      <>
                        <p className="text-sm text-gray-400">Briefly describe what you want to post about, and I'll draft a detailed prompt for you.</p>
                        <textarea 
                            autoFocus
                            value={helpInput}
                            onChange={(e) => setHelpInput(e.target.value)}
                            placeholder="e.g. A coffee shop announcing a halloween special..."
                            className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white placeholder:text-gray-600 focus:border-emerald-500/50 focus:ring-0 resize-none h-32"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleHelpSubmit();
                                }
                            }}
                        />
                      </>
                  )}

                  <div className="flex justify-end gap-2">
                      <button 
                          onClick={() => setIsHelpOpen(false)}
                          disabled={isImproving}
                          className="px-4 py-2 text-sm text-gray-400 hover:text-white disabled:opacity-50"
                      >
                          Cancel
                      </button>
                      <button 
                          onClick={handleHelpSubmit}
                          disabled={!helpInput.trim() || isImproving}
                          className="px-6 py-2 bg-emerald-500 text-black font-bold rounded-lg hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                          {isImproving ? 'Drafting...' : 'Draft'} <Wand2 size={14} />
                      </button>
                  </div>
              </div>
          </div>
      )}

      {/* Settings / Options Bar */}
      <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-6 animate-fade-in">
         
         {/* Platform Selector */}
         <div className="flex flex-col items-center gap-2 w-full md:w-auto">
            <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Target Platforms</span>
            <div className={`flex items-center bg-zinc-900/50 border rounded-full p-1 transition-colors ${!hasSelectedPlatform ? 'border-red-500/50 animate-pulse' : 'border-white/5'}`}>
                <button 
                    onClick={() => togglePlatform(Platform.LINKEDIN)}
                    className={`p-2 rounded-full transition-all ${selectedPlatforms[Platform.LINKEDIN] ? 'bg-blue-600/20 text-blue-400' : 'text-gray-500 hover:text-gray-300'}`}
                    title="LinkedIn"
                >
                    <Linkedin size={16} />
                </button>
                <button 
                    onClick={() => togglePlatform(Platform.TWITTER)}
                    className={`p-2 rounded-full transition-all ${selectedPlatforms[Platform.TWITTER] ? 'bg-white/20 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                    title="X"
                >
                    <XIcon size={16} />
                </button>
                <button 
                    onClick={() => togglePlatform(Platform.INSTAGRAM)}
                    className={`p-2 rounded-full transition-all ${selectedPlatforms[Platform.INSTAGRAM] ? 'bg-pink-500/20 text-pink-400' : 'text-gray-500 hover:text-gray-300'}`}
                    title="Instagram"
                >
                    <Instagram size={16} />
                </button>
                <button 
                    onClick={() => togglePlatform(Platform.FACEBOOK)}
                    className={`p-2 rounded-full transition-all ${selectedPlatforms[Platform.FACEBOOK] ? 'bg-blue-500/20 text-blue-400' : 'text-gray-500 hover:text-gray-300'}`}
                    title="Facebook"
                >
                    <Facebook size={16} />
                </button>
                <button 
                    onClick={() => togglePlatform(Platform.PINTEREST)}
                    className={`p-2 rounded-full transition-all ${selectedPlatforms[Platform.PINTEREST] ? 'bg-red-600/20 text-red-500' : 'text-gray-500 hover:text-gray-300'}`}
                    title="Pinterest"
                >
                    <PinterestIcon size={16} />
                </button>
            </div>
            {(!hasSelectedPlatform && !includeVideo) && <span className="text-[10px] text-red-400">Select at least one</span>}
         </div>

         <div className="hidden md:block w-px h-8 bg-white/10" />

         {/* Tone Selector (Horizontal Scroll) */}
         <div className="flex flex-col items-center gap-2 w-full md:w-auto max-w-full md:max-w-md relative group/tones">
            <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Tone of Voice</span>
            
            <div className="relative w-full flex items-center">
                {/* Left Scroll Button */}
                <button 
                    onClick={() => {
                        const container = document.getElementById('tone-scroll-container');
                        if (container) container.scrollBy({ left: -100, behavior: 'smooth' });
                    }}
                    className="absolute left-0 z-10 p-1.5 bg-zinc-900/80 backdrop-blur-sm border border-white/10 rounded-full text-gray-400 hover:text-white hover:bg-zinc-800 shadow-lg -ml-3 hidden md:flex opacity-0 group-hover/tones:opacity-100 transition-opacity"
                >
                    <ChevronDown size={12} className="rotate-90" />
                </button>

                <div 
                    id="tone-scroll-container"
                    className="flex items-center bg-zinc-900/50 border border-white/5 rounded-full p-1 w-full overflow-x-auto no-scrollbar mask-linear-fade scroll-smooth"
                >
                    <div className="flex gap-1 px-1">
                        {Object.values(Tone).map((t) => (
                            <button
                                key={t}
                                onClick={() => setTone(t)}
                                className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                                tone === t
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Scroll Button */}
                <button 
                    onClick={() => {
                        const container = document.getElementById('tone-scroll-container');
                        if (container) container.scrollBy({ left: 100, behavior: 'smooth' });
                    }}
                    className="absolute right-0 z-10 p-1.5 bg-zinc-900/80 backdrop-blur-sm border border-white/10 rounded-full text-gray-400 hover:text-white hover:bg-zinc-800 shadow-lg -mr-3 hidden md:flex opacity-0 group-hover/tones:opacity-100 transition-opacity"
                >
                    <ChevronDown size={12} className="-rotate-90" />
                </button>
            </div>
         </div>

         <div className="hidden md:block w-px h-8 bg-white/10" />

         {/* Right Controls Group */}
         <div className="flex flex-wrap justify-center items-center gap-4 w-full md:w-auto">
             
             {/* Video Toggle */}
             <div className="flex flex-col items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Video</span>
                <button 
                    onClick={() => setIncludeVideo(!includeVideo)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-medium transition-all shadow-lg ${
                        includeVideo 
                        ? 'bg-gradient-to-r from-teal-500/20 to-emerald-500/20 border-teal-500/50 text-teal-300 shadow-teal-500/10' 
                        : 'bg-zinc-900/50 border-white/5 text-gray-400 hover:bg-white/5'
                    }`}
                    title="Generate a video based on your idea"
                >
                    <MonitorPlay size={14} />
                    {includeVideo ? 'Generate Video' : 'Generate Video'}
                </button>
             </div>

             {/* Custom Aspect Ratio Dropdown */}
             <div className="flex flex-col items-center gap-2 relative" ref={ratioRef}>
                <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Ratio</span>
                <button 
                    onClick={() => setIsRatioOpen(!isRatioOpen)}
                    className="flex items-center gap-2 bg-zinc-900/50 border border-white/5 text-gray-300 text-xs rounded-full px-4 py-2 outline-none hover:bg-white/5 hover:border-white/10 transition-all min-w-[100px] justify-between"
                >
                    <span>{aspectRatio}</span>
                    <ChevronDown size={12} className={`transition-transform ${isRatioOpen ? 'rotate-180' : ''}`} />
                </button>

                {isRatioOpen && (
                    <div className="absolute bottom-full left-0 mb-2 w-40 bg-zinc-900 border border-white/10 rounded-xl shadow-xl overflow-hidden z-50 animate-fade-in-up">
                        {Object.values(AspectRatio).map((ratio) => (
                            <button
                                key={ratio}
                                onClick={() => {
                                    setAspectRatio(ratio);
                                    setIsRatioOpen(false);
                                }}
                                className={`w-full text-left px-4 py-2.5 text-xs hover:bg-white/5 transition-colors flex items-center justify-between ${
                                    aspectRatio === ratio ? 'text-emerald-400 bg-emerald-500/5' : 'text-gray-400'
                                }`}
                            >
                                {ratio}
                                {aspectRatio === ratio && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                            </button>
                        ))}
                    </div>
                )}
             </div>
         </div>
      </div>
    </div>
  );
};

export default GenerationForm;