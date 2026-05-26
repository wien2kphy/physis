/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { NoteItem, VideoItem, AcademicAchievement, PillarItem, CampusSpot, TestimonialItem } from './types';

export const notesData: NoteItem[] = [
  {
    id: 'n1',
    title: 'HS First Year Physics',
    description: 'Mechanics, Electromagnetism, Waves and Thermodynamics.',
    category: 'HS',
    badge: 'Class XI',
    topics: ['Mechanics', 'Waves', 'Thermodynamics'],
    status: 'Coming Soon'
  },
  {
    id: 'n2',
    title: 'HS Second Year Physics',
    description: 'Electrostatics, Optics, Electromagnetism and Modern Physics.',
    category: 'HS',
    badge: 'Class XII',
    topics: ['Electrostatics', 'Optics', 'Modern Physics'],
    status: 'Coming Soon'
  },
  {
    id: 'n3',
    title: 'FYUGP Semester Notes',
    description: 'Sem I-IV Mathematical, Quantum, Classical Mechanics, Stat. Mech.',
    category: 'FYUGP',
    badge: 'FYUGP',
    topics: ['Quantum Mechanics', 'Statistical Physics', 'Classical Mechanics'],
    status: 'Coming Soon'
  },
  {
    id: 'n4',
    title: 'PYQ Solutions',
    description: 'Last 10 years of board & university papers, fully worked and curated.',
    category: 'PYQ',
    badge: 'Archive',
    topics: ['Board Papers', 'University Exams', 'Step-by-step solutions'],
    status: 'Coming Soon'
  },
  {
    id: 'n5',
    title: 'Important Derivations',
    description: 'Step-by-step rigorous derivations curated for key academic success.',
    category: 'THEORY',
    badge: 'Theory',
    topics: ['Fundamental Theorems', 'Mathematical Proofs', 'Core Derivations'],
    status: 'Coming Soon'
  },
  {
    id: 'n6',
    title: 'Numerical Problems',
    description: 'Tiered problem sets from absolute foundational to high-difficulty olympiad style.',
    category: 'PRACTICE',
    badge: 'Practice',
    topics: ['Formula-based problems', 'Concept testing', 'Advanced numericals'],
    status: 'Coming Soon'
  }
];

export const videosData: VideoItem[] = [
  {
    id: 'v1',
    title: "Newton's Laws — A Conceptual Rebuild",
    category: 'Mechanics',
    duration: '58:10',
    views: '6.2K views',
    link: 'https://youtube.com',
    thumbnailSeed: 'mechanics_v1'
  },
  {
    id: 'v2',
    title: "Maxwell's Equations Derived From Scratch",
    category: 'Electrodynamics',
    duration: '1:12:45',
    views: '9.4K views',
    link: 'https://youtube.com',
    thumbnailSeed: 'electromagnetism_v2'
  },
  {
    id: 'v3',
    title: 'Wave-Particle Duality Explained',
    category: 'Quantum',
    duration: '36:45',
    views: '21.7K views',
    link: 'https://youtube.com',
    thumbnailSeed: 'quantum_v3'
  },
  {
    id: 'v4',
    title: 'Diffraction Patterns & Single Slit',
    category: 'Optics',
    duration: '48:20',
    views: '5.1K views',
    link: 'https://youtube.com',
    thumbnailSeed: 'optics_v4'
  },
  {
    id: 'v5',
    title: 'Photoelectric Effect — Full Derivation',
    category: 'Modern Physics',
    duration: '55:10',
    views: '11.2K views',
    link: 'https://youtube.com',
    thumbnailSeed: 'modern_v5'
  },
  {
    id: 'v6',
    title: 'Rotational Dynamics Master Class',
    category: 'Mechanics',
    duration: '1:25:30',
    views: '15.3K views',
    link: 'https://youtube.com',
    thumbnailSeed: 'mechanics_v6'
  }
];

export const interactivePillars: PillarItem[] = [
  {
    id: 'p1',
    title: 'Regular Notes Upload',
    description: 'Weekly fresh, state-of-the-art study material and clean notes aligned with the current syllabus pace.',
    index: '01 / 06'
  },
  {
    id: 'p2',
    title: 'Concept-Based Teaching',
    description: 'Every topic is taught meticulously from absolute first principles — never reduced to passive rote learning.',
    index: '02 / 06'
  },
  {
    id: 'p3',
    title: 'PYQ Discussions',
    description: 'Rigorous live walkthroughs of previous year papers with focus on critical explanation patterns and board scoring keys.',
    index: '03 / 06'
  },
  {
    id: 'p4',
    title: 'Advanced Problem Solving',
    description: 'Tiered custom problem sets building smoothly from standard textbook questions to Olympiad-level physics problems.',
    index: '04 / 06'
  },
  {
    id: 'p5',
    title: 'Exam Preparation',
    description: 'Structured targeted revision modules, detailed regular mock exams, and personalized continuous progress dashboards.',
    index: '05 / 06'
  },
  {
    id: 'p6',
    title: 'Interactive Learning',
    description: 'Optimized small batches, digital instant doubt-clearing discussion forums, and one-on-one professional mentorship.',
    index: '06 / 06'
  }
];

export const academicAchievements: AcademicAchievement[] = [
  {
    id: 'a1',
    title: 'PhD in Theoretical Physics',
    description: 'Doctorate from Tezpur University, with postdoctoral research work in condensed matter theory.',
    badge: 'QUALIFICATIONS',
    index: '01 / 05'
  },
  {
    id: 'a2',
    title: 'Quantum Mechanics - Statistical Physics',
    description: 'Active research in many-body physics, ferromagnetic field transitions, and computerized mathematical models.',
    badge: 'RESEARCH INTERESTS',
    index: '02 / 05'
  },
  {
    id: 'a3',
    title: 'National Faculty Excellence Award, 2022',
    description: 'Highly recognized for pioneering contributions to undergraduate physics education across Northeast India.',
    badge: 'ACHIEVEMENTS',
    index: '03 / 05'
  },
  {
    id: 'a4',
    title: 'MSc Gold Medalist — Gauhati University',
    description: 'First-class top academic credentials throughout graduate career; author of 18+ published high-impact research papers.',
    badge: 'BACKGROUND',
    index: '04 / 05'
  },
  {
    id: 'a5',
    title: 'Methodology: Derive - Visualise - Solve',
    description: 'A revolutionary three-stage physics teaching method that instills deep intuition, elegant geometry, and computational speed.',
    badge: 'METHODOLOGY',
    index: '05 / 05'
  }
];

export const campusSpots: CampusSpot[] = [
  {
    id: 'cs1',
    title: 'Classrooms',
    description: 'Bright, modern classrooms designed to foster active discussion, interactive screen learning, and conceptual focusing.',
    imagePath: '/src/assets/images/classroom_campus_1779804050253.png'
  },
  {
    id: 'cs2',
    title: 'Laboratory',
    description: 'Fully equipped optical rigs, electromagnetism kits, laser benches, and dynamic simulation systems for experimental validation.',
    imagePath: '/src/assets/images/laboratory_campus_1779804073290.png'
  },
  {
    id: 'cs3',
    title: 'Seminars',
    description: 'Hosting distinguished guest speakers, physics colloquiums, board preparations reviews sessions, and research presentations.',
    imagePath: '/src/assets/images/seminar_campus_1779804097371.png'
  },
  {
    id: 'cs4',
    title: 'Library',
    description: 'A rich quiet vault containing classical physics reference treatises, standard course text volumes, and academic research periodicals.',
    imagePath: '/src/assets/images/library_campus_1779804123012.png'
  }
];

export const testimonialsData: TestimonialItem[] = [
  {
    id: 't1',
    name: 'Riya Borah',
    grade: '96% in Physics (Boards)',
    quote: 'The way derivations are explained at PHYSIS made me actually understand physics for the absolute first time. I scored 96% in boards — but more importantly, I now genuinely love the science.',
    avatarInitials: 'RB'
  },
  {
    id: 't2',
    name: 'Arnab Sabhapandit',
    grade: 'FYUGP Sem-IV Student',
    quote: "From Maxwell's equations to deep statistical mechanics, every single core concept was patiently rebuilt from scratch. The PYQ breakdown sessions alone are worth the entire course.",
    avatarInitials: 'AS'
  },
  {
    id: 't3',
    name: 'Priyanka Das',
    grade: 'HS 1st Year (Class XI)',
    quote: "Small batch sizes, direct focus, and study materials that are honestly far better than standard textbook publishers. Any doubts are actively addressed as if you are the only student in the room.",
    avatarInitials: 'PD'
  },
  {
    id: 't4',
    name: 'Manash Goswami',
    grade: 'JEE Advanced (Ranked)',
    quote: 'The concept-first philosophy at PHYSIS gave me the core geometric intuition and speed I needed to tackle complex multiple-choice JEE questions. The mock exam reviews were deeply transformative.',
    avatarInitials: 'MG'
  }
];
