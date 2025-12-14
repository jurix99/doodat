import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { AppText, Avatar, Badge, Button, Card } from '../components';
import { colors, radius, spacing } from '../theme';
import { useAppStore } from '../store/AppStore';
import { byId } from '../store/selectors';
import type { ChallengeStatus } from '../types';

type Tab = 'Inbox' | 'Sent' | 'Completed';

export function ChallengesScreen() {
  const {
    state: { challenges, templates, users, currentUserId },
    actions,
  } = useAppStore();

  const [tab, setTab] = useState<Tab>('Inbox');

  const lists = useMemo(() => {
    const inbox = challenges.filter((c) => c.toUserId === currentUserId && c.status !== 'completed');
    const sent = challenges.filter((c) => c.fromUserId === currentUserId && c.status !== 'completed');
    const completed = challenges
      .filter((c) => c.status === 'completed' && (c.toUserId === currentUserId || c.fromUserId === currentUserId))
      .slice()
      .sort((a, b) => (b.completedAt ?? 0) - (a.completedAt ?? 0));
    return { inbox, sent, completed };
  }, [challenges, currentUserId]);

  const items = tab === 'Inbox' ? lists.inbox : tab === 'Sent' ? lists.sent : lists.completed;

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 28 }} showsVerticalScrollIndicator={false}>
      <Card style={{ padding: spacing.xl, borderRadius: radius.xl }}>
        <AppText style={{ fontSize: 22, fontWeight: '900' }}>Challenges</AppText>
        <AppText dim style={{ marginTop: 6 }}>
          Your inbox is a casino. Cash out with actions.
        </AppText>

        <Card style={{ marginTop: spacing.lg, padding: 6, borderRadius: radius.xl, backgroundColor: colors.surface0 }}>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            {(['Inbox', 'Sent', 'Completed'] as const).map((t) => {
              const active = tab === t;
              return (
                <Pressable
                  key={t}
                  onPress={() => setTab(t)}
                  style={{
                    flex: 1,
                    paddingVertical: 10,
                    borderRadius: radius.lg,
                    backgroundColor: active ? colors.neonPurple : 'transparent',
                    borderWidth: active ? 0 : 1,
                    borderColor: colors.stroke,
                  }}
                >
                  <AppText style={{ textAlign: 'center', fontWeight: '900' }}>{t}</AppText>
                </Pressable>
              );
            })}
          </View>
        </Card>
      </Card>

      <View style={{ marginTop: spacing.xl, gap: 10 }}>
        {items.length === 0 ? (
          <Card style={{ padding: spacing.xl, borderRadius: radius.xl }}>
            <AppText style={{ fontWeight: '900' }}>Nothing here… for now.</AppText>
            <AppText dim style={{ marginTop: 8 }}>
              Go send a dare in Friends. Stir the pot.
            </AppText>
          </Card>
        ) : null}

        {items.map((c) => {
          const tpl = byId(templates, c.templateId);
          const from = byId(users, c.fromUserId);
          const to = byId(users, c.toUserId);
          const isIncoming = c.toUserId === currentUserId;

          const tone = c.status === 'completed' ? 'success' : c.status === 'accepted' ? 'purple' : 'neutral';
          const statusLabel = statusText(c.status);

          return (
            <Card key={c.id} style={{ padding: spacing.lg, borderRadius: radius.xl }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <Avatar name={(isIncoming ? from?.name : to?.name) ?? '??'} size={46} ring={isIncoming ? 'pink' : 'orange'} />
                <View style={{ flex: 1 }}>
                  <AppText style={{ fontWeight: '900' }}>{tpl?.title ?? 'Unknown challenge'}</AppText>
                  <AppText muted style={{ marginTop: 4, fontSize: 12 }}>
                    {isIncoming ? `From ${from?.name ?? 'someone'}` : `To ${to?.name ?? 'someone'}`} · +{tpl?.points ?? 0}
                  </AppText>
                </View>
                <Badge label={statusLabel} tone={tone} />
              </View>

              <AppText dim style={{ marginTop: spacing.md }}>
                {tpl?.instructions ?? 'No instructions.'}
              </AppText>

              <View style={{ flexDirection: 'row', gap: 10, marginTop: spacing.md }}>
                {c.status === 'pending' && isIncoming ? (
                  <Button label="Accept" onPress={() => actions.acceptChallenge(c.id)} style={{ flex: 1 }} />
                ) : null}
                {c.status !== 'completed' && isIncoming ? (
                  <Button
                    label="Mark done"
                    onPress={() => actions.completeChallenge(c.id)}
                    style={{ flex: 1 }}
                    variant={c.status === 'pending' ? 'ghost' : 'primary'}
                  />
                ) : null}
                {c.status !== 'completed' && !isIncoming ? (
                  <Button label="Nudge" onPress={() => {}} style={{ flex: 1 }} variant="ghost" />
                ) : null}
              </View>
            </Card>
          );
        })}
      </View>
    </ScrollView>
  );
}

function statusText(s: ChallengeStatus) {
  if (s === 'pending') return 'Pending';
  if (s === 'accepted') return 'Accepted';
  return 'Completed';
}


