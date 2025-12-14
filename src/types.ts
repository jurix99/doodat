export type UserId = string;

export type User = {
  id: UserId;
  name: string;
  handle: string;
};

export type ChallengeTemplateId = string;

export type ChallengeTemplate = {
  id: ChallengeTemplateId;
  title: string;
  vibe: string;
  points: number;
  instructions: string;
};

export type ChallengeStatus = 'pending' | 'accepted' | 'completed';

export type Challenge = {
  id: string;
  fromUserId: UserId;
  toUserId: UserId;
  templateId: ChallengeTemplateId;
  status: ChallengeStatus;
  createdAt: number;
  acceptedAt?: number;
  completedAt?: number;
};


