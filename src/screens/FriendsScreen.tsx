import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { AppText, Avatar, Badge, Button, Card } from '../components';
import { colors, radius, spacing } from '../theme';
import { useAppStore } from '../store/AppStore';

export function FriendsScreen() {
  const {
    state: { users, templates, currentUserId, friendsByUserId },
    actions,
  } = useAppStore();

  const friends = useMemo(() => {
    const ids = friendsByUserId[currentUserId] ?? [];
    const map = Object.fromEntries(users.map((u) => [u.id, u])) as Record<string, (typeof users)[number]>;
    return ids.map((id) => map[id]).filter(Boolean);
  }, [users, currentUserId, friendsByUserId]);

  const [selectedFriendId, setSelectedFriendId] = useState<string>(friends[0]?.id ?? '');

  const selectedFriend = users.find((u) => u.id === selectedFriendId);

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 28 }} showsVerticalScrollIndicator={false}>
      <Card style={{ padding: spacing.xl, borderRadius: radius.xl }}>
        <AppText style={{ fontSize: 22, fontWeight: '900' }}>Friends</AppText>
        <AppText dim style={{ marginTop: 6 }}>
          Pick a friend, pick a dare, press the big shiny button.
        </AppText>

        <View style={{ marginTop: spacing.lg }}>
          <AppText muted style={{ fontSize: 12, fontWeight: '900', letterSpacing: 0.8 }}>
            SELECT TARGET
          </AppText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              {friends.map((f, idx) => {
                const active = f.id === selectedFriendId;
                return (
                  <Pressable
                    key={f.id}
                    onPress={() => setSelectedFriendId(f.id)}
                    style={{
                      padding: 10,
                      borderRadius: radius.xl,
                      borderWidth: 1,
                      borderColor: active ? 'rgba(142,99,255,0.65)' : colors.stroke,
                      backgroundColor: active ? 'rgba(142,99,255,0.16)' : 'rgba(255,255,255,0.04)',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                    }}
                  >
                    <Avatar name={f.name} size={42} ring={idx % 3 === 0 ? 'pink' : idx % 3 === 1 ? 'orange' : 'green'} />
                    <View>
                      <AppText style={{ fontWeight: '900' }}>{f.name}</AppText>
                      <AppText muted style={{ fontSize: 12 }}>
                        {f.handle}
                      </AppText>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </Card>

      <View style={{ marginTop: spacing.xl, paddingHorizontal: 2 }}>
        <AppText style={{ fontSize: 18, fontWeight: '900' }}>Send a challenge</AppText>
        <AppText muted style={{ marginTop: 6 }}>
          Keep it fun. Keep it spicy. Keep it (mostly) legal.
        </AppText>
      </View>

      <View style={{ marginTop: spacing.md, gap: 10 }}>
        {templates.map((t, i) => {
          const ring = i % 3 === 0 ? 'purple' : i % 3 === 1 ? 'pink' : 'orange';
          return (
            <Card key={t.id} style={{ padding: spacing.lg, borderRadius: radius.xl }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <Avatar name={t.title} size={46} ring={ring} />
                <View style={{ flex: 1 }}>
                  <AppText style={{ fontSize: 16, fontWeight: '900' }}>{t.title}</AppText>
                  <View style={{ flexDirection: 'row', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
                    <Badge label={t.vibe} tone="neutral" />
                    <Badge label={`+${t.points}`} tone="purple" />
                  </View>
                </View>
              </View>

              <AppText dim style={{ marginTop: spacing.md }}>
                {t.instructions}
              </AppText>

              <Button
                label={selectedFriend ? `Dare ${selectedFriend.name}` : 'Pick a friend'}
                disabled={!selectedFriend}
                onPress={() => {
                  if (!selectedFriend) return;
                  actions.sendChallenge(selectedFriend.id, t.id);
                }}
                style={{ marginTop: spacing.md }}
              />
            </Card>
          );
        })}
      </View>
    </ScrollView>
  );
}


