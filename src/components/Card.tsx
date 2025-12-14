import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { colors, radius } from '../theme';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function Card({ children, style }: Props) {
  return (
    <View
      style={[
        {
          backgroundColor: colors.surface1,
          borderRadius: radius.lg,
          borderWidth: 1,
          borderColor: colors.stroke,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}


