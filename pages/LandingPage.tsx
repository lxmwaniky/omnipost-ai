import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
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

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo className="w-10 h-10 text-emerald-500" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              OmniPost AI
            </span>
          </div>
          <button 
            onClick={() => navigate('/app')}
            className="px-6 py-2 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all transform hover:scale-105 active:scale-95"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 min-h-screen flex items-center z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
              Stop Hiring <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
                Marketing Teams.
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 mb-8 max-w-lg leading-relaxed">
              Save $50k+ per year. Instantly generate high-converting videos, images, and captions for X, LinkedIn, and Instagram without a designer.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => navigate('/app')}
                className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full font-bold text-lg hover:shadow-lg hover:shadow-emerald-500/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                Start Generating <ArrowRight size={20} />
              </button>
              <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-full font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                <PlayCircle size={20} /> Watch Demo
              </button>
            </div>
          </motion.div>

          {/* Social Media Visual */}
          <motion.div 
            style={{ y }}
            className="relative hidden lg:block h-[500px] w-full"
          >
            {/* Central Hub */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-black/50 backdrop-blur-xl border border-white/20 rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.3)] z-20">
               <Logo className="w-20 h-20 text-white" />
            </div>

            {/* Orbiting Icons */}
            <FloatingIcon icon={<Linkedin size={32} />} color="bg-[#0077b5]" delay={0} x={-150} y={-100} />
            <FloatingIcon icon={<span className="text-2xl font-bold">X</span>} color="bg-black border border-white/20" delay={1} x={150} y={-80} />
            <FloatingIcon icon={<Instagram size={32} />} color="bg-gradient-to-br from-purple-600 to-pink-500" delay={2} x={-120} y={120} />
            <FloatingIcon icon={<Youtube size={32} />} color="bg-red-600" delay={3} x={140} y={100} />
            
            {/* New Icons */}
            <FloatingIcon icon={<Facebook size={32} />} color="bg-[#1877F2]" delay={1.5} x={0} y={-160} />
            <FloatingIcon 
              icon={
                <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
              } 
              color="bg-black border border-white/20" 
              delay={2.5} 
              x={0} 
              y={160} 
            />
            <FloatingIcon 
              icon={
                <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" className="text-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              } 
              color="bg-[#25D366]" 
              delay={3.5} 
              x={-160} 
              y={0} 
            />
            
            {/* Connecting Lines (Simulated) */}
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
      <section className="py-32 bg-zinc-900/50 relative overflow-hidden z-10">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
               <motion.div
                 initial={{ opacity: 0, x: -50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8 }}
               >
                  <h2 className="text-3xl lg:text-5xl font-bold mb-6">Agencies are <br/><span className="text-red-500">expensive & slow.</span></h2>
                  <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                     Why pay a social media manager $5,000/month? OmniPost AI gives you a full creative studio for the price of a coffee.
                  </p>
                  
                  <div className="space-y-4">
                     <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                        <div className="bg-green-500/20 p-3 rounded-lg text-green-400"><DollarSign size={24} /></div>
                        <div>
                           <h4 className="font-bold">Save $50k+ Per Year</h4>
                           <p className="text-sm text-gray-400">Eliminate the need for designers, editors, and copywriters.</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                        <div className="bg-blue-500/20 p-3 rounded-lg text-blue-400"><Users size={24} /></div>
                        <div>
                           <h4 className="font-bold">Scale Without Hiring</h4>
                           <p className="text-sm text-gray-400">Manage 10+ brands or accounts solo. No team meetings required.</p>
                        </div>
                     </div>
                  </div>
               </motion.div>
               
               <motion.div
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8 }}
                 className="relative"
               >
                  <MagicInputDemo />
               </motion.div>
            </div>
         </div>
      </section>

      {/* Section 3: How it Works */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">The Ultimate Media Engine</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              From script to screen in three simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Video className="text-emerald-400" size={32} />}
              title="1. Describe It"
              description="Enter a simple text prompt or upload a reference image. Our AI understands context and nuance."
              delay={0}
            />
            <FeatureCard 
              icon={<ImageIcon className="text-teal-400" size={32} />}
              title="2. Generate It"
              description="Watch as high-fidelity images and videos are generated in parallel for all platforms."
              delay={0.2}
            />
            <FeatureCard 
              icon={<Zap className="text-cyan-400" size={32} />}
              title="3. Post It"
              description="Download platform-ready assets or schedule them directly. Viral ready, instantly."
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 text-center text-gray-500 bg-black relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex items-center gap-2">
              <Logo className="w-6 h-6 grayscale opacity-50" />
              <span className="font-semibold">OmniPost AI</span>
           </div>
           <div className="flex gap-8 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">X</a>
           </div>
           <p className="text-sm">© 2025 OmniPost AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors group backdrop-blur-sm hover:border-emerald-500/30"
  >
    <div className="mb-6 bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{description}</p>
  </motion.div>
);

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
      className={`absolute top-1/2 left-1/2 w-16 h-16 rounded-2xl ${color} flex items-center justify-center text-white shadow-lg z-10`}
    >
      {icon}
    </motion.div>
  );



export default LandingPage;
