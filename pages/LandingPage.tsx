import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Video, Image as ImageIcon, ArrowRight, PlayCircle, Instagram, Linkedin, Youtube, Zap, DollarSign, Users, Sparkles, Send, Facebook } from 'lucide-react';
import Logo from '../components/Logo';
import SocialBackground from '../components/SocialBackground';
import MagicInputDemo from '../components/MagicInputDemo';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden font-sans selection:bg-emerald-500 selection:text-white relative">
      
      {/* Social Background */}
      <SocialBackground />

      {/* Navigation - Optimized for all screen sizes */}
<nav className="fixed top-0 w-full z-50 bg-black/95 backdrop-blur-lg border-b border-white/10 px-3 xs:px-4 sm:px-5 md:px-6">
  <div className="max-w-7xl mx-auto h-14 xs:h-16 sm:h-18 md:h-20 flex items-center justify-between">
    
    {/* Logo & Brand */}
    <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-2.5 md:gap-3">
      <Logo className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-emerald-500" />
      <span className="text-sm xs:text-base sm:text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 whitespace-nowrap tracking-tight">
        OmniPost AI
      </span>
    </div>
    
    {/* CTA Button */}
    <button 
      onClick={() => navigate('/app')}
      className="px-3 py-1.5 xs:px-3.5 xs:py-2 sm:px-4 sm:py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-2.5 bg-white text-black text-xs xs:text-sm sm:text-base font-semibold rounded-full hover:bg-gray-200 transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap min-w-[100px] xs:min-w-[110px] sm:min-w-[120px] min-h-[32px] xs:min-h-[36px] sm:min-h-[40px]"
    >
      Get Started
    </button>
    
  </div>
</nav>
      {/* Hero Section - Fixed for big screen centering */}
<section className="relative pt-20 sm:pt-28 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 min-h-screen flex items-center z-10">
  <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center w-full">
    
    {/* Left Column: Text Content */}
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center lg:text-left"
    >
      <div className="space-y-4 sm:space-y-5 lg:space-y-6">
        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight sm:leading-tighter">
          Stop Hiring <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
            Marketing Teams.
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed max-w-lg mx-auto lg:mx-0">
          Save $50k+ per year. Instantly generate high-converting videos, images, and captions for X, LinkedIn, and Instagram without a designer.
        </p>
        
        {/* CTA Button */}
        <div className="pt-2 sm:pt-3 md:pt-4">
          <button 
            onClick={() => navigate('/app')}
            className="inline-flex items-center justify-center px-5 py-2.5 sm:px-6 sm:py-3 md:px-7 md:py-3.5 lg:px-8 lg:py-4 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full font-semibold text-sm sm:text-base md:text-lg hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 min-w-[160px] sm:min-w-[180px] min-h-[44px] sm:min-h-[48px]"
          >
            <span className="mr-2">Start Generating</span>
            <ArrowRight size={16} className="sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </motion.div>

    {/* Right Column: Visual Content */}
    <motion.div 
      style={{ y }}
      className="relative hidden lg:block h-[400px] lg:h-[450px] xl:h-[500px] w-full"
    >
      {/* Central Hub */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 lg:w-40 lg:h-40 xl:w-44 xl:h-44 bg-black/50 backdrop-blur-xl border border-white/20 rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.3)] z-20">
        <Logo className="w-18 h-18 lg:w-20 lg:h-20 xl:w-24 xl:h-24 text-white" />
      </div>

      {/* Orbiting Icons */}
      <FloatingIcon icon={<Linkedin size={28} className="lg:w-8 lg:h-8 xl:w-10 xl:h-10" />} color="bg-[#0077b5]" delay={0} x={-140} y={-100} />
      <FloatingIcon icon={<span className="text-xl lg:text-2xl xl:text-3xl font-bold">X</span>} color="bg-black border border-white/20" delay={1} x={140} y={-80} />
      <FloatingIcon icon={<Instagram size={28} className="lg:w-8 lg:h-8 xl:w-10 xl:h-10" />} color="bg-gradient-to-br from-purple-600 to-pink-500" delay={2} x={-120} y={120} />
      <FloatingIcon icon={<Youtube size={28} className="lg:w-8 lg:h-8 xl:w-10 xl:h-10" />} color="bg-red-600" delay={3} x={130} y={100} />
      
      {/* New Icons */}
      <FloatingIcon icon={<Facebook size={28} className="lg:w-8 lg:h-8 xl:w-10 xl:h-10" />} color="bg-[#1877F2]" delay={1.5} x={0} y={-150} />
      <FloatingIcon 
        icon={
          <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="lg:w-8 lg:h-8 xl:w-10 xl:h-10 text-white">
            <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
          </svg>
        } 
        color="bg-black border border-white/20" 
        delay={2.5} 
        x={0} 
        y={150} 
      />
      <FloatingIcon 
        icon={
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" className="lg:w-8 lg:h-8 xl:w-10 xl:h-10 text-white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        } 
        color="bg-[#25D366]" 
        delay={3.5} 
        x={-150} 
        y={0} 
      />
      
      {/* Connecting Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <line x1="50%" y1="50%" x2="25%" y2="30%" stroke="white" strokeWidth="2" strokeDasharray="5,5" />
        <line x1="50%" y1="50%" x2="75%" y2="34%" stroke="white" strokeWidth="2" strokeDasharray="5,5" />
        <line x1="50%" y1="50%" x2="28%" y2="74%" stroke="white" strokeWidth="2" strokeDasharray="5,5" />
        <line x1="50%" y1="50%" x2="72%" y2="70%" stroke="white" strokeWidth="2" strokeDasharray="5,5" />
      </svg>
    </motion.div>
  </div>
</section>

      {/* Section 2: The Problem & Magic Demo */}
<section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 bg-black/40 relative overflow-hidden z-10">
  <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-5 md:px-6">
    <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-14 xl:gap-16 items-center">
      
      {/* Left Column: Problem Statement */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center lg:text-left"
      >
        <h2 className="text-2xl xs:text-2.5xl sm:text-3xl md:text-3.5xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-5">
          Agencies are <br/>
          <span className="text-red-500">expensive & slow.</span>
        </h2>
        
        <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-400 mb-4 sm:mb-5 md:mb-6 lg:mb-7 leading-relaxed max-w-xl mx-auto lg:mx-0">
          Why pay a social media manager $5,000/month? OmniPost AI gives you a full creative studio for the price of a coffee.
        </p>
        
        {/* Benefits Cards */}
        <div className="space-y-2.5 sm:space-y-3 md:space-y-4 max-w-md mx-auto lg:mx-0">
          
          {/* Save Money Card */}
          <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/5 rounded-xl border border-white/10 hover:border-emerald-500/20 transition-colors">
            <div className="flex-shrink-0 bg-green-500/20 p-2 sm:p-3 rounded-lg text-green-400">
              <DollarSign size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </div>
            <div className="text-left flex-1 min-w-0">
              <h4 className="font-bold text-xs xs:text-sm sm:text-base truncate">Save $50k+ Per Year</h4>
              <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">
                Eliminate the need for designers, editors, and copywriters.
              </p>
            </div>
          </div>
          
          {/* Scale Card */}
          <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/5 rounded-xl border border-white/10 hover:border-blue-500/20 transition-colors">
            <div className="flex-shrink-0 bg-blue-500/20 p-2 sm:p-3 rounded-lg text-blue-400">
              <Users size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </div>
            <div className="text-left flex-1 min-w-0">
              <h4 className="font-bold text-xs xs:text-sm sm:text-base truncate">Scale Without Hiring</h4>
              <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">
                Manage 10+ brands or accounts solo. No team meetings required.
              </p>
            </div>
          </div>
          
        </div>
      </motion.div>
      
      {/* Right Column: Magic Input Demo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative mt-6 sm:mt-8 md:mt-10 lg:mt-0"
      >
        <MagicInputDemo />
      </motion.div>
      
    </div>
  </div>
</section>

{/* Section 3: Features (Bento Grid) */}
<section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 bg-black/40 relative z-10">
  <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-5 md:px-6">
    
    {/* Section Header */}
    <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
      <h2 className="text-2xl xs:text-2.5xl sm:text-3xl md:text-3.5xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-5">
        Everything you need to <span className="text-emerald-400">go viral.</span>
      </h2>
      <p className="text-gray-400 max-w-2xl mx-auto text-xs xs:text-sm sm:text-base md:text-lg px-2">
        No technical skills required. Just your ideas, amplified.
      </p>
    </div>

    {/* Bento Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6 auto-rows-[200px] sm:auto-rows-[240px] md:auto-rows-[260px] lg:auto-rows-[280px] xl:auto-rows-[300px]">
      
      {/* Feature 1: Prompt Tuning (Large) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="md:col-span-2 bg-black/30 border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-300"
      >
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div className="space-y-2 sm:space-y-3 md:space-y-4">
            <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-emerald-500/20 rounded-lg sm:rounded-xl flex items-center justify-center text-emerald-400">
              <Zap size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">Help Me Write</h3>
              <p className="text-gray-400 text-xs sm:text-sm md:text-base max-w-md">
                Don't know what to write? Just type a messy thought. We'll turn it into a professional, witty, or urgent caption instantly.
              </p>
            </div>
          </div>
          
          {/* Visual Representation */}
          <div className="bg-black/40 rounded-lg sm:rounded-xl p-2.5 sm:p-3 md:p-4 border border-white/5 backdrop-blur-sm mt-3 sm:mt-4 md:mt-5 transform group-hover:translate-y-[-3px] transition-transform duration-300">
            <div className="flex items-center gap-2 sm:gap-3 text-xs text-gray-500 mb-1.5 sm:mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"></span>
              <span className="line-through truncate">"buy my product pls"</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
              <span className="truncate">"Unlock your potential with our premium solution. 🚀"</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Feature 2: Image Gen (Tall) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="md:row-span-2 bg-black/30 border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 relative overflow-hidden group hover:border-purple-500/30 transition-all duration-300"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80 z-0" />
        <img 
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop" 
          alt="AI Art" 
          className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700"
        />
        
        <div className="relative z-10 h-full flex flex-col justify-end">
          <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-purple-500/20 rounded-lg sm:rounded-xl flex items-center justify-center text-purple-400 mb-2 sm:mb-3 md:mb-4 backdrop-blur-md">
            <ImageIcon size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">Instant Studio</h3>
            <p className="text-gray-300 text-xs sm:text-sm md:text-base">
              Need a photo? Don't search for stock. Generate unique, high-quality images that match your brand perfectly.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Feature 3: Video Gen (Square) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="bg-black/30 border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 relative overflow-hidden group hover:border-red-500/30 transition-all duration-300"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 bg-red-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <PlayCircle size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-red-500" />
        </div>
        <div className="absolute bottom-3 sm:bottom-4 md:bottom-5 lg:bottom-6 left-3 sm:left-4 md:left-5 lg:left-6">
          <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-0.5 sm:mb-1">Cinematic Video</h3>
          <p className="text-xs sm:text-sm text-gray-400">Text-to-Video in seconds.</p>
        </div>
      </motion.div>

     {/* Feature 4: Multi-Platform (Square) */}
<motion.div 
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.3 }}
  className="bg-black/30 border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 relative overflow-hidden group hover:border-blue-500/30 transition-all duration-300"
>
  <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
    <div className="bg-[#0077b5]/20 p-3 sm:p-4 rounded-lg flex justify-center items-center">
      <Linkedin className="text-[#0077b5] w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
    </div>
    <div className="bg-white/10 p-3 sm:p-4 rounded-lg flex justify-center items-center">
      <span className="font-bold text-sm sm:text-base md:text-lg">X</span>
    </div>
    <div className="bg-pink-500/20 p-3 sm:p-4 rounded-lg flex justify-center items-center">
      <Instagram className="text-pink-500 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
    </div>
    <div className="bg-blue-600/20 p-3 sm:p-4 rounded-lg flex justify-center items-center">
      <Facebook className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
    </div>
  </div>
  <div>
    <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">Platform Native</h3>
    <p className="text-xs sm:text-sm text-gray-400">We speak every social language.</p>
  </div>
</motion.div>
    </div>
  </div>
</section>

{/* Footer */}
<footer className="py-6 sm:py-8 md:py-10 lg:py-12 border-t border-white/10 bg-black relative z-10">
  <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-5 md:px-6">
    <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 md:gap-6 text-center">
      
      {/* Brand */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <Logo className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 grayscale opacity-50" />
        <span className="font-semibold text-xs sm:text-sm md:text-base">OmniPost AI</span>
      </div>
      
      {/* Links */}
      <div className="flex gap-3 sm:gap-4 md:gap-5 lg:gap-6 text-xs sm:text-sm">
        <a href="#" className="text-gray-500 hover:text-white transition-colors duration-200">
          Privacy
        </a>
        <a href="#" className="text-gray-500 hover:text-white transition-colors duration-200">
          Terms
        </a>
        <a href="#" className="text-gray-500 hover:text-white transition-colors duration-200">
          X
        </a>
      </div>
      
      {/* Copyright */}
      <p className="text-xs sm:text-sm text-gray-500 mt-1 md:mt-0">
        © 2025 OmniPost AI. All rights reserved.
      </p>
      
    </div>
  </div>
</footer>
    </div>
  );
};

const FloatingIcon = ({ icon, color, delay, x, y }: { icon: React.ReactNode, color: string, delay: number, x: number, y: number }) => (
    <motion.div 
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1, x: [x, x + 10, x], y: [y, y - 10, y] }}
      transition={{ 
        opacity: { duration: 0.5, delay },
        scale: { duration: 0.5, delay },
        x: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
      }}
      className={`absolute top-1/2 left-1/2 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl ${color} flex items-center justify-center text-white shadow-lg z-10`}
    >
      {icon}
    </motion.div>
  );

export default LandingPage;