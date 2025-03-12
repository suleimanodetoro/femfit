import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { COLORS } from '../constants/colors';

interface LogoProps {
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ size = 120 }) => {
  // This is a placeholder logo component
  // Replace with an actual image in production
  return (
    <View 
      style={[
        styles.container, 
        { 
          width: size, 
          height: size,
          borderRadius: size / 2
        }
      ]}
    >
      <Text style={styles.text}>FF</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: COLORS.WHITE,
    fontSize: 48,
    fontWeight: 'bold',
  },
});

export default Logo;