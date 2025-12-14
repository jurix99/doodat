import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { challengesSeed, currentUserId, friendsByUserId, templates, users } from '../data/mock';
import type { Challenge, ChallengeTemplate, User, UserId } from '../types';

type State = {
  currentUserId: UserId;
  users: User[];
  templates: ChallengeTemplate[];
  challenges: Challenge[];
  friendsByUserId: Record<UserId, UserId[]>;
};

type Action =
  | { type: 'send_challenge'; toUserId: UserId; templateId: string }
  | { type: 'accept_challenge'; challengeId: string }
  | { type: 'complete_challenge'; challengeId: string };

const initialState: State = {
  currentUserId,
  users,
  templates,
  challenges: challengesSeed,
  friendsByUserId: friendsByUserId as Record<UserId, UserId[]>,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'send_challenge': {
      const id = `c_${Math.random().toString(16).slice(2)}_${Date.now()}`;
      const createdAt = Date.now();
      const next: Challenge = {
        id,
        fromUserId: state.currentUserId,
        toUserId: action.toUserId,
        templateId: action.templateId,
        status: 'pending',
        createdAt,
      };
      return { ...state, challenges: [next, ...state.challenges] };
    }
    case 'accept_challenge': {
      return {
        ...state,
        challenges: state.challenges.map((c) =>
          c.id === action.challengeId && c.status === 'pending'
            ? { ...c, status: 'accepted', acceptedAt: Date.now() }
            : c,
        ),
      };
    }
    case 'complete_challenge': {
      return {
        ...state,
        challenges: state.challenges.map((c) =>
          c.id === action.challengeId && (c.status === 'accepted' || c.status === 'pending')
            ? { ...c, status: 'completed', completedAt: Date.now(), acceptedAt: c.acceptedAt ?? Date.now() }
            : c,
        ),
      };
    }
    default:
      return state;
  }
}

type Store = {
  state: State;
  actions: {
    sendChallenge: (toUserId: UserId, templateId: string) => void;
    acceptChallenge: (challengeId: string) => void;
    completeChallenge: (challengeId: string) => void;
  };
};

const Ctx = createContext<Store | null>(null);

export function AppStoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = useMemo(
    () => ({
      sendChallenge: (toUserId: UserId, templateId: string) =>
        dispatch({ type: 'send_challenge', toUserId, templateId }),
      acceptChallenge: (challengeId: string) => dispatch({ type: 'accept_challenge', challengeId }),
      completeChallenge: (challengeId: string) => dispatch({ type: 'complete_challenge', challengeId }),
    }),
    [],
  );

  const value = useMemo(() => ({ state, actions }), [state, actions]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppStore() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useAppStore must be used inside AppStoreProvider');
  return v;
}


