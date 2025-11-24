import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Instagram, Youtube, Facebook, Heart, MessageCircle, ThumbsUp, Share2, Hash, AtSign } from 'lucide-react';

const SocialBackground: React.FC = () => {
  // Custom Pinterest Icon
  const PinterestIcon = ({ size = 20 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.644 0-5.784 2.749-5.784 5.585 0 1.102.424 2.291.953 2.934.107.133.122.248.089.385-.098.408-.322 1.303-.366 1.485-.057.243-.192.294-.442.176-1.645-.767-2.675-3.182-2.675-5.118 0-4.152 3.028-7.964 8.74-7.964 4.586 0 8.147 3.268 8.147 7.637 0 4.546-2.869 8.218-6.855 8.218-1.334 0-2.589-.693-3.021-1.517l-.824 3.136c-.298 1.133-1.105 2.554-1.645 3.422 1.241.366 2.535.562 3.881.562 6.616 0 11.979-5.368 11.979-11.987C23.996 5.367 18.633 0 12.017 0z"/>
    </svg>
  );

  // TikTok Icon
  const TikTokIcon = ({ size = 20 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );

  const icons = [
    { icon: <Linkedin size={24} />, color: "text-blue-400" },
    { icon: <span className="font-bold text-xl">X</span>, color: "text-white" },
    { icon: <Instagram size={24} />, color: "text-pink-500" },
    { icon: <Youtube size={24} />, color: "text-red-500" },
    { icon: <TikTokIcon size={24} />, color: "text-white" },
    { icon: <Facebook size={24} />, color: "text-blue-500" },
    { icon: <PinterestIcon size={24} />, color: "text-red-600" },
    { icon: <Heart size={24} />, color: "text-red-400" },
    { icon: <ThumbsUp size={24} />, color: "text-blue-300" },
    { icon: <MessageCircle size={24} />, color: "text-emerald-400" },
    { icon: <Share2 size={24} />, color: "text-purple-400" },
    { icon: <Hash size={24} />, color: "text-yellow-400" },
    { icon: <AtSign size={24} />, color: "text-orange-400" },
    { icon: <span className="text-2xl">🔥</span>, color: "text-white" },
    { icon: <span className="text-2xl">🚀</span>, color: "text-white" },
    { icon: <span className="text-2xl">✨</span>, color: "text-white" },
    { icon: <span className="text-2xl">💯</span>, color: "text-white" },
  ];

  const [bubbles, setBubbles] = useState<any[]>([]);

  useEffect(() => {
    const newBubbles = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      ...icons[i % icons.length],
      size: Math.random() * 30 + 30, // 30-60px
      x: Math.random() * 100, // 0-100%
      y: Math.random() * 100, // 0-100%
      duration: Math.random() * 20 + 20, // 20-40s (slower for background)
      delay: Math.random() * 10,
      opacity: Math.random() * 0.15 + 0.05, // 0.05-0.20
      scale: Math.random() * 0.5 + 0.5,
    }));
    setBubbles(newBubbles);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/50 to-black opacity-80 z-0" />
      
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className={`absolute rounded-full flex items-center justify-center ${bubble.color} backdrop-blur-sm border border-white/5 bg-white/5`}
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            opacity: bubble.opacity,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, 20, -20, 0],
            rotate: [0, 10, -10, 0],
            scale: [bubble.scale, bubble.scale * 1.1, bubble.scale],
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            ease: "linear",
            delay: bubble.delay,
          }}
        >
          {bubble.icon}
        </motion.div>
      ))}
    </div>
  );
};

export default SocialBackground;
