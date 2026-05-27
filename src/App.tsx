/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import burhanphoto from "./images/burhanphoto.jpeg";
import {
  Atom,
  BookOpen,
  Play,
  ArrowRight,
  Search,
  Award,
  Book,
  Brain,
  MessageSquare,
  Sparkles,
  ChevronDown,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  MessageCircle,
  Star,
  FileText,
  Lightbulb,
  GraduationCap,
  Calendar,
  Lock,
  ChevronLeft,
  ChevronRight,
  Eye,
  Video
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { notesData, videosData, interactivePillars, academicAchievements, campusSpots, testimonialsData } from './data';
import InteractiveMap from './components/InteractiveMap';
import ContactForm from './components/ContactForm';

export default function App() {
  // Navigation active state
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [academicsDropdown, setAcademicsDropdown] = useState(false);
  const [learningDropdown, setLearningDropdown] = useState(false);

  // Notes state
  const [notesSearch, setNotesSearch] = useState('');
  const [selectedNotesCategory, setSelectedNotesCategory] = useState<'ALL' | 'HS' | 'FYUGP' | 'PYQ' | 'THEORY' | 'PRACTICE'>('ALL');
  const [noteAlert, setNoteAlert] = useState<string | null>(null);

  // Video state
  const [selectedVideoCategory, setSelectedVideoCategory] = useState('ALL');
  const [activeVideoModal, setActiveVideoModal] = useState<{ title: string; category: string; duration: string } | null>(null);

  // Achievements Carousel state
  const [currentAchivementIndex, setCurrentAchievementIndex] = useState(0);

  // Campus gallery active index
  const [activeCampusId, setActiveCampusId] = useState('cs1');

  // Testimonials active index
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Auth Modal state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);

  // Automatically scroll testimonials carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Set active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      const sections = ['hero', 'about', 'notes', 'lectures', 'features', 'gallery', 'contact'];
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter study notes based on search & category tab
  const filteredNotes = notesData.filter((note) => {
    const matchesSearch = note.title.toLowerCase().includes(notesSearch.toLowerCase()) ||
                          note.description.toLowerCase().includes(notesSearch.toLowerCase()) ||
                          note.topics.some(t => t.toLowerCase().includes(notesSearch.toLowerCase()));
    const matchesCategory = selectedNotesCategory === 'ALL' || note.category === selectedNotesCategory;
    return matchesSearch && matchesCategory;
  });

  // Filter video lectures list
  const filteredVideos = videosData.filter((vid) => {
    return selectedVideoCategory === 'ALL' || vid.category === selectedVideoCategory;
  });

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setTimeout(() => {
      setAuthLoading(false);
      setAuthSuccess(true);
      setTimeout(() => {
        setIsAuthOpen(false);
        setAuthSuccess(false);
        setAuthEmail('');
        setAuthPassword('');
      }, 1500);
    }, 1200);
  };

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#e0e0e0] font-sans selection:bg-cyan-500/30 selection:text-white">
      {/* Dynamic Ambient Background effects - Artistic Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* HEADER / NAVIGATION BAR */}
      <nav id="navbar" className="sticky top-0 z-50 bg-[#050505]/90 backdrop-blur-md border-b border-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => handleScrollToSection('hero')}>
              <div className="w-8 h-8 bg-cyan-500 rounded-sm rotate-45 flex items-center justify-center transition-transform duration-500 group-hover:rotate-135">
                <div className="w-4 h-4 bg-[#050505] rotate-[-45deg] flex items-center justify-center text-cyan-400 group-hover:rotate-0 transition-transform duration-500">
                  <Atom className="w-3.5 h-3.5 text-cyan-500" />
                </div>
              </div>
              <div className="text-left">
                <div className="text-xl font-bold tracking-tighter text-white uppercase flex items-center gap-1.5 leading-none">
                  PHYSIS
                </div>
                <div className="text-[8px] font-mono tracking-widest text-[#22d3ee] -mt-0.5 uppercase">
                  PATHWAY TO SUCCESS
                </div>
              </div>
            </div>

            {/* Desktop Navigation Items */}
            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => handleScrollToSection('about')}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer ${
                  activeSection === 'about' ? 'text-cyan-400' : 'text-slate-300 hover:text-white'
                }`}
              >
                About
              </button>

              {/* Academics Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setAcademicsDropdown(true)}
                onMouseLeave={() => setAcademicsDropdown(false)}
              >
                <button className="flex items-center gap-1 text-sm font-medium tracking-wide text-slate-300 hover:text-white transition-colors duration-200 cursor-pointer">
                  Academics <ChevronDown className="w-4 h-4 text-slate-500" />
                </button>
                <AnimatePresence>
                  {academicsDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 mt-2 w-52 rounded bg-[#08080a] border border-white/10 p-2 shadow-2xl backdrop-blur-md"
                    >
                      <button
                        onClick={() => { handleScrollToSection('notes'); setSelectedNotesCategory('HS'); }}
                        className="w-full text-left px-4 py-2.5 text-xs text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition"
                      >
                        HS Physics Study Notes
                      </button>
                      <button
                        onClick={() => { handleScrollToSection('notes'); setSelectedNotesCategory('FYUGP'); }}
                        className="w-full text-left px-4 py-2.5 text-xs text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition"
                      >
                        FYUGP Semester program
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Learning Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setLearningDropdown(true)}
                onMouseLeave={() => setLearningDropdown(false)}
              >
                <button className="flex items-center gap-1 text-sm font-medium tracking-wide text-slate-300 hover:text-white transition-colors duration-200 cursor-pointer">
                  Learning <ChevronDown className="w-4 h-4 text-slate-500" />
                </button>
                <AnimatePresence>
                  {learningDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 mt-2 w-56 rounded bg-[#08080a] border border-white/10 p-2 shadow-2xl backdrop-blur-md"
                    >
                      <button
                        onClick={() => { handleScrollToSection('notes'); }}
                        className="w-full text-left px-4 py-2.5 text-xs text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all"
                      >
                        Notes & Study Material
                      </button>
                      <button
                        onClick={() => { handleScrollToSection('lectures'); }}
                        className="w-full text-left px-4 py-2.5 text-xs text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all"
                      >
                        Video Lectures
                      </button>
                      <button
                        onClick={() => { handleScrollToSection('features'); }}
                        className="w-full text-left px-4 py-2.5 text-xs text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all"
                      >
                        Pedagogical Ecosystem
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={() => handleScrollToSection('gallery')}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer ${
                  activeSection === 'gallery' ? 'text-cyan-400' : 'text-slate-300 hover:text-white'
                }`}
              >
                Inside PHYSIS
              </button>

              <button
                onClick={() => handleScrollToSection('contact')}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer ${
                  activeSection === 'contact' ? 'text-cyan-400' : 'text-slate-300 hover:text-white'
                }`}
              >
                Contact
              </button>
            </div>

            {/* Sign In CTA Button */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => { setAuthMode('signin'); setIsAuthOpen(true); }}
                className="glow-btn inline-flex items-center gap-1.5 px-5 py-2 rounded bg-cyan-500 text-[#050505] hover:bg-cyan-400 font-semibold font-mono text-xs tracking-wider uppercase transition-all duration-300 shadow-md shadow-cyan-500/10 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                Sign In
              </button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded border border-white/10 bg-[#08080a] text-[#e0e0e0] hover:text-white outline-none"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-b border-white/10 bg-[#08080a] overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-3.5">
                <button
                  onClick={() => handleScrollToSection('about')}
                  className="block w-full text-left px-4 py-2 hover:bg-white/5 text-sm font-medium text-slate-300 rounded hover:text-white"
                >
                  About the Institute
                </button>
                <button
                  onClick={() => handleScrollToSection('notes')}
                  className="block w-full text-left px-4 py-2 hover:bg-white/5 text-sm font-medium text-slate-300 rounded hover:text-white"
                >
                  Notes & Resources
                </button>
                <button
                  onClick={() => handleScrollToSection('lectures')}
                  className="block w-full text-left px-4 py-2 hover:bg-white/5 text-sm font-medium text-slate-300 rounded hover:text-white"
                >
                  Video Lectures
                </button>
                <button
                  onClick={() => handleScrollToSection('features')}
                  className="block w-full text-left px-4 py-2 hover:bg-white/5 text-sm font-medium text-slate-300 rounded hover:text-white"
                >
                  Pedagogical Ecosystem
                </button>
                <button
                  onClick={() => handleScrollToSection('gallery')}
                  className="block w-full text-left px-4 py-2 hover:bg-white/5 text-sm font-medium text-slate-300 rounded hover:text-white"
                >
                  Inside PHYSIS
                </button>
                <button
                  onClick={() => handleScrollToSection('contact')}
                  className="block w-full text-left px-4 py-2 hover:bg-white/5 text-sm font-medium text-slate-300 rounded hover:text-white"
                >
                  Contact Us
                </button>
                <div className="pt-2">
                  <button
                    onClick={() => { setIsMobileMenuOpen(false); setAuthMode('signin'); setIsAuthOpen(true); }}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded bg-cyan-500 text-[#050505] hover:bg-cyan-400 font-semibold font-mono text-xs tracking-wider uppercase transition-all duration-300"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    Sign In
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO SECTION */}
      <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-24 scroll-mt-20">
        {/* Large Decorative Watermark in "Artistic Flair" spirit */}
        <div className="absolute -top-12 -left-12 text-[180px] sm:text-[240px] font-black text-white/[0.015] leading-none select-none tracking-tighter uppercase italic pointer-events-none font-sans">
          PHYSIS
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            
            {/* Pulsing Header Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-cyan-500/10 border border-cyan-500/20 text-[11px] font-mono text-cyan-400 tracking-[0.2em] uppercase italic"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              Premier Physics Institute — Est. 2020
            </motion.div>

            {/* Giant Title */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-8xl sm:text-9xl md:text-[11rem] font-black italic tracking-tighter text-white leading-[0.85] uppercase drop-shadow-[0_0_45px_rgba(6,182,212,0.1)]"
              >
                PHYSIS
              </motion.h1>
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-sm sm:text-base font-mono text-cyan-400 tracking-[0.4em] uppercase block italic"
              >
                // From Concept To Confidence
              </motion.h2>
            </div>

            {/* Course Headline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto font-sans"
            >
              A research-oriented coaching institute pioneering concept-based physics education for Higher Secondary and FYUGP scholars across India.
            </motion.p>

            {/* Buttons Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-4 pt-4"
            >
              <button
                onClick={() => handleScrollToSection('notes')}
                className="glow-btn inline-flex items-center gap-2 px-6 py-3 rounded bg-cyan-500 text-[#050505] hover:bg-cyan-400 font-semibold font-mono text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                Explore Notes
              </button>

              <button
                onClick={() => handleScrollToSection('lectures')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/30 text-white font-semibold font-mono text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer"
              >
                <Play className="w-4 h-4 text-cyan-500" />
                Watch Lectures
              </button>

              <button
                onClick={() => handleScrollToSection('contact')}
                className="inline-flex items-center gap-2 px-5 py-3 text-slate-400 hover:text-white font-mono font-bold text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer"
              >
                Contact Us
              </button>
            </motion.div>

            {/* Stats Bottom Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-4 sm:gap-6 pt-16 max-w-3xl mx-auto border-t border-white/10"
            >
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl md:text-5xl font-black italic text-white tracking-tight">
                  98%
                </div>
                <div className="text-[10px] sm:text-xs font-mono font-medium tracking-widest text-[#22d3ee] uppercase">
                  Pass Rate
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl md:text-5xl font-black italic text-white tracking-tight">
                  2.4K+
                </div>
                <div className="text-[10px] sm:text-xs font-mono font-medium tracking-widest text-[#22d3ee] uppercase">
                  Students Mentored
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl md:text-5xl font-black italic text-white tracking-tight">
                  150+
                </div>
                <div className="text-[10px] sm:text-xs font-mono font-medium tracking-widest text-[#22d3ee] uppercase">
                  Video Lectures
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Ambient floating lights */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-600/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-600/5 rounded-full blur-[100px] pointer-events-none" />
      </section>

      {/* ABOUT THE INSTITUTE */}
      <section id="about" className="py-24 relative z-10 bg-[#050505] scroll-mt-20 border-t border-white/10">
        {/* Subtle Watermark details */}
        <div className="absolute top-1/2 right-10 text-[140px] font-black text-white/[0.01] leading-none select-none tracking-tighter uppercase italic pointer-events-none">
          DERIVATIVE
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="align-left text-left mb-16 space-y-3">
            <span className="text-cyan-500 font-mono text-xs tracking-[0.3em] uppercase block italic">// About the Institute</span>
            <h2 className="text-4xl sm:text-5xl font-black italic tracking-tighter text-white uppercase leading-none">
              Engineering minds for <br />the frontiers of physics
            </h2>
            <p className="text-slate-400 max-w-3xl text-sm sm:text-base leading-relaxed">
              PHYSIS is built on a singular conviction — that conceptual clarity, rigorous problem solving, and disciplined practice produce scholars capable of leading the next generation of scientific inquiry.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Dr. Burhan Spotlight Card */}
            <div className="lg:col-span-5 bg-[#08080a] border border-white/10 rounded-lg p-6 glow-card transition-all duration-300 relative overflow-hidden h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-full aspect-square rounded bg-[#050505] overflow-hidden border border-white/10 relative group">
                  <img
                    src={burhanphoto}
                    alt="Dr. Burhan Ahmed"
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4">
                    <span className="px-2.5 py-1 rounded-sm bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-mono font-semibold tracking-wider text-cyan-400 uppercase">
                      Founder & Faculty
                    </span>
                  </div>
                </div>

                <div className="space-y-1 text-left align-left">
                  <h3 className="text-xl font-bold uppercase italic tracking-tight text-white">Dr. Burhan Ahmed</h3>
                  <p className="text-xs font-mono text-cyan-400 tracking-[0.05em] uppercase">// PhD, Condensed Matter Physics</p>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed text-left align-left">
                  "At PHYSIS, we believe in restoring the aesthetic architecture of mathematical physics. No memorisations. Every single fundamental theorem is patient, visual, and derived strictly from absolute first-principles."
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-mono text-white/40">PREMIER FACULTY PROFILES</span>
                <button
                  onClick={() => handleScrollToSection('contact')}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 hover:text-cyan-300 transition"
                >
                  Schedule Consultation <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Core Values / Approach Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 h-full">
              
              <div className="group bg-white/[0.02] border border-white/10 hover:border-cyan-500/50 p-6 rounded-lg space-y-3 hover:translate-y-[-2px] transition-all duration-300 align-left text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 text-[10px] font-mono text-white/20">01</div>
                <div className="w-9 h-9 rounded-sm bg-cyan-400/5 border border-cyan-400/20 flex items-center justify-center text-cyan-400">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-white uppercase tracking-wider italic">Our Mission</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  To cultivate highly-disciplined, intensely-curious, and analytically rigorous students thoroughly prepared for Board Exam, FYUGP and competitive national examinations.
                </p>
                <div className="mt-4 h-[1.5px] w-0 group-hover:w-full bg-cyan-500 transition-all duration-500"></div>
              </div>

              <div className="group bg-white/[0.02] border border-white/10 hover:border-cyan-500/50 p-6 rounded-lg space-y-3 hover:translate-y-[-2px] transition-all duration-300 align-left text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 text-[10px] font-mono text-white/20">02</div>
                <div className="w-9 h-9 rounded-sm bg-cyan-400/5 border border-cyan-400/20 flex items-center justify-center text-cyan-400">
                  <Book className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-white uppercase tracking-wider italic">Our Vision</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  To serve as the hallmark standard for concept-based physics coaching — where experimental pedagogy merges seamlessly with advanced mathematical physics.
                </p>
                <div className="mt-4 h-[1.5px] w-0 group-hover:w-full bg-cyan-500 transition-all duration-500"></div>
              </div>

              <div className="group bg-white/[0.02] border border-white/10 hover:border-cyan-500/50 p-6 rounded-lg space-y-3 hover:translate-y-[-2px] transition-all duration-300 align-left text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 text-[10px] font-mono text-white/20">03</div>
                <div className="w-9 h-9 rounded-sm bg-cyan-400/5 border border-cyan-400/20 flex items-center justify-center text-cyan-400">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-white uppercase tracking-wider italic">Academic Excellence</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Curriculum aligned perfectly with standard syllabus boards, fortified by exhaustive derivation worksheets, mock testing, and customized analytics.
                </p>
                <div className="mt-4 h-[1.5px] w-0 group-hover:w-full bg-cyan-500 transition-all duration-500"></div>
              </div>

              <div className="group bg-white/[0.02] border border-white/10 hover:border-cyan-500/50 p-6 rounded-lg space-y-3 hover:translate-y-[-2px] transition-all duration-300 align-left text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 text-[10px] font-mono text-white/20">04</div>
                <div className="w-9 h-9 rounded-sm bg-cyan-400/5 border border-cyan-400/20 flex items-center justify-center text-cyan-400">
                  <Brain className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-white uppercase tracking-wider italic">Concept-First Approach</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  We resist blind formula memorization. Every mathematical law is modeled, simulated, derived, and tested from its root definitions.
                </p>
                <div className="mt-4 h-[1.5px] w-0 group-hover:w-full bg-cyan-500 transition-all duration-500"></div>
              </div>

              {/* Mini Stats layout */}
              <div className="sm:col-span-2 pt-4">
                <div className="bg-[#08080a] border border-white/10 p-5 rounded-lg flex flex-wrap justify-around gap-6 text-center animate-[fadeIn_0.5s_ease-out]">
                  <div className="space-y-0.5">
                    <span className="text-xl sm:text-2xl font-black italic text-white tracking-tight">2,400+</span>
                    <p className="text-[10px] font-mono font-medium tracking-wide text-cyan-400 uppercase">Students Taught</p>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-xl sm:text-2xl font-black italic text-white tracking-tight">150+</span>
                    <p className="text-[10px] font-mono font-medium tracking-wide text-cyan-400 uppercase">Lectures Vault</p>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-xl sm:text-2xl font-black italic text-white tracking-tight">98%</span>
                    <p className="text-[10px] font-mono font-medium tracking-wide text-cyan-400 uppercase">Board Success</p>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-xl sm:text-2xl font-black italic text-white tracking-tight">18+</span>
                    <p className="text-[10px] font-mono font-medium tracking-wide text-cyan-400 uppercase">Years Teaching</p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* NOTES & STUDY MATERIALS SECTION */}
      <section id="notes" className="py-24 relative z-10 bg-[#050505] scroll-mt-20 border-t border-white/10">
        {/* Subtle Watermark detail */}
        <div className="absolute top-1/4 left-10 text-[140px] font-black text-white/[0.01] leading-none select-none tracking-tighter uppercase italic pointer-events-none">
          MECHANICS
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header with Search and Tabs */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="text-left space-y-3 max-w-2xl">
              <span className="text-cyan-500 font-mono text-xs tracking-[0.3em] uppercase block mb-2 italic">// Academic Resources</span>
              <h2 className="text-4xl sm:text-5xl font-black italic tracking-tighter text-white uppercase leading-none">
                Notes & Study Materials
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                A continuously updated library of derivations, problem sets, past papers and semester-aligned reading — viewable inline via Google Drive.
              </p>
            </div>

            {/* Live Search bar */}
            <div className="w-full lg:w-96 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-white/30" />
              <input
                type="text"
                value={notesSearch}
                onChange={(e) => setNotesSearch(e.target.value)}
                placeholder="Search title, topic, tag..."
                className="w-full bg-[#08080a] border border-white/10 focus:border-cyan-500 rounded pl-11 pr-4 py-2.5 text-xs sm:text-sm text-[#e0e0e0] placeholder-white/30 outline-none transition-all duration-300"
              />
            </div>
          </div>

          {/* Categories Tab selectors */}
          <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-white/10 mb-8 overflow-x-auto">
            {(['ALL', 'HS', 'FYUGP', 'PYQ', 'THEORY', 'PRACTICE'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedNotesCategory(cat)}
                className={`px-4.5 py-2 rounded text-xs font-mono font-semibold tracking-wider uppercase transition cursor-pointer ${
                  selectedNotesCategory === cat
                    ? 'bg-white/5 border border-cyan-500 text-cyan-400 rounded-sm'
                    : 'text-white/60 hover:text-white border border-transparent hover:bg-white/5 rounded-sm'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Notes Grid */}
          <AnimatePresence mode="popLayout">
            {filteredNotes.length > 0 ? (
              <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNotes.map((note) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    key={note.id}
                    className="bg-white/[0.03] border border-white/10 rounded-lg p-6 flex flex-col justify-between hover:border-cyan-500/50 glow-card group transition-all duration-300 relative text-left overflow-hidden"
                  >
                    <div className="space-y-4">
                      {/* Top bar */}
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-sm bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                          {note.badge}
                        </span>
                        <span className="text-[10px] font-mono text-white/40 font-semibold tracking-wider uppercase">
                          {note.category}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-base font-bold uppercase italic tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                          {note.title}
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed min-h-[44px]">
                          {note.description}
                        </p>
                      </div>

                      {/* Topics */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {note.topics.map((t) => (
                          <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#050505] text-[#e0e0e0]/60 border border-white/5">
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-white/50 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                        Live in Cloud
                      </span>
                      <button
                        onClick={() => setNoteAlert(note.title)}
                        className="px-3.5 py-1.5 rounded border border-white/10 hover:border-cyan-500/50 text-[10px] font-mono font-semibold text-cyan-400 hover:bg-cyan-500/5 transition duration-300 cursor-pointer"
                      >
                        Coming Soon
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-16 text-center text-slate-500"
              >
                No notes or study papers matching your current search parameters.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* VIDEO LECTURES */}
      <section id="lectures" className="py-24 relative z-10 bg-[#050505] border-t border-white/10 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="text-left space-y-3 max-w-2xl">
              <span className="text-cyan-500 font-mono text-xs tracking-[0.3em] uppercase block mb-1 italic">// Video Lectures</span>
              <h2 className="text-4xl sm:text-5xl font-black italic tracking-tighter text-white uppercase leading-none">
                Watch & Learn
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Curated playlists, master classes, and weekly conceptual deep-dives — published on our YouTube channel.
              </p>
            </div>

            {/* Video Categories Filters */}
            <div className="flex flex-wrap items-center gap-1.5 bg-[#08080a] p-1 border border-white/10 rounded overflow-x-auto self-start md:self-end">
              {['ALL', 'Mechanics', 'Electrodynamics', 'Optics', 'Modern Physics', 'Quantum'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedVideoCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-sm text-[10px] font-mono font-semibold tracking-wider uppercase transition cursor-pointer ${
                    selectedVideoCategory === cat
                      ? 'bg-white/5 text-cyan-400 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-white border border-transparent'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Videos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((vid) => (
              <div
                key={vid.id}
                className="bg-[#08080a] border border-white/10 hover:border-cyan-500/50 rounded-lg overflow-hidden group transition-all duration-300 font-sans cursor-pointer"
                onClick={() => setActiveVideoModal({ title: vid.title, category: vid.category, duration: vid.duration })}
              >
                {/* Simulated YouTube thumbnail */}
                <div className="aspect-video w-full bg-[#050505] relative flex items-center justify-center border-b border-white/10 overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#050505] via-transparent to-cyan-500/10 opacity-85" />
                  
                  {/* Styled glowing thumbnail illustration */}
                  <div className="absolute inset-x-4 inset-y-6 rounded opacity-40 border border-cyan-500/20 bg-gradient-to-b from-cyan-950/25 to-slate-950 flex flex-col justify-between p-3 select-none">
                    <Atom className="w-7 h-7 text-cyan-400/85 animate-spin-slow" />
                    <span className="text-[9px] font-mono text-cyan-400/80 tracking-widest uppercase">
                      {vid.category} Core Series
                    </span>
                  </div>

                  {/* Play circle */}
                  <div className="relative w-12 h-12 rounded-full bg-cyan-400/10 hover:bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition duration-300">
                    <Play className="w-5 h-5 fill-cyan-400 text-cyan-400 ml-0.5" />
                  </div>

                  {/* Badges overlay */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1">
                    <span className="px-1.5 py-0.5 bg-black/90 text-[8px] font-mono text-slate-400 rounded-sm">
                      HD QUALITY
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3">
                    <span className="px-1.5 py-0.5 bg-black/90 text-[8px] font-mono text-slate-300 rounded-sm font-semibold tracking-wider">
                      {vid.duration}
                    </span>
                  </div>
                </div>

                {/* Video Info info */}
                <div className="p-5 space-y-3 text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">
                      {vid.category}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold uppercase italic text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
                    {vid.title}
                  </h4>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/40 font-mono">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      {vid.views}
                    </span>
                    <span className="hover:text-cyan-400 transition hover:underline cursor-pointer">
                      Watch Lecture
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-10">
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded border border-white/10 hover:border-cyan-500/55 bg-[#08080a] text-cyan-400 hover:text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider transition"
            >
              Watch Full YouTube Playlist <ExternalLink className="w-4 h-4 text-cyan-400" />
            </a>
          </div>

        </div>
      </section>

      {/* THE SIX PILLARS - PEDAGOGICAL ECOSYSTEM */}
      <section id="features" className="py-24 relative z-10 bg-[#050505] border-t border-white/10 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-left space-y-3 mb-16 max-w-3xl">
            <span className="text-cyan-500 font-mono text-xs tracking-[0.3em] uppercase block mb-1 italic">// What We Offer</span>
            <h2 className="text-4xl sm:text-5xl font-black italic tracking-tighter text-white uppercase leading-none">
              A Complete Pedagogical Ecosystem
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Six pillars that define how we teach, mentor, and prepare every scholar at PHYSIS.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {interactivePillars.map((p, index) => {
              const icons = [FileText, Atom, MessageSquare, Lightbulb, Award, Brain];
              const IconComp = icons[index] || FileText;

              return (
                <div
                  key={p.id}
                  className="bg-white/[0.02] border border-white/10 rounded-lg p-6 flex flex-col justify-between hover:border-cyan-500/50 glow-card transition duration-300 text-left relative overflow-hidden group"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="w-9 h-9 rounded-sm bg-cyan-400/5 border border-cyan-400/20 flex items-center justify-center text-cyan-400">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono text-white/30 font-bold">{p.index}</span>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-base font-bold uppercase italic tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                        {p.title}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {p.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 mt-6 text-right">
                    <span className="text-[9px] font-mono text-cyan-400/60 tracking-widest uppercase">
                      SYSTEM INTEGRATION ACTIVE
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SCHOLARSHIP ROOTED IN RESEARCH */}
      <section className="py-24 relative z-10 bg-[#050505] scroll-mt-20 border-t border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-4 text-left space-y-6">
              <div className="align-left text-left space-y-3">
                <span className="text-cyan-500 font-mono text-xs tracking-[0.3em] uppercase block mb-1 italic">// Academic Profile</span>
                <h2 className="text-4xl sm:text-5xl font-black italic tracking-tighter text-white uppercase leading-none">
                  Scholarship Rooted in Research
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                  PHYSIS is led by faculty whose academic depth informs every lecture, every derivation, and every interaction.
                </p>
              </div>

              {/* Slide indicators / Switch arrows */}
              <div className="flex items-center gap-3.5 pt-4">
                <button
                  onClick={() => setCurrentAchievementIndex((prev) => (prev > 0 ? prev - 1 : academicAchievements.length - 1))}
                  className="w-10 h-10 border border-white/10 rounded bg-[#08080a] flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-500 transition cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="text-xs font-mono text-slate-400">
                  <span className="text-cyan-400 font-bold">{(currentAchivementIndex + 1).toString().padStart(2, '0')}</span> / {academicAchievements.length.toString().padStart(2, '0')}
                </div>
                <button
                  onClick={() => setCurrentAchievementIndex((prev) => (prev + 1) % academicAchievements.length)}
                  className="w-10 h-10 border border-white/10 rounded bg-[#08080a] flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-500 transition cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Achievement dynamic view space */}
            <div className="lg:col-span-8 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentAchivementIndex}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#08080a] border border-white/10 rounded-lg p-8 shadow-xl backdrop-blur-md relative overflow-hidden text-left"
                >
                  {/* Subtle decorative layout items */}
                  <div className="absolute right-8 top-8 opacity-5">
                    <GraduationCap className="w-24 h-24 text-cyan-400" />
                  </div>

                  <div className="space-y-6">
                    <div>
                      <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-mono font-bold tracking-widest text-cyan-400 rounded-sm uppercase">
                        {academicAchievements[currentAchivementIndex].badge}
                      </span>
                    </div>

                    <div className="space-y-3 max-w-lg">
                      <h3 className="text-xl sm:text-2xl font-bold uppercase italic tracking-tight text-white">
                        {academicAchievements[currentAchivementIndex].title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        {academicAchievements[currentAchivementIndex].description}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/30">
                      <span>PHYSIS RESEARCH COUNCIL DIRECTIVES</span>
                      <span className="font-bold text-cyan-400">{academicAchievements[currentAchivementIndex].index}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>

      {/* CO-CURRICULAR INSIDE PHYSIS / CAMPUS LIFE */}
      <section id="gallery" className="py-24 relative z-10 bg-[#050505] border-t border-white/10 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-left space-y-3 mb-16 max-w-3xl">
            <span className="text-cyan-500 font-mono text-xs tracking-[0.3em] uppercase block mb-1 italic">// Campus Life</span>
            <h2 className="text-4xl sm:text-5xl font-black italic tracking-tighter text-white uppercase leading-none">
              Inside PHYSIS
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Classrooms, laboratories, seminars and quiet hours of study.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Gallery Tabs selectors */}
            <div className="lg:col-span-4 flex flex-col justify-center space-y-3">
              {campusSpots.map((spot) => (
                <button
                  key={spot.id}
                  onClick={() => setActiveCampusId(spot.id)}
                  className={`px-6 py-4.5 rounded border text-left transition-all duration-300 flex flex-col space-y-1 cursor-pointer ${
                    activeCampusId === spot.id
                      ? 'bg-white/5 border-cyan-500 text-cyan-400 shadow-md'
                      : 'border-white/10 hover:border-cyan-500/50 bg-[#08080a] text-slate-300'
                  }`}
                >
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-inherit">
                    {spot.id === 'cs1' ? 'PHOTO #01' : spot.id === 'cs2' ? 'PHOTO #02' : spot.id === 'cs3' ? 'PHOTO #03' : 'PHOTO #04'}
                  </span>
                  <span className="text-sm font-bold text-white uppercase italic tracking-wide block">
                    {spot.title}
                  </span>
                </button>
              ))}
            </div>

            {/* Gallery Active Photo Display */}
            <div className="lg:col-span-8 min-h-[350px] sm:min-h-[420px] rounded overflow-hidden border border-white/10 relative bg-[#08080a] shadow-2xl">
              <AnimatePresence mode="wait">
                {campusSpots.map((spot) => {
                  if (spot.id !== activeCampusId) return null;
                  return (
                    <motion.div
                      key={spot.id}
                      initial={{ opacity: 0, scale: 1.01 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.01 }}
                      transition={{ duration: 0.35 }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <img
                        src={spot.imagePath}
                        alt={spot.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                      
                      {/* Description overlay */}
                      <div className="absolute bottom-6 left-6 right-6 text-left space-y-2">
                        <span className="px-2.5 py-1 rounded-sm bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-mono tracking-widest text-cyan-400 uppercase">
                          PHYSIS CAMPUS DIRECTORY
                        </span>
                        <h4 className="text-lg sm:text-xl font-bold uppercase italic text-white tracking-wide">
                          {spot.title}
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                          {spot.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 relative z-10 bg-[#050505] scroll-mt-20 border-t border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-left space-y-3 mb-16 max-w-3xl">
            <span className="text-cyan-500 font-mono text-xs tracking-[0.3em] uppercase block mb-1 italic">// Voices of Students</span>
            <h2 className="text-4xl sm:text-5xl font-black italic tracking-tighter text-white uppercase leading-none">
              Trusted by Scholars
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Real stories from students who walked into PHYSIS and walked out as physicists.
            </p>
          </div>

          {/* Testimonial Active Slider Box */}
          <div className="max-w-3xl mx-auto relative">
            <div className="absolute -left-12 top-1/2 -translate-y-1/2 text-white/[0.02] text-[160px] font-black pointer-events-none select-none italic">
              "
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="bg-[#08080a] border border-white/10 rounded-lg p-8 sm:p-10 shadow-xl backdrop-blur-md relative z-10 space-y-6 text-left"
              >
                {/* Score rating header */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1 text-cyan-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-cyan-400 text-cyan-400" />
                    ))}
                  </div>
                  <span className="text-xs font-mono text-cyan-400 font-semibold tracking-wider">
                    {testimonialsData[testimonialIndex].grade}
                  </span>
                </div>

                <p className="text-base sm:text-lg text-[#e0e0e0] leading-relaxed font-sans italic">
                  "{testimonialsData[testimonialIndex].quote}"
                </p>

                {/* Profile card signature */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  <div className="w-11 h-11 rounded bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center font-bold text-sm text-cyan-400">
                    {testimonialsData[testimonialIndex].avatarInitials}
                  </div>
                  <div className="text-left space-y-0.5">
                    <h4 className="text-sm font-bold uppercase italic text-white">
                      {testimonialsData[testimonialIndex].name}
                    </h4>
                    <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                      ALUMNUS • PHYSIS PHYSICS INSTITUTE
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Pagination Bullet indicators */}
            <div className="flex items-center justify-center gap-2 pt-8">
              {testimonialsData.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestimonialIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    testimonialIndex === i ? 'bg-cyan-400 w-6' : 'bg-white/10 hover:bg-white/25'
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* CONTACT & GET IN TOUCH */}
      <section id="contact" className="py-24 relative z-10 bg-[#050505] border-t border-white/10 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-left space-y-3 mb-16 max-w-3xl">
            <span className="text-cyan-500 font-mono text-xs tracking-[0.3em] uppercase block mb-1 italic">// Get In Touch</span>
            <h2 className="text-4xl sm:text-5xl font-black italic tracking-tighter text-white uppercase leading-none">
              Visit • Call • Write
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Admissions, doubts, or collaboration enquiries — we&apos;d love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-12">
            
            {/* Contact details stack & WhatsApp quick link */}
            <div className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Address Item */}
                <div className="bg-white/[0.02] border border-white/10 rounded-lg p-5 hover:border-cyan-500/50 transition-colors align-left text-left space-y-3.5">
                  <div className="w-9 h-9 rounded-sm bg-cyan-400/5 border border-cyan-400/20 flex items-center justify-center text-cyan-400">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.1em] block font-bold">// Address</span>
                    <p className="text-xs text-slate-300 leading-normal">
                      PHYSIS Institute, Beltola Tiniali, Guwahati 781028, Assam, India.
                    </p>
                  </div>
                </div>

                {/* Phone Item */}
                <div className="bg-white/[0.02] border border-white/10 rounded-lg p-5 hover:border-cyan-500/50 transition-colors align-left text-left space-y-3.5">
                  <div className="w-9 h-9 rounded-sm bg-cyan-400/5 border border-cyan-400/20 flex items-center justify-center text-cyan-400">
                    <Phone className="w-4.5 h-4.5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.1em] block font-bold">// Phone</span>
                    <p className="text-xs text-slate-300 font-semibold">
                      +91 98765 43210
                    </p>
                    <p className="text-[9px] font-mono text-white/30 block">Syllabus Batches Enquiry</p>
                  </div>
                </div>

                {/* Email Item */}
                <div className="bg-white/[0.02] border border-white/10 rounded-lg p-5 hover:border-cyan-500/50 transition-colors align-left text-left space-y-3.5">
                  <div className="w-9 h-9 rounded-sm bg-cyan-400/5 border border-cyan-400/20 flex items-center justify-center text-cyan-400">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.1em] block font-bold">// Email</span>
                    <p className="text-xs text-slate-300 hover:text-cyan-400 font-semibold transition break-all leading-none pb-1">
                      admissions@physis.edu
                    </p>
                    <p className="text-[9px] font-mono text-white/30 block">Research Consultations</p>
                  </div>
                </div>

                {/* Office Hours Item */}
                <div className="bg-white/[0.02] border border-white/10 rounded-lg p-5 hover:border-cyan-500/50 transition-colors align-left text-left space-y-3.5">
                  <div className="w-9 h-9 rounded-sm bg-cyan-400/5 border border-cyan-400/20 flex items-center justify-center text-cyan-400">
                    <Clock className="w-4.5 h-4.5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.1em] block font-bold">// Hours</span>
                    <p className="text-xs text-slate-300 leading-normal">
                      Mon-Sat: 9:00 AM - 7:00 PM
                    </p>
                    <p className="text-[9px] font-mono text-white/30 block">Sundays by appointment</p>
                  </div>
                </div>

              </div>

              {/* Direct WhatsApp button line */}
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-6 rounded bg-[#25d366]/5 hover:bg-[#25d366]/10 border border-[#25d366]/30 hover:border-[#25d366] transition-all duration-300 flex items-center justify-center gap-2.5 text-[#25d366] font-mono font-bold uppercase tracking-wider text-xs"
              >
                <MessageCircle className="w-4.5 h-4.5 fill-[#25d366] text-transparent" />
                Message on WhatsApp
              </a>

            </div>

            {/* Contact Form component */}
            <ContactForm />

          </div>

          {/* Interactive Styled Guwahati map component */}
          <div className="pt-8">
            <InteractiveMap />
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#050505] border-t border-white/10 py-16 text-left relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-white/10">
            
            {/* Logo details column */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <Atom className="w-7 h-7 text-cyan-400" />
                <div className="text-left">
                  <span className="text-lg font-black italic text-white tracking-tight block leading-none">PHYSIS</span>
                  <span className="text-[8px] font-mono tracking-widest text-[#22d3ee] block leading-none pt-0.5">// ACCELERATOR</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-normal max-w-sm">
                A research-oriented physics coaching institute committed to concept-based learning for higher-secondary and FYUGP scholars across India. Established Est. 2018.
              </p>
            </div>

            {/* Quick Links Column */}
            <div className="md:col-span-3 space-y-3.5">
              <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest font-bold block">// NAVIGATION</span>
              <ul className="text-xs space-y-2 text-slate-400 font-semibold font-mono uppercase">
                <li><button onClick={() => handleScrollToSection('about')} className="hover:text-cyan-400 transition">About</button></li>
                <li><button onClick={() => handleScrollToSection('notes')} className="hover:text-cyan-400 transition">Notes</button></li>
                <li><button onClick={() => handleScrollToSection('lectures')} className="hover:text-cyan-400 transition">Lectures</button></li>
                <li><button onClick={() => handleScrollToSection('features')} className="hover:text-cyan-400 transition">Features</button></li>
                <li><button onClick={() => handleScrollToSection('gallery')} className="hover:text-cyan-400 transition">Gallery</button></li>
                <li><button onClick={() => handleScrollToSection('contact')} className="hover:text-cyan-400 transition">Contact</button></li>
              </ul>
            </div>

            {/* Resources Column */}
            <div className="md:col-span-4 space-y-3.5">
              <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest font-bold block">// RESOURCES</span>
              <ul className="text-xs space-y-2 text-slate-400 font-semibold font-mono uppercase">
                <li><button onClick={() => { handleScrollToSection('notes'); setSelectedNotesCategory('HS'); }} className="hover:text-cyan-400 transition">HS Physics</button></li>
                <li><button onClick={() => { handleScrollToSection('notes'); setSelectedNotesCategory('FYUGP'); }} className="hover:text-cyan-400 transition">FYUGP Notes</button></li>
                <li><button onClick={() => { handleScrollToSection('notes'); setSelectedNotesCategory('PYQ'); }} className="hover:text-cyan-400 transition">PYQ Archive</button></li>
                <li><button onClick={() => { handleScrollToSection('notes'); setSelectedNotesCategory('THEORY'); }} className="hover:text-cyan-400 transition">Derivations</button></li>
                <li><button onClick={() => { handleScrollToSection('notes'); setSelectedNotesCategory('PRACTICE'); }} className="hover:text-cyan-400 transition">Practice Sets</button></li>
              </ul>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-white/30">
            <span>© 2026 PHYSIS Institute. All rights reserved.</span>
            <div className="flex items-center gap-1.5 uppercase font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Engineered for Academic Excellence
            </div>
          </div>

        </div>
      </footer>

      {/* NOTES ALERT POPUP MODAL */}
      <AnimatePresence>
        {noteAlert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setNoteAlert(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 15 }}
              className="bg-[#08080a] border border-white/10 rounded-lg p-6 sm:p-8 max-w-sm w-full shadow-2xl relative z-10 text-center space-y-4"
            >
              <div className="w-10 h-10 rounded-sm bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mx-auto">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-bold uppercase italic text-white">Document Scheduled</h4>
                <p className="text-xs text-slate-400 leading-normal">
                  The study materials for <span className="text-cyan-400 font-semibold">{noteAlert}</span> are currently being peer reviewed and typeset. They will be launched online in the Google Drive directory shortly!
                </p>
              </div>
              <button
                onClick={() => setNoteAlert(null)}
                className="w-full bg-white/5 hover:bg-white/10 text-cyan-400 border border-white/10 hover:border-cyan-500/30 py-2 rounded text-xs font-mono font-bold uppercase tracking-wider transition cursor-pointer"
              >
                Understood, thank you
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* VIDEO ACTIVE LECTURES PLAYER MODAL */}
      <AnimatePresence>
        {activeVideoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveVideoModal(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 20 }}
              className="bg-[#08080a] border border-white/10 rounded-lg overflow-hidden max-w-2xl w-full shadow-2xl relative z-10 flex flex-col text-left"
            >
              {/* Header */}
              <div className="px-5 py-3.5 border-b border-white/10 bg-[#050505] flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Video className="w-4.5 h-4.5 text-cyan-400" />
                  <span className="text-[10px] font-mono text-[#e0e0e0] uppercase tracking-widest font-bold">
                    {activeVideoModal.category} • HD streaming active
                  </span>
                </div>
                <button onClick={() => setActiveVideoModal(null)} className="text-slate-400 hover:text-white transition cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Player element display */}
              <div className="aspect-video bg-black flex flex-col items-center justify-center relative p-6 font-mono border-b border-white/10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#050505] via-transparent to-cyan-500/10" />
                
                {/* Visual Audio Waveform Simulation */}
                <div className="flex items-center justify-center gap-1.5 h-20 relative z-10">
                  <span className="w-1.5 h-12 bg-cyan-500/50 rounded-full animate-pulse" />
                  <span className="w-1.5 h-16 bg-cyan-400/75 rounded-full animate-pulse" />
                  <span className="w-1.5 h-10 bg-cyan-300 rounded-full animate-bounce" />
                  <span className="w-1.5 h-20 bg-teal-400 rounded-full animate-pulse" />
                  <span className="w-1.5 h-14 bg-cyan-400/75 rounded-full animate-pulse" />
                  <span className="w-1.5 h-8 bg-cyan-500/50 rounded-full animate-pulse" />
                </div>

                <div className="text-center space-y-1.5 pt-4 relative z-10">
                  <p className="text-xs text-[#e0e0e0]/50 tracking-wide uppercase">// Loading digital physics master class segment...</p>
                  <p className="text-[10px] text-cyan-400">Buffered {activeVideoModal.duration} • Ready to view on YouTube</p>
                </div>
              </div>

              {/* Bottom detail action */}
              <div className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#050505]">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold uppercase italic text-white leading-tight">
                    {activeVideoModal.title}
                  </h4>
                  <p className="text-[10px] text-white/30 font-mono">
                    Curated lecture playlist • Standard HS Physics & FYUGP Syllabus core directives
                  </p>
                </div>

                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setActiveVideoModal(null)}
                  className="px-5 py-2 rounded bg-cyan-500 hover:bg-cyan-400 text-white font-mono font-bold text-xs tracking-wider uppercase transition text-center self-start sm:self-center cursor-pointer"
                >
                  Watch on YouTube
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SIGN IN / AUTHENTICATION MODAL */}
      <AnimatePresence>
        {isAuthOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAuthOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 15 }}
              className="bg-[#08080a] border border-white/10 rounded-lg p-6 sm:p-8 max-w-md w-full shadow-2xl relative z-10 text-left space-y-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsAuthOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Logo / Header */}
              <div className="text-center space-y-1 pt-2">
                <div className="w-10 h-10 rounded bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mx-auto">
                  <Atom className="w-5 h-5 animate-spin-slow" />
                </div>
                <h4 className="text-xl font-bold uppercase italic text-white text-center">
                  {authMode === 'signin' ? 'Sign In to PHYSIS' : 'Scholars Registration'}
                </h4>
                <p className="text-xs text-slate-400 text-center">
                  {authMode === 'signin'
                    ? 'Enter username credentials to access study materials'
                    : 'Create your academic profile to track syllabus progress'}
                </p>
              </div>

              {authSuccess ? (
                <div className="py-6 text-center space-y-2">
                  <div className="w-10 h-10 rounded bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mx-auto">
                    <Star className="w-5 h-5 animate-spin" />
                  </div>
                  <h5 className="text-sm font-semibold text-white uppercase italic text-center">Access Granted!</h5>
                  <p className="text-[11px] text-slate-500 text-center uppercase font-mono">// Initializing customized physics student portal...</p>
                </div>
              ) : (
                <form onSubmit={handleAuthSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-medium text-white/40 uppercase tracking-widest block">
                       Scholar Email
                    </label>
                    <input
                      type="email"
                      required
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-[#050505] border border-white/10 focus:border-cyan-500 rounded px-4 py-2.5 text-xs sm:text-sm text-[#e0e0e0] placeholder-white/20 outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-medium text-white/40 uppercase tracking-widest block">
                      Password Code
                    </label>
                    <input
                      type="password"
                      required
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-[#050505] border border-white/10 focus:border-cyan-500 rounded px-4 py-2.5 text-xs sm:text-sm text-[#e0e0e0] placeholder-white/20 outline-none transition-all"
                    />
                  </div>

                  {authMode === 'signin' && (
                    <div className="text-right">
                      <button type="button" className="text-[10px] font-mono text-cyan-400 hover:underline cursor-pointer">
                        Forgot entry credentials?
                      </button>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={authLoading}
                    className="w-full py-2.5 rounded bg-cyan-500 hover:bg-cyan-400 text-white font-mono font-bold text-xs tracking-wider uppercase transition disabled:opacity-50 cursor-pointer"
                  >
                    {authLoading ? 'Transmitting credentials...' : authMode === 'signin' ? 'Unlock Portal' : 'Register Profile'}
                  </button>

                  <div className="text-center pt-2">
                    {authMode === 'signin' ? (
                      <p className="text-xs text-slate-400">
                        New student or visitor?{' '}
                        <button
                          type="button"
                          onClick={() => setAuthMode('signup')}
                          className="text-cyan-400 hover:underline font-semibold cursor-pointer"
                        >
                          Register here
                        </button>
                      </p>
                    ) : (
                      <p className="text-xs text-slate-400">
                        Already have access code?{' '}
                        <button
                          type="button"
                          onClick={() => setAuthMode('signin')}
                          className="text-cyan-400 hover:underline font-semibold cursor-pointer"
                        >
                          Sign in
                        </button>
                      </p>
                    )}
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
