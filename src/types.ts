/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface NoteItem {
  id: string;
  title: string;
  description: string;
  category: 'ALL' | 'HS' | 'FYUGP' | 'PYQ' | 'THEORY' | 'PRACTICE';
  badge: string;
  topics: string[];
  status: 'Active' | 'Coming Soon' | 'Archive' | 'Theory' | 'Practice';
}

export interface VideoItem {
  id: string;
  title: string;
  category: string;
  duration: string;
  views: string;
  link: string;
  thumbnailSeed: string;
}

export interface AcademicAchievement {
  id: string;
  title: string;
  description: string;
  badge: string;
  index: string;
}

export interface PillarItem {
  id: string;
  title: string;
  description: string;
  index: string;
}

export interface CampusSpot {
  id: string;
  title: string;
  description: string;
  imagePath: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  grade: string;
  quote: string;
  avatarInitials: string;
}
