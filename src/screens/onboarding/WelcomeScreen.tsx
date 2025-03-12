import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { COLORS } from '../../constants/colors';
import { H1, Body1 } from '../../components/typography/Typography';
import Button from '../../components/buttons/Button';
import Logo from '../../components/Logo';
import { OnboardingScreenNavigationProp } from '../../navigation';

interface WelcomeScreenProps {
  navigation: OnboardingScreenNavigationProp<'Welcome'>;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  const handleGetStarted = () => {
    navigation.navigate('GoalSelection');
  };

  const handleSignIn = () => {
    // Will implement later when we have the SignIn screen
    console.log('Navigate to sign in');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Logo size={120} />
        </View>

        <View style={styles.textContainer}>
          <H1 style={styles.title}>Welcome to FeminaFit</H1>
          <Body1 style={styles.subtitle} color={COLORS.TEXT_MEDIUM}>
            Personalized nutrition and fitness tracking designed for women's
            unique needs, synchronized with your cycle.
          </Body1>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="GET STARTED"
            variant="primary"
            onPress={handleGetStarted}
            style={styles.button}
          />
          <Button
            title="I ALREADY HAVE AN ACCOUNT"
            variant="tertiary"
            onPress={handleSignIn}
            style={styles.signInButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    marginBottom: 48,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    width: '100%',
    marginBottom: 16,
  },
  signInButton: {
    alignSelf: 'center',
  },
});

export default WelcomeScreen;