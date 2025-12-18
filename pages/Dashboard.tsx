import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Tone, ImageSize, AspectRatio, GeneratedContent, SocialPost, Platform } from '../types';
import { generateSocialText, generateImageForPlatform, generateVideo } from '../services/geminiService';
import GenerationForm from '../components/GenerationForm';
import PlatformCard from '../components/PlatformCard';
import VideoCard from '../components/VideoCard';
import WaitlistModal from '../components/WaitlistModal';
import Logo from '../components/Logo';
import SocialBackground from '../components/SocialBackground';
import { Sparkles, AlertCircle, Key, Zap, LogIn, LayoutGrid, History, Settings, Bell, ChevronDown, User } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [idea, setIdea] = useState('');
  const [tone, setTone] = useState<Tone>(Tone.PROFESSIONAL);
  const [imageSize, setImageSize] = useState<ImageSize>(ImageSize.SIZE_1K);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(AspectRatio.AUTO);
  const [imageCount, setImageCount] = useState<number>(1);
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [includeVideo, setIncludeVideo] = useState(false);
  
  const [selectedPlatforms, setSelectedPlatforms] = useState<Record<Platform, boolean>>({
    [Platform.LINKEDIN]: false,
    [Platform.TWITTER]: false,
    [Platform.INSTAGRAM]: false,
    [Platform.FACEBOOK]: false,
    [Platform.PINTEREST]: false,
    [Platform.VIDEO]: false // Video is handled separately
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [isVideoGenerating, setIsVideoGenerating] = useState(false);
  const [hasKey, setHasKey] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  const [results, setResults] = useState<GeneratedContent | null>(null);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleWaitlistSuccess = () => {
    setIsSignedIn(true);
    // Don't close here, the modal handles closing itself
  };

  const handleDownloadAttempt = (url: string, filename: string) => {
    // if (!isSignedIn) {
    //   setIsWaitlistOpen(true);
    //   return;
    // }
    
    // Proceed with download
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Check for API Key on mount
  useEffect(() => {
    const checkKey = async () => {
      const win = window as any;
      if (win.aistudio && win.aistudio.hasSelectedApiKey) {
        const has = await win.aistudio.hasSelectedApiKey();
        setHasKey(has);
      } else if (process.env.API_KEY) {
        setHasKey(true);
      }
    };
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    try {
      const win = window as any;
      if (win.aistudio && win.aistudio.openSelectKey) {
        await win.aistudio.openSelectKey();
        const has = await win.aistudio.hasSelectedApiKey();
        setHasKey(has);
        setError(null);
      }
    } catch (e) {
      console.error(e);
      setError("Failed to select API Key. Please try again.");
    }
  };

  // Handle removing a platform card
  const handleRemoveCard = (platform: Platform) => {
    // Deselect the platform
    setSelectedPlatforms(prev => ({ ...prev, [platform]: false }));
    
    // Remove results for that platform
    setResults(prev => {
      if (!prev) return prev;
      const newResults = { ...prev };
      
      // Remove the platform from results
      const platformKey = platform.toLowerCase() as keyof GeneratedContent;
      if (newResults[platformKey]) {
        delete newResults[platformKey];
      }
      
      // If no results left, clear the entire results
      if (Object.keys(newResults).length === 0) {
        return null;
      }
      
      return newResults;
    });
  };

  const handleGenerate = useCallback(async () => {
    if (!hasKey) {
      await handleSelectKey();
      return;
    }

    const hasPlatform = Object.values(selectedPlatforms).some(Boolean) || includeVideo;
    if (!hasPlatform) {
      setError("Please select at least one platform or enable video.");
      return;
    }

    if (!idea.trim() && !sourceImage) {
      setError("Please enter an idea or upload an image.");
      return;
    }

    setIsGenerating(true);
    if (includeVideo) setIsVideoGenerating(true);
    setError(null);
    setResults(null);

    try {
      // 1. Generate Text Content First (Only for selected platforms)
      const textContent = await generateSocialText(idea || "Create a caption for this image", tone, selectedPlatforms);
      
      const hasTextPlatforms = Object.values(selectedPlatforms).some(Boolean);
      if (hasTextPlatforms && Object.keys(textContent).length === 0) {
          throw new Error("We couldn't generate posts for your selected platforms. Please try a different idea or try again.");
      }
      
      // Determine aspect ratios
      const getRatio = (defaultRatio: string) => aspectRatio === AspectRatio.AUTO ? defaultRatio : aspectRatio;

      // Prepare placeholder results (only for returned platforms)
      const initialResults: GeneratedContent = {};
      
      if (textContent.linkedin) {
          initialResults.linkedin = { ...textContent.linkedin, platform: Platform.LINKEDIN, aspectRatio: getRatio('4:5'), imageUrls: [] };
      }
      if (textContent.twitter) {
          initialResults.twitter = { ...textContent.twitter, platform: Platform.TWITTER, aspectRatio: getRatio('16:9'), imageUrls: [] };
      }
      if (textContent.instagram) {
          initialResults.instagram = { ...textContent.instagram, platform: Platform.INSTAGRAM, aspectRatio: getRatio('1:1'), imageUrls: [] };
      }
      if (textContent.facebook) {
          initialResults.facebook = { ...textContent.facebook, platform: Platform.FACEBOOK, aspectRatio: getRatio('1:1'), imageUrls: [] };
      }
      if (textContent.pinterest) {
          initialResults.pinterest = { ...textContent.pinterest, platform: Platform.PINTEREST, aspectRatio: getRatio('2:3'), imageUrls: [] };
      }
      
      setResults(initialResults);

      // 2. Generate Images and Video in Parallel
      
      // Helper for images
      const generateImageSafe = async (platformKey: keyof GeneratedContent, post: SocialPost | undefined, platform: Platform) => {
        if (!selectedPlatforms[platform] || !post) return; // Skip if not selected or post is missing

        try {
            const promptToUse = post.imagePrompt || `${idea}. ${tone} style.`;
            const imageUrls = await generateImageForPlatform(
              promptToUse, 
              post.aspectRatio, 
              imageSize, 
              aspectRatio,
              sourceImage,
              imageCount
            );
            setResults(prev => prev ? { ...prev, [platformKey]: { ...prev[platformKey], imageUrls } } : null);
        } catch (e) {
            console.error(`Failed to generate image for ${platformKey}`, e);
        }
      };

      // Helper for video
      const generateVideoSafe = async () => {
          if (!includeVideo) return;
          try {
              // Always use Creative Mode: Use the generated image prompt from any available platform
              // We cast to SocialPost because generateSocialText only returns SocialPost objects
              const availablePlatform = Object.values(textContent)[0] as SocialPost | undefined;
              const basePrompt = availablePlatform?.imagePrompt || idea;
              const videoPrompt = `Create a cinematic video based on this visual description: ${basePrompt}. Scenes should include dynamic camera movements and professional lighting.`;
              
              // Use the caption from available platform
              const videoCaption = availablePlatform?.content || "Check this out!";

              const videoUrl = await generateVideo(videoPrompt);
              setResults(prev => prev ? { 
                  ...prev, 
                  video: { url: videoUrl, prompt: videoPrompt, content: videoCaption } 
              } : null);
          } catch (e: any) {
              console.error("Failed to generate video", e);
              if (e.message?.includes('429') || e.message?.includes('quota')) {
                  setWarning("Video generation limit reached. Try again in a minute! ⏳");
              }
          } finally {
              setIsVideoGenerating(false);
          }
      };

      // Trigger parallel generations
      await Promise.all([
        generateImageSafe('linkedin', initialResults.linkedin, Platform.LINKEDIN),
        generateImageSafe('twitter', initialResults.twitter, Platform.TWITTER),
        generateImageSafe('instagram', initialResults.instagram, Platform.INSTAGRAM),
        generateImageSafe('facebook', initialResults.facebook, Platform.FACEBOOK),
        generateImageSafe('pinterest', initialResults.pinterest, Platform.PINTEREST),
        generateVideoSafe()
      ]);

    } catch (e: any) {
      console.error(e);
      setError(e.message || "An error occurred while generating content. Please try again.");
      setIsVideoGenerating(false);
    } finally {
      setIsGenerating(false);
      // Clear form after successful generation (if no error)
      if (!error) {
          setIdea('');
          setSourceImage(null);
      }
    }
  }, [hasKey, idea, tone, imageSize, aspectRatio, sourceImage, includeVideo, imageCount, selectedPlatforms]);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-emerald-500 selection:text-white overflow-x-hidden">
      <SocialBackground />
      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} onSuccess={handleWaitlistSuccess} />

      {/* Header - Consistent with Landing Page */}
      <nav className="fixed top-0 w-full z-50 bg-black/95 backdrop-blur-lg border-b border-white/10 px-3 xs:px-4 sm:px-5 md:px-6">
        <div className="max-w-7xl mx-auto h-14 xs:h-16 sm:h-18 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-2.5 md:gap-3">
            <Logo className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-emerald-500" />
            <span className="text-sm xs:text-base sm:text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 whitespace-nowrap tracking-tight">
              OmniPost AI
            </span>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
             {/* Hidden API Key Trigger (for power users who know) */}
             {!hasKey && (
               <button 
                 onClick={handleSelectKey}
                 className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
               >
                 (Set Key)
               </button>
             )}

             <button 
               onClick={() => setIsWaitlistOpen(true)}
               className="group relative px-3 py-1.5 xs:px-4 xs:py-2 sm:px-5 sm:py-2 md:px-6 md:py-2.5 rounded-xl bg-black overflow-hidden transition-all hover:scale-105 active:scale-95 min-w-[80px] xs:min-w-[90px] sm:min-w-[100px] min-h-[32px] xs:min-h-[36px]"
             >
               <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 opacity-20 group-hover:opacity-40 transition-opacity" />
               <div className="absolute inset-[1px] bg-black rounded-xl z-10" />
               <div className="relative z-20 flex items-center justify-center gap-1 xs:gap-1.5 sm:gap-2">
                 <span className="text-xs xs:text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 group-hover:from-emerald-300 group-hover:to-teal-300 truncate">
                   Sign In
                 </span>
                 <LogIn className="xs:w-3 xs:h-3 sm:w-4 sm:h-4 text-teal-500 group-hover:text-teal-300 transition-colors flex-shrink-0" />
               </div>
             </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-3 xs:px-4 sm:px-5 md:px-6 relative z-10 min-h-screen flex flex-col items-center">
         
         {/* Hero / Search Section */}
         <div className="w-full max-w-4xl mx-auto mb-8 sm:mb-10 md:mb-12 space-y-6 sm:space-y-8 text-center">
            {!results && !isGenerating && (
                <div className="space-y-3 sm:space-y-4 animate-fade-in">
                    <h1 className="text-2xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                        What do you want to <span className="text-emerald-400">create</span> today?
                    </h1>
                    <p className="text-gray-400 text-sm xs:text-base sm:text-lg md:text-xl">
                        Generate posts, images, and videos for all your social channels in seconds.
                    </p>
                </div>
            )}

            <div className="w-full text-left">
                <GenerationForm 
                    idea={idea}
                    setIdea={setIdea}
                    tone={tone}
                    setTone={setTone}
                    imageSize={imageSize}
                    setImageSize={setImageSize}
                    aspectRatio={aspectRatio}
                    setAspectRatio={setAspectRatio}
                    imageCount={imageCount}
                    setImageCount={setImageCount}
                    onGenerate={handleGenerate}
                    isGenerating={isGenerating}
                    sourceImage={sourceImage}
                    setSourceImage={setSourceImage}
                    includeVideo={includeVideo}
                    setIncludeVideo={setIncludeVideo}
                    selectedPlatforms={selectedPlatforms}
                    setSelectedPlatforms={setSelectedPlatforms}
                    hasKey={hasKey}
                />
            </div>
         </div>

         {/* Results Section */}
         {(results || isGenerating || error) && (
             <div className="w-full max-w-7xl mx-auto space-y-6 sm:space-y-8 animate-fade-in-up">
                
                {/* Error Banner */}
                {error && (
                    <div className="max-w-2xl mx-auto bg-red-500/10 border border-red-500/20 rounded-lg sm:rounded-xl p-3 sm:p-4 flex items-start sm:items-center gap-2 sm:gap-3 text-red-200 text-xs sm:text-sm">
                        <AlertCircle size={16} className="sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 sm:mt-0" />
                        <span className="flex-1">{error}</span>
                    </div>
                )}

                {warning && (
                    <div className="max-w-2xl mx-auto bg-amber-500/10 border border-amber-500/20 rounded-lg sm:rounded-xl p-3 sm:p-4 flex items-start sm:items-center gap-2 sm:gap-3 text-amber-200 text-xs sm:text-sm animate-fade-in">
                        <AlertCircle size={16} className="sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 sm:mt-0" />
                        <span className="flex-1">{warning}</span>
                    </div>
                )}

                {/* Results Grid - Removed scrollbars */}
                <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 overflow-hidden`}>
                    {selectedPlatforms[Platform.LINKEDIN] && (
                        <div className="overflow-hidden rounded-2xl">
                          <PlatformCard 
                              platform={Platform.LINKEDIN} 
                              post={results?.linkedin || null} 
                              isLoading={isGenerating && !results} 
                              isGenerating={isGenerating}
                              onDownload={handleDownloadAttempt}
                              onRemove={() => handleRemoveCard(Platform.LINKEDIN)}
                          />
                        </div>
                    )}
                    {selectedPlatforms[Platform.TWITTER] && (
                        <div className="overflow-hidden rounded-2xl">
                          <PlatformCard 
                              platform={Platform.TWITTER} 
                              post={results?.twitter || null} 
                              isLoading={isGenerating && !results} 
                              isGenerating={isGenerating}
                              onDownload={handleDownloadAttempt}
                              onRemove={() => handleRemoveCard(Platform.TWITTER)}
                          />
                        </div>
                    )}
                    {selectedPlatforms[Platform.INSTAGRAM] && (
                        <div className="overflow-hidden rounded-2xl">
                          <PlatformCard 
                              platform={Platform.INSTAGRAM} 
                              post={results?.instagram || null} 
                              isLoading={isGenerating && !results} 
                              isGenerating={isGenerating}
                              onDownload={handleDownloadAttempt}
                              onRemove={() => handleRemoveCard(Platform.INSTAGRAM)}
                          />
                        </div>
                    )}
                    {selectedPlatforms[Platform.FACEBOOK] && (
                        <div className="overflow-hidden rounded-2xl">
                          <PlatformCard 
                              platform={Platform.FACEBOOK} 
                              post={results?.facebook || null} 
                              isLoading={isGenerating && !results} 
                              isGenerating={isGenerating}
                              onDownload={handleDownloadAttempt}
                              onRemove={() => handleRemoveCard(Platform.FACEBOOK)}
                          />
                        </div>
                    )}
                    {selectedPlatforms[Platform.PINTEREST] && (
                        <div className="overflow-hidden rounded-2xl">
                          <PlatformCard 
                              platform={Platform.PINTEREST} 
                              post={results?.pinterest || null} 
                              isLoading={isGenerating && !results} 
                              isGenerating={isGenerating}
                              onDownload={handleDownloadAttempt}
                              onRemove={() => handleRemoveCard(Platform.PINTEREST)}
                          />
                        </div>
                    )}
                    
                    {(includeVideo || results?.video || isVideoGenerating) && (
                        <div className="overflow-hidden rounded-xl sm:rounded-xl">
                          <VideoCard 
                              videoPost={results?.video}
                              isLoading={isVideoGenerating}
                              onDownload={handleDownloadAttempt}
                          />
                        </div>
                    )}
                </div>
             </div>
         )}
      </main>
    </div>
  );
};

export default Dashboard;