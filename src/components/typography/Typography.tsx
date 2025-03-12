import React from 'react';
import { Text, StyleSheet, TextStyle, TextProps } from 'react-native';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';

interface TypographyProps extends TextProps {
  children: React.ReactNode;
  style?: TextStyle;
  color?: string;
}

// Heading Components
export const H1: React.FC<TypographyProps> = ({
  children,
  style,
  color = COLORS.TEXT_DARK,
  ...rest
}) => (
  <Text style={[styles.h1, { color }, style]} {...rest}>
    {children}
  </Text>
);

export const H2: React.FC<TypographyProps> = ({
  children,
  style,
  color = COLORS.TEXT_DARK,
  ...rest
}) => (
  <Text style={[styles.h2, { color }, style]} {...rest}>
    {children}
  </Text>
);

export const H3: React.FC<TypographyProps> = ({
  children,
  style,
  color = COLORS.TEXT_DARK,
  ...rest
}) => (
  <Text style={[styles.h3, { color }, style]} {...rest}>
    {children}
  </Text>
);

// Body Text Components
export const Body1: React.FC<TypographyProps> = ({
  children,
  style,
  color = COLORS.TEXT_DARK,
  ...rest
}) => (
  <Text style={[styles.body1, { color }, style]} {...rest}>
    {children}
  </Text>
);

export const Body2: React.FC<TypographyProps> = ({
  children,
  style,
  color = COLORS.TEXT_DARK,
  ...rest
}) => (
  <Text style={[styles.body2, { color }, style]} {...rest}>
    {children}
  </Text>
);

export const Caption: React.FC<TypographyProps> = ({
  children,
  style,
  color = COLORS.TEXT_MEDIUM,
  ...rest
}) => (
  <Text style={[styles.caption, { color }, style]} {...rest}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  h1: {
    ...TYPOGRAPHY.H1,
  },
  h2: {
    ...TYPOGRAPHY.H2,
  },
  h3: {
    ...TYPOGRAPHY.H3,
  },
  body1: {
    ...TYPOGRAPHY.BODY1,
  },
  body2: {
    ...TYPOGRAPHY.BODY2,
  },
  caption: {
    ...TYPOGRAPHY.CAPTION,
  },
});