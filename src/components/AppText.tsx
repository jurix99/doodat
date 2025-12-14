import React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';
import { colors } from '../theme';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  dim?: boolean;
  muted?: boolean;
  numberOfLines?: number;
};

export function AppText({ children, style, dim, muted, numberOfLines }: Props) {
  const color = muted ? colors.textMuted : dim ? colors.textDim : colors.text;
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        {
          color,
          fontSize: 16,
          letterSpacing: 0.2,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}


