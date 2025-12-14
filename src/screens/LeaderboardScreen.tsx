import React, { useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import { Avatar, Badge, Card, AppText } from '../components';
import { colors, radius, spacing } from '../theme';
import { useAppStore } from '../store/AppStore';
import { pointsByUserId, ranksNearYou, sortedLeaderboard } from '../store/selectors';

export function LeaderboardScreen() {
  const {
    state: { users, challenges, templates, currentUserId },
  } = useAppStore();

  const { ranked, near } = useMemo(() => {
    const points = pointsByUserId(users, challenges, templates);
    const ranked = sortedLeaderboard(users, points);
    const near = ranksNearYou(ranked, currentUserId, 6);
    return { ranked, near };
  }, [users, challenges, templates, currentUserId]);

  const top = ranked.slice(0, 3);

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 28 }} showsVerticalScrollIndicator={false}>
      <Card style={{ padding: spacing.xl, borderRadius: radius.xl }}>
        <AppText style={{ fontSize: 22, fontWeight: '900' }}>Leaderboard</AppText>
        <AppText dim style={{ marginTop: 6 }}>
          Daily degeneracy, politely scored.
        </AppText>

        <View style={{ flexDirection: 'row', marginTop: spacing.xl, gap: 12, alignItems: 'flex-end' }}>
          <PodiumCard place={2} item={top[1]} ring="pink" />
          <PodiumCard place={1} item={top[0]} ring="purple" crowned />
          <PodiumCard place={3} item={top[2]} ring="orange" />
        </View>
      </Card>

      <View style={{ marginTop: spacing.xl, paddingHorizontal: 2 }}>
        <AppText style={{ fontSize: 18, fontWeight: '900' }}>Ranks near you</AppText>
        <AppText muted style={{ marginTop: 6 }}>
          Stay close to the chaos. Climb one dare at a time.
        </AppText>
      </View>

      <View style={{ marginTop: spacing.md, gap: 10 }}>
        {near.map((u, idx) => {
          const rank = ranked.findIndex((x) => x.id === u.id) + 1;
          const you = u.id === currentUserId;
          return (
            <Card
              key={u.id}
              style={{
                padding: spacing.md,
                borderRadius: radius.xl,
                backgroundColor: you ? 'rgba(142,99,255,0.22)' : colors.surface1,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <Avatar
                  name={u.name}
                  size={46}
                  ring={you ? 'purple' : idx % 3 === 0 ? 'green' : idx % 3 === 1 ? 'pink' : 'orange'}
                />
                <View style={{ flex: 1 }}>
                  <AppText style={{ fontWeight: '900' }}>{you ? 'You' : u.name}</AppText>
                  <AppText dim>${u.points}</AppText>
                </View>
                <Badge label={`#${rank}`} tone={you ? 'purple' : 'neutral'} />
              </View>
            </Card>
          );
        })}
      </View>
    </ScrollView>
  );
}

function PodiumCard({
  place,
  item,
  ring,
  crowned,
}: {
  place: 1 | 2 | 3;
  item?: { id: string; name: string; points: number };
  ring: 'purple' | 'pink' | 'orange' | 'green';
  crowned?: boolean;
}) {
  const height = place === 1 ? 164 : place === 2 ? 142 : 132;
  const bg = place === 1 ? 'rgba(142,99,255,0.20)' : 'rgba(255,255,255,0.06)';

  if (!item) {
    return (
      <View style={{ flex: 1, height, borderRadius: radius.xl, backgroundColor: bg, borderWidth: 1, borderColor: colors.stroke }} />
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height,
          borderRadius: radius.xl,
          backgroundColor: bg,
          borderWidth: 1,
          borderColor: colors.stroke,
          padding: spacing.md,
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 10,
        }}
      >
        <View style={{ position: 'absolute', top: 14 }}>
          {crowned ? <AppText style={{ fontSize: 18 }}>👑</AppText> : null}
        </View>
        <Avatar name={item.name} size={64} ring={ring} />
        <View style={{ alignItems: 'center' }}>
          <AppText style={{ fontWeight: '900' }} numberOfLines={1}>
            {item.name}
          </AppText>
          <AppText style={{ color: colors.neonPurple, fontWeight: '900' }}>${item.points}</AppText>
        </View>
        <Badge label={`${place}`} tone={place === 1 ? 'purple' : 'neutral'} />
      </View>
    </View>
  );
}


