/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Admissions enquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: 'Admissions enquiry',
        message: ''
      });
      // reset success screen after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-[#08080a] border border-white/10 rounded-lg p-6 sm:p-8 shadow-xl backdrop-blur-md relative overflow-hidden">
      {/* Outer subtle glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      
      {isSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          className="py-12 flex flex-col items-center justify-center text-center space-y-4"
        >
          <div className="w-16 h-16 bg-cyan-500/5 border border-cyan-500/20 rounded-md flex items-center justify-center text-cyan-400">
            <CheckCircle2 className="w-8 h-8 animate-bounce" />
          </div>
          <div className="space-y-2">
            <h4 className="text-xl font-bold uppercase italic text-white">Message Transmitted!</h4>
            <p className="text-sm text-slate-400 max-w-sm font-sans">
              Thank you for contacting PHYSIS Institute. Dr. Mahanta or our admissions desk will reply to your email shortly.
            </p>
          </div>
          <button
            onClick={() => setIsSuccess(false)}
            className="text-xs font-mono uppercase tracking-wider text-cyan-400 hover:underline pt-2 cursor-pointer"
          >
            Send another enquiry
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5 align-left text-left">
              <label htmlFor="name" className="text-[10px] font-mono font-medium text-white/40 uppercase tracking-widest block">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="A. Borah"
                className="w-full bg-[#050505] border border-white/10 focus:border-cyan-500 rounded px-4 py-2.5 text-xs text-white placeholder-white/20 outline-none transition-all duration-300"
              />
            </div>

            <div className="space-y-1.5 align-left text-left">
              <label htmlFor="email" className="text-[10px] font-mono font-medium text-white/40 uppercase tracking-widest block">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full bg-[#050505] border border-white/10 focus:border-cyan-500 rounded px-4 py-2.5 text-xs text-white placeholder-white/20 outline-none transition-all duration-300"
              />
            </div>
          </div>

          <div className="space-y-1.5 align-left text-left">
            <label htmlFor="subject" className="text-[10px] font-mono font-medium text-white/40 uppercase tracking-widest block">
              Subject
            </label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full bg-[#050505] border border-white/10 focus:border-cyan-500 rounded px-4 py-2.5 text-xs text-white placeholder-white/20 outline-none transition-all duration-300 cursor-pointer"
            >
              <option value="Admissions enquiry" className="bg-[#08080a]">Admissions enquiry</option>
              <option value="HS Physics syllabus" className="bg-[#08080a]">HS Physics Syllabus / Batches</option>
              <option value="FYUGP Semester program" className="bg-[#08080a]">FYUGP Semester Program</option>
              <option value="Academic Doubt clearing" className="bg-[#08080a]">Academic Doubt Clearing</option>
              <option value="Collaboration request" className="bg-[#08080a]">Research Collaboration</option>
            </select>
          </div>

          <div className="space-y-1.5 align-left text-left">
            <label htmlFor="message" className="text-[10px] font-mono font-medium text-white/40 uppercase tracking-widest block">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your academic background and what you are looking for..."
              className="w-full bg-[#050505] border border-white/10 focus:border-cyan-500 rounded px-4 py-2.5 text-xs text-white placeholder-white/20 outline-none resize-none transition-all duration-300"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-white font-mono font-bold text-xs uppercase tracking-wider py-2.5 px-6 rounded transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Transmitting...
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                Send Message
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
