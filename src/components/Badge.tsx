import React from 'react';
import { View } from 'react-native';
import { AppText } from './AppText';
import { colors, radius } from '../theme';

export function Badge({
  label,
  tone = 'neutral',
}: {
  label: string;
  tone?: 'neutral' | 'success' | 'danger' | 'purple';
}) {
  const bg =
    tone === 'success'
      ? 'rgba(57,255,176,0.16)'
      : tone === 'danger'
        ? 'rgba(255,77,109,0.18)'
        : tone === 'purple'
          ? 'rgba(142,99,255,0.18)'
          : 'rgba(255,255,255,0.10)';
  const fg =
    tone === 'success'
      ? colors.success
      : tone === 'danger'
        ? colors.danger
        : tone === 'purple'
          ? colors.neonPurple
          : colors.textDim;

  return (
    <View
      style={{
        alignSelf: 'flex-start',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: radius.pill,
        backgroundColor: bg,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.12)',
      }}
    >
      <AppText style={{ fontSize: 12, fontWeight: '800', color: fg }}>{label}</AppText>
    </View>
  );
}


