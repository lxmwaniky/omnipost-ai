import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Video, Image as ImageIcon } from 'lucide-react';

const MagicInputDemo = () => {
  const [text, setText] = useState("");
  const fullText = "Create a viral launch post for my new AI coffee brand...";
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setShowResults(true), 500);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
      {/* Input Area */}
      <div className="flex items-center gap-3 bg-white/5 rounded-xl p-4 mb-6 border border-white/10">
        <Sparkles className="text-emerald-400" size={20} />
        <div className="flex-1 font-mono text-sm text-gray-300 min-h-[20px]">
          {text}<span className="animate-pulse">|</span>
        </div>
        <button className={`p-2 rounded-lg transition-colors ${showResults ? 'bg-emerald-500 text-white' : 'bg-white/10 text-gray-500'}`}>
          <Send size={16} />
        </button>
      </div>

      {/* Results Grid */}
      <AnimatePresence>
        {showResults && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="grid grid-cols-2 gap-3"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-zinc-800 rounded-lg h-32 flex items-center justify-center border border-white/5 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 group-hover:opacity-100 transition-opacity" />
              <Video className="text-emerald-400 relative z-10" />
              <span className="absolute bottom-2 left-2 text-xs text-gray-400">TikTok.mp4</span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-zinc-800 rounded-lg h-32 flex items-center justify-center border border-white/5 relative overflow-hidden"
            >
               <ImageIcon className="text-pink-400" />
               <span className="absolute bottom-2 left-2 text-xs text-gray-400">Insta.jpg</span>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="col-span-2 bg-zinc-800 rounded-lg p-4 border border-white/5"
            >
               <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-gray-600" />
                  <span className="text-xs font-bold">OmniCoffee</span>
                  <span className="text-xs text-gray-500">@omnicoffee</span>
               </div>
               <p className="text-xs text-gray-300">
                  Introducing the future of caffeine. ☕️✨ AI-optimized beans for maximum flow state. #FutureCoffee #AI
               </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MagicInputDemo;
