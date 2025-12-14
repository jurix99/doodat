import React from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AppText } from './AppText';
import { colors, radius } from '../theme';

function initials(name: string) {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? '').join('');
}

export function Avatar({
  name,
  size = 44,
  ring = 'purple',
}: {
  name: string;
  size?: number;
  ring?: 'purple' | 'orange' | 'pink' | 'green';
}) {
  const ringColors =
    ring === 'orange'
      ? [colors.neonOrange, colors.neonPink]
      : ring === 'pink'
        ? [colors.neonPink, colors.neonPurple]
        : ring === 'green'
          ? [colors.neonGreen, colors.neonPurple]
          : [colors.neonPurple, colors.neonPink];

  const inner = Math.max(20, size - 6);

  return (
    <LinearGradient
      colors={ringColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        width: size,
        height: size,
        borderRadius: radius.pill,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          width: inner,
          height: inner,
          borderRadius: radius.pill,
          backgroundColor: colors.surface2,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AppText style={{ fontWeight: '900', letterSpacing: 0.6 }}>{initials(name)}</AppText>
      </View>
    </LinearGradient>
  );
}


