import type { Challenge, ChallengeTemplate, User, UserId } from '../types';

export function byId<T extends { id: string }>(arr: T[], id: string): T | undefined {
  return arr.find((x) => x.id === id);
}

export function pointsByUserId(
  users: User[],
  challenges: Challenge[],
  templates: ChallengeTemplate[],
): Record<UserId, number> {
  const templatePoints = Object.fromEntries(templates.map((t) => [t.id, t.points])) as Record<string, number>;
  const totals: Record<UserId, number> = Object.fromEntries(users.map((u) => [u.id, 0])) as Record<UserId, number>;

  for (const c of challenges) {
    if (c.status !== 'completed') continue;
    const base = templatePoints[c.templateId] ?? 0;
    // Points split: doer gets most, instigator gets a little kickback.
    totals[c.toUserId] = (totals[c.toUserId] ?? 0) + base;
    totals[c.fromUserId] = (totals[c.fromUserId] ?? 0) + Math.round(base * 0.25);
  }

  return totals;
}

export function sortedLeaderboard(users: User[], points: Record<UserId, number>) {
  return [...users]
    .map((u) => ({ ...u, points: points[u.id] ?? 0 }))
    .sort((a, b) => b.points - a.points || a.name.localeCompare(b.name));
}

export function ranksNearYou<T extends { id: string }>(
  ranked: Array<T & { points: number }>,
  currentUserId: string,
  windowSize = 5,
) {
  const idx = ranked.findIndex((x) => x.id === currentUserId);
  if (idx === -1) return ranked.slice(0, windowSize);
  const half = Math.floor(windowSize / 2);
  const start = Math.max(0, idx - half);
  return ranked.slice(start, start + windowSize);
}


