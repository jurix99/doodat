import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { Card, AppText } from '../components';
import { colors, radius, spacing } from '../theme';
import { ChallengesScreen } from './ChallengesScreen';
import { FriendsScreen } from './FriendsScreen';
import { LeaderboardScreen } from './LeaderboardScreen';

type TabKey = 'Leaderboard' | 'Friends' | 'Challenges';

export function AppHome() {
  const [tab, setTab] = useState<TabKey>('Leaderboard');
  const tabs = useMemo(() => ['Leaderboard', 'Friends', 'Challenges'] as const, []);

  return (
    <View style={{ flex: 1, padding: spacing.xl }}>
      <AppText style={{ fontSize: 28, fontWeight: '700', letterSpacing: 0.6 }}>doodat</AppText>
      <AppText dim style={{ marginTop: 6 }}>
        Dare your friends. Farm points. Stay a little unhinged.
      </AppText>

      <Card style={{ marginTop: spacing.lg, padding: 6, borderRadius: radius.xl }}>
        <View style={{ flexDirection: 'row', gap: 6 }}>
          {tabs.map((t) => {
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
                <AppText style={{ textAlign: 'center', fontWeight: '700' }}>{t}</AppText>
              </Pressable>
            );
          })}
        </View>
      </Card>

      <ScrollView
        style={{ flex: 1, marginTop: spacing.lg }}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {tab === 'Leaderboard' ? <LeaderboardScreen /> : null}
        {tab === 'Friends' ? <FriendsScreen /> : null}
        {tab === 'Challenges' ? <ChallengesScreen /> : null}
      </ScrollView>
    </View>
  );
}


