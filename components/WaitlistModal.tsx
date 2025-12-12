import React, { useState, useRef, useEffect } from 'react';
import { X, Check, Loader2, ArrowRight, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState<'name' | 'email' | 'submitting' | 'success'>('name');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on step change
  useEffect(() => {
    if (isOpen && step !== 'submitting' && step !== 'success') {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, step]);

  if (!isOpen) return null;

  // Email validation regex
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNext = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setErrorMessage('');

    if (step === 'name') {
      if (!name.trim()) {
        setErrorMessage('Please enter your name');
        return;
      }
      setStep('email');
    } else if (step === 'email') {
      if (!email.trim()) {
        setErrorMessage('Please enter your email');
        return;
      }
      if (!isValidEmail(email)) {
        setErrorMessage('Please enter a valid email address');
        return;
      }
      await submitForm();
    }
  };

  const submitForm = async () => {
    setStep('submitting');
    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email, name }]);

      if (error) {
        // Handle duplicate email - treat as success since they're already on the list
        if (error.code === '23505' || error.message.includes('duplicate key')) {
          setSuccessMessage("You're already on the list!");
          setStep('success');
          if (onSuccess) onSuccess();
          setTimeout(() => {
            onClose();
            setTimeout(() => {
              setStep('name');
              setName('');
              setEmail('');
              setSuccessMessage('');
            }, 300);
          }, 2500);
          return;
        }
        throw error;
      }

      setSuccessMessage("Welcome to the waitlist!");
      setStep('success');
      
      // Trigger success callback
      if (onSuccess) onSuccess();

      // Close after delay
      setTimeout(() => {
        onClose();
        // Reset state after closing animation
        setTimeout(() => {
          setStep('name');
          setName('');
          setEmail('');
          setSuccessMessage('');
        }, 300);
      }, 3000); // Increased delay to ensure message is read
    } catch (err: any) {
      console.error(err);
      setStep('email'); // Go back to email step so they can retry
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleNext();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-sm sm:max-w-md bg-zinc-900 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl sm:shadow-2xl overflow-hidden mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-white transition-colors z-10 p-1.5 sm:p-2"
          aria-label="Close"
        >
          <X size={18} className="sm:w-5 sm:h-5" />
        </button>

        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-2 text-white">Join the Waitlist</h2>
          <p className="text-gray-400 text-xs sm:text-sm">
            Get early access to OmniPost AI.
          </p>
        </div>

        <div className="min-h-[100px] sm:min-h-[120px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {step === 'name' && (
              <motion.div
                key="step-name"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full"
              >
                <label className="block text-sm font-medium text-white mb-2 sm:mb-3">
                  What's your first name?
                </label>
                <form onSubmit={handleNext} className="relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your name..."
                    className="w-full bg-transparent border-b-2 border-white/20 py-2.5 sm:py-3 text-lg sm:text-xl text-white placeholder-gray-500 focus:border-indigo-400 focus:outline-none transition-colors pr-10"
                  />
                  <button 
                    type="submit"
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-indigo-400 hover:text-indigo-300 p-1.5 sm:p-2 min-w-[40px] min-h-[40px] flex items-center justify-center"
                    aria-label="Next"
                  >
                    <ArrowRight size={20} className="sm:w-6 sm:h-6" />
                  </button>
                </form>
              </motion.div>
            )}

            {step === 'email' && (
              <motion.div
                key="step-email"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full"
              >
                <label className="block text-sm font-medium text-white mb-2 sm:mb-3">
                  Great, {name}! What's your email?
                </label>
                <form onSubmit={handleNext} className="relative">
                  <input
                    ref={inputRef}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="name@example.com"
                    className="w-full bg-transparent border-b-2 border-white/20 py-2.5 sm:py-3 text-lg sm:text-xl text-white placeholder-gray-500 focus:border-indigo-400 focus:outline-none transition-colors pr-10"
                  />
                  <button 
                    type="submit"
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-indigo-400 hover:text-indigo-300 p-1.5 sm:p-2 min-w-[40px] min-h-[40px] flex items-center justify-center"
                    aria-label="Submit"
                  >
                    <ArrowRight size={20} className="sm:w-6 sm:h-6" />
                  </button>
                </form>
              </motion.div>
            )}

            {step === 'submitting' && (
              <motion.div
                key="step-loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-3 sm:py-4"
              >
                <Loader2 size={24} className="sm:w-8 sm:h-8 md:w-10 md:h-10 text-indigo-500 animate-spin mb-3 sm:mb-4" />
                <p className="text-gray-400 text-sm">Securing your spot...</p>
              </motion.div>
            )}

            {step === 'success' && (
              <motion.div
                key="step-success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-3 sm:py-4 text-green-400 relative"
              >
                {/* Confetti particles - reduced quantity on mobile */}
                {[...Array(window.innerWidth < 640 ? 8 : 12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
                    style={{
                      background: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b'][i % 4],
                      left: '50%',
                      top: '50%',
                    }}
                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0.5],
                      x: Math.cos((i / (window.innerWidth < 640 ? 8 : 12)) * Math.PI * 2) * (window.innerWidth < 640 ? 60 : 80),
                      y: Math.sin((i / (window.innerWidth < 640 ? 8 : 12)) * Math.PI * 2) * (window.innerWidth < 640 ? 60 : 80),
                    }}
                    transition={{
                      duration: 1,
                      ease: "easeOut",
                      delay: 0.1,
                    }}
                  />
                ))}
                
                <motion.div 
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-3 sm:mb-4 relative z-10"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 0.5, times: [0, 0.6, 1] }}
                >
                  <Check size={20} className="sm:w-8 sm:h-8 md:w-10 md:h-10" />
                </motion.div>
                <motion.p 
                  className="text-base sm:text-lg font-semibold text-center px-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {successMessage || "You're on the list!"}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {errorMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 sm:bottom-6 left-0 right-0 flex justify-center px-2"
          >
            <div className="flex items-center gap-1.5 sm:gap-2 text-red-400 text-xs sm:text-sm bg-red-500/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full max-w-[90%]">
              <AlertCircle size={12} className="sm:w-3.5 sm:h-3.5 flex-shrink-0" />
              <span className="truncate">{errorMessage}</span>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default WaitlistModal;