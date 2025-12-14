import React from 'react';
import { Pressable, StyleProp, ViewStyle } from 'react-native';
import { AppText } from './AppText';
import { colors, radius } from '../theme';

type Variant = 'primary' | 'ghost' | 'danger';

type Props = {
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  variant?: Variant;
  disabled?: boolean;
};

export function Button({ label, onPress, style, variant = 'primary', disabled }: Props) {
  const bg =
    variant === 'primary'
      ? colors.neonPurple
      : variant === 'danger'
        ? colors.danger
        : 'transparent';
  const border = variant === 'ghost' ? colors.stroke : 'transparent';
  const textColor = variant === 'ghost' ? colors.text : '#0B0C10';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        {
          paddingVertical: 10,
          paddingHorizontal: 14,
          borderRadius: radius.lg,
          backgroundColor: bg,
          borderWidth: 1,
          borderColor: border,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      <AppText style={{ textAlign: 'center', fontWeight: '800', color: textColor }}>{label}</AppText>
    </Pressable>
  );
}


