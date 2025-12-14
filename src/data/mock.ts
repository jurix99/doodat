import type { Challenge, ChallengeTemplate, User } from '../types';

export const currentUserId = 'u_you';

export const users: User[] = [
  { id: currentUserId, name: 'You', handle: '@you' },
  { id: 'u_maria', name: 'Maria', handle: '@maria' },
  { id: 'u_rachel', name: 'Rachel', handle: '@rachel' },
  { id: 'u_andrew', name: 'Andrew', handle: '@andrew' },
  { id: 'u_martha', name: 'Martha Anderson', handle: '@martha' },
  { id: 'u_julia', name: 'Julia Clover', handle: '@juliaclover' },
  { id: 'u_carrie', name: 'Carrie Henderson', handle: '@carrie' },
  { id: 'u_anastasia', name: 'Anastasia', handle: '@anastasia' },
];

export const friendsByUserId: Record<string, string[]> = {
  [currentUserId]: ['u_maria', 'u_rachel', 'u_andrew', 'u_martha', 'u_julia', 'u_carrie', 'u_anastasia'],
};

export const templates: ChallengeTemplate[] = [
  {
    id: 't_meme_heist',
    title: 'Midnight Meme Heist',
    vibe: 'Chaotic Good',
    points: 40,
    instructions: 'Send your funniest cursed meme in under 60 seconds. No context allowed.',
  },
  {
    id: 't_steps_sprint',
    title: '10-Minute Steps Sprint',
    vibe: 'Gremlin Fitness',
    points: 50,
    instructions: 'Get up. Walk fast. 10 minutes. Return triumphant.',
  },
  {
    id: 't_water_goblin',
    title: 'Hydration Goblin',
    vibe: 'Slightly Responsible',
    points: 30,
    instructions: 'Drink a full glass of water right now. Yes, right now.',
  },
  {
    id: 't_declutter_roulette',
    title: 'Declutter Roulette',
    vibe: 'Productive Chaos',
    points: 60,
    instructions: 'Pick a random drawer. Remove 3 useless items. Enjoy the void.',
  },
  {
    id: 't_social_boss',
    title: 'Social Boss Fight',
    vibe: 'Bold & Funny',
    points: 80,
    instructions: 'Send a wholesome compliment to someone you rarely talk to.',
  },
];

// Seed a few challenges so the leaderboard isn't empty.
const now = Date.now();
export const challengesSeed: Challenge[] = [
  {
    id: 'c_1',
    fromUserId: 'u_rachel',
    toUserId: 'u_maria',
    templateId: 't_steps_sprint',
    status: 'completed',
    createdAt: now - 1000 * 60 * 60 * 22,
    acceptedAt: now - 1000 * 60 * 60 * 21,
    completedAt: now - 1000 * 60 * 60 * 20,
  },
  {
    id: 'c_2',
    fromUserId: 'u_andrew',
    toUserId: currentUserId,
    templateId: 't_meme_heist',
    status: 'pending',
    createdAt: now - 1000 * 60 * 18,
  },
  {
    id: 'c_3',
    fromUserId: currentUserId,
    toUserId: 'u_martha',
    templateId: 't_water_goblin',
    status: 'accepted',
    createdAt: now - 1000 * 60 * 60 * 2,
    acceptedAt: now - 1000 * 60 * 55,
  },
  {
    id: 'c_4',
    fromUserId: 'u_maria',
    toUserId: 'u_carrie',
    templateId: 't_declutter_roulette',
    status: 'completed',
    createdAt: now - 1000 * 60 * 60 * 48,
    acceptedAt: now - 1000 * 60 * 60 * 47,
    completedAt: now - 1000 * 60 * 60 * 46,
  },
  {
    id: 'c_5',
    fromUserId: 'u_maria',
    toUserId: currentUserId,
    templateId: 't_social_boss',
    status: 'completed',
    createdAt: now - 1000 * 60 * 60 * 5,
    acceptedAt: now - 1000 * 60 * 60 * 4.8,
    completedAt: now - 1000 * 60 * 60 * 4,
  },
];


