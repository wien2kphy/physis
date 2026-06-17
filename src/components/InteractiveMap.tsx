/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { MapPin, Navigation, Info, Compass, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Landmark {
  id: string;
  name: string;
  description: string;
  coords: { x: number; y: number };
  isPhysis?: boolean;
}

const landmarks: Landmark[] = [
  {
    id: 'physis',
    name: 'PHYSIS',
    description: 'Premier Physics Academy & Coaching Hub.',
    coords: { x: 580, y: 350 },
    isPhysis: true,
  },
  {
    id: 'NC College',
    name: 'NC_College',
    description: 'Premier Degree College under Assam University, Silchar.',
    coords: { x: 120, y: 180 },
  },
  {
    id: 'railway',
    name: 'Badarpur Railway Station',
    description: 'Core central transit terminal, linking scholars commuting from towns across Barak Valley.',
    coords: { x: 420, y: 280 },
  },
];

export default function InteractiveMap() {
  const [selectedLandmark, setSelectedLandmark] = useState<Landmark>(landmarks[0]);
  const [viewMode, setViewMode] = useState<'cyan' | 'slate'>('cyan');

  return (
    <div className="w-full bg-[#08080a] border border-white/10 rounded-lg overflow-hidden shadow-2xl backdrop-blur-md">
      {/* Map Control Bar */}
      <div className="px-6 py-4 border-b border-white/10 flex flex-wrap justify-between items-center bg-[#050505] gap-4">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-cyan-400" />
          <h3 className="font-mono text-white text-sm font-bold uppercase tracking-wider">// Badarpur Campus Locator</h3>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 hidden sm:inline">Theme Profile:</span>
          <div className="flex bg-[#050505] border border-white/10 p-0.5 rounded">
            <button
              onClick={() => setViewMode('cyan')}
              className={`px-3 py-1 text-[10px] uppercase font-mono tracking-wider rounded transition-all ${
                viewMode === 'cyan' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-[#888] hover:text-white'
              }`}
            >
              Cyan Grid
            </button>
            <button
              onClick={() => setViewMode('slate')}
              className={`px-3 py-1 text-[10px] uppercase font-mono tracking-wider rounded transition-all ${
                viewMode === 'slate' ? 'bg-white/10 text-white border border-white/20' : 'text-[#888] hover:text-white'
              }`}
            >
              Slate Minimal
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[460px]">
        {/* SVG Canvas Map */}
        <div className="lg:col-span-2 relative bg-[#050505] p-4 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-white/10 overflow-hidden group">
          {/* Subtle Grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:30px_30px]" />
          
          {/* Vector Map Container */}
          <div className="w-full h-full max-w-[700px] aspect-[1.7/1] relative select-none">
            <svg
              viewBox="0 0 700 400"
              className="w-full h-full transition-colors duration-500"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Brahmaputra river path */}
              <motion.path
                d="M 50 140 Q 180 110 240 125 T 410 135 T 560 115 T 670 120 L 700 125 L 700 80 L 670 75 Q 560 70 410 90 T 240 85 T 120 70 L 0 75 L 0 130 Z"
                fill={viewMode === 'cyan' ? 'rgba(6,182,212,0.05)' : 'rgba(255,255,255,0.02)'}
                stroke={viewMode === 'cyan' ? 'rgba(6,182,212,0.15)' : 'rgba(255,255,255,0.08)'}
                strokeWidth="1.5"
                initial={{ strokeDashoffset: 100 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              />
              
              {/* River label */}
              <text
                x="300"
                y="110"
                fill="rgba(255,255,255,0.15)"
                className="font-mono text-[9px] tracking-[0.2em] uppercase select-none font-bold"
              >
                Barak River
              </text>

              {/* Major Roads (Grid Lines) */}
              {/* GS Road */}
              <path
                d="M 380 400 Q 400 300 420 280 T 500 240 T 670 250"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <text x="440" y="270" fill="rgba(255,255,255,0.2)" className="text-[8px] font-mono tracking-wider rotate-[20deg]">
                Main Road
              </text>

              {/* Beltola Road linking to PHYSIS */}
              <path
                d="M 420 280 C 450 310, 480 330, 580 350"
                fill="none"
                stroke={viewMode === 'cyan' ? 'rgba(6,182,212,0.15)' : 'rgba(255,255,255,0.05)'}
                strokeWidth="3"
              />
              <text x="460" y="325" fill="rgba(6,182,212,0.3)" className="text-[8px] font-mono rotate-[15deg]">
                Main Road, Badarpur
              </text>

              {/* NH-37 Bypass */}
              <path
                d="M 120 400 Q 300 350 580 350 T 700 360"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="3"
                strokeDasharray="8 4"
              />
              <text x="210" y="375" fill="rgba(255,255,255,0.2)" className="text-[8px] font-mono">
                NH-6 (Old NH-44)
              </text>

              {/* Connections line from physis to selected */}
              {selectedLandmark && !selectedLandmark.isPhysis && (
                <motion.line
                  x1="580"
                  y1="350"
                  x2={selectedLandmark.coords.x}
                  y2={selectedLandmark.coords.y}
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              )}

              {/* Render Landmarks on Map */}
              {landmarks.map((landmark) => {
                const isSelected = selectedLandmark.id === landmark.id;
                return (
                  <g
                    key={landmark.id}
                    className="cursor-pointer group/pin"
                    onClick={() => setSelectedLandmark(landmark)}
                  >
                    {/* Ring Outer Effect */}
                    {landmark.isPhysis ? (
                      <>
                        <circle
                          cx={landmark.coords.x}
                          cy={landmark.coords.y}
                          r="18"
                          fill="rgba(6,182,212,0.05)"
                          className="animate-pulse"
                        />
                        <circle
                          cx={landmark.coords.x}
                          cy={landmark.coords.y}
                          r="10"
                          fill="none"
                          stroke="#06b6d4"
                          strokeWidth="1"
                          className="animate-ping"
                        />
                      </>
                    ) : (
                      isSelected && (
                        <circle
                          cx={landmark.coords.x}
                          cy={landmark.coords.y}
                          r="12"
                          fill="rgba(255,255,255,0.05)"
                        />
                      )
                    )}

                    {/* Pin Point */}
                    <circle
                      cx={landmark.coords.x}
                      cy={landmark.coords.y}
                      r={landmark.isPhysis ? '6' : '4'}
                      fill={
                        landmark.isPhysis
                          ? '#06b6d4'
                          : isSelected
                          ? '#ffffff'
                          : 'rgba(255,255,255,0.3)'
                      }
                      stroke="#050505"
                      strokeWidth="1.5"
                      className="transition-all duration-300 group-hover/pin:scale-125"
                    />

                    {/* Small Label tag */}
                    <text
                      x={landmark.coords.x}
                      y={landmark.coords.y - 12}
                      textAnchor="middle"
                      fill={landmark.isPhysis ? '#22d3ee' : isSelected ? '#ffffff' : 'rgba(255,255,255,0.4)'}
                      className={`text-[9px] font-mono uppercase tracking-wider select-none pointer-events-none transition-all duration-300 ${
                        isSelected || landmark.isPhysis ? 'opacity-100 scale-105 font-bold' : 'opacity-70'
                      }`}
                    >
                      {landmark.isPhysis ? '★ PHYSIS' : landmark.id === 'gauhati_univ' ? 'Gauhati.' : landmark.name.split(' (')[0].split(' ')[0]}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Float Instructions hint */}
            <div className="absolute bottom-3 left-3 bg-[#08080a]/90 border border-white/10 px-3 py-1.5 rounded pointer-events-none flex items-center gap-1.5 text-[9px] font-mono tracking-wide text-white/50 uppercase">
              <Info className="w-3.5 h-3.5 text-cyan-400" />
              <span>// Select node for distance profile</span>
            </div>
          </div>
        </div>

        {/* Selected Node Details side column */}
        <div className="p-6 flex flex-col justify-between bg-[#08080a] h-full space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 text-[9px] rounded font-mono uppercase tracking-widest ${
                selectedLandmark.isPhysis 
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' 
                  : 'bg-white/5 text-[#888] border border-white/10'
              }`}>
                {selectedLandmark.isPhysis ? 'PREMIER HQ' : 'ACADEMIC NODE'}
              </span>
            </div>

            <div className="space-y-2">
              <h4 className="text-lg font-bold uppercase italic text-white tracking-tight">
                {selectedLandmark.name}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                {selectedLandmark.description}
              </p>
            </div>

            {selectedLandmark.isPhysis ? (
              <div className="space-y-2 pt-3 border-t border-white/10">
                <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest block font-bold">// HQ Facilities</span>
                <ul className="text-xs text-slate-300 space-y-1.5">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    Theoretical study labs
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    Experimental physics setups
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    Review lecture seminar hall
                  </li>
                </ul>
              </div>
            ) : (
              <div className="space-y-2 pt-3 border-t border-white/10">
                <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest block font-bold">// Connectivity profile</span>
                <div className="flex items-start gap-2">
                  <Navigation className="w-4 h-4 text-cyan-400 rotate-45 shrink-0" />
                  <span className="text-[11px] text-slate-300 leading-normal">
                    Excellent transit access linking directly to Beltola HQ campus.
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-white/10">
           <a
  href="https://maps.app.goo.gl/NUUg3NESRjv3GCib7"
  target="_blank"
  rel="noopener noreferrer"
  className="w-full py-2.5 px-4 rounded text-xs font-mono font-bold uppercase tracking-wider bg-cyan-500 text-white hover:bg-cyan-400 transition-all duration-300 flex items-center justify-center gap-2"
>
  <MapPin className="w-4 h-4" />
  Open PHYSIS Location
</a>
          </div>
        </div>
      </div>
    </div>
  );
}
