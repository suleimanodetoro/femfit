import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { COLORS, SHADOWS } from '../../constants/colors';
import { H1, H3, Body1 } from '../../components/typography/Typography';
import Button from '../../components/buttons/Button';
import { OnboardingScreenNavigationProp } from '../../navigation';

type Goal = 'lose_weight' | 'maintain_weight' | 'gain_muscle' | 'improve_health';

interface GoalOption {
  id: Goal;
  title: string;
  description: string;
}

interface GoalSelectionScreenProps {
  navigation: OnboardingScreenNavigationProp<'GoalSelection'>;
}

const GOALS: GoalOption[] = [
  {
    id: 'lose_weight',
    title: 'Lose Weight',
    description: 'Sustainable approach to reach a healthy weight',
  },
  {
    id: 'maintain_weight',
    title: 'Maintain Weight',
    description: 'Keep your current weight with balanced nutrition',
  },
  {
    id: 'gain_muscle',
    title: 'Gain Muscle',
    description: 'Build strength with proper nutrition',
  },
  {
    id: 'improve_health',
    title: 'Improve Health',
    description: 'Focus on nutrition quality for better wellbeing',
  },
];

const GoalSelectionScreen: React.FC<GoalSelectionScreenProps> = ({ navigation }) => {
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  const handleGoalSelect = (goal: Goal) => {
    setSelectedGoal(goal);
  };

  const handleContinue = () => {
    if (selectedGoal) {
      // Navigate to the next screen with the selected goal
      navigation.navigate('PersonalInfo', { goal: selectedGoal });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <H1>What's your goal?</H1>
          <Body1 color={COLORS.TEXT_MEDIUM} style={styles.subtitle}>
            We'll customize your plan based on your goal
          </Body1>
        </View>

        <View style={styles.goalsContainer}>
          {GOALS.map((goal) => (
            <TouchableOpacity
              key={goal.id}
              style={[
                styles.goalCard,
                selectedGoal === goal.id && styles.selectedGoalCard,
              ]}
              onPress={() => handleGoalSelect(goal.id)}
              activeOpacity={0.8}
            >
              <H3 
                style={styles.goalTitle}
                color={selectedGoal === goal.id ? COLORS.WHITE : COLORS.TEXT_DARK}
              >
                {goal.title}
              </H3>
              <Body1 
                style={styles.goalDescription}
                color={selectedGoal === goal.id ? COLORS.WHITE : COLORS.TEXT_MEDIUM}
              >
                {goal.description}
              </Body1>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="CONTINUE"
            variant="primary"
            onPress={handleContinue}
            disabled={!selectedGoal}
            style={styles.button}
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
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 36,
    justifyContent: 'space-between',
  },
  header: {
    marginBottom: 32,
  },
  subtitle: {
    marginTop: 8,
  },
  goalsContainer: {
    flex: 1,
  },
  goalCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    ...SHADOWS.SMALL,
  },
  selectedGoalCard: {
    backgroundColor: COLORS.PRIMARY,
  },
  goalTitle: {
    marginBottom: 4,
  },
  goalDescription: {
    opacity: 0.8,
  },
  buttonContainer: {
    marginTop: 24,
  },
  button: {
    width: '100%',
  },
});

export default GoalSelectionScreen;