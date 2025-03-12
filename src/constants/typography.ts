import { Platform } from 'react-native';

// Note: You'll need to add actual font files to your assets and load them
// This is a placeholder using system fonts initially
export const FONTS = {
  // We'll use system fonts initially, but you should replace these with custom fonts
  SERIF: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
  SANS: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
};

export const TYPOGRAPHY = {
  H1: {
    fontFamily: FONTS.SERIF,
    fontSize: 28,
    fontWeight: '700' as const,
    lineHeight: 34,
  },
  H2: {
    fontFamily: FONTS.SERIF,
    fontSize: 24,
    fontWeight: '700' as const,
    lineHeight: 30,
  },
  H3: {
    fontFamily: FONTS.SERIF,
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 26,
  },
  BODY1: {
    fontFamily: FONTS.SANS,
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  BODY2: {
    fontFamily: FONTS.SANS,
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  CAPTION: {
    fontFamily: FONTS.SANS,
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
  BUTTON: {
    fontFamily: FONTS.SANS,
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
};