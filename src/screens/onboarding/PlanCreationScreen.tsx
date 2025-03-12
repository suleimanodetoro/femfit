import React, { useEffect, useState } from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { COLORS } from '../../constants/colors';
import { H1, H2, Body1 } from '../../components/typography/Typography';
import Button from '../../components/buttons/Button';
import { OnboardingScreenProps } from '../../navigation';

type PlanCreationScreenProps = OnboardingScreenProps<'PlanCreation'>;

const PlanCreationScreen: React.FC<PlanCreationScreenProps> = ({ navigation, route }) => {
  const { goal, personalInfo, cycleTracking, userProfile } = route.params;
  
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("Analyzing your information...");
  
  useEffect(() => {
    // Simulate plan creation process
    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prevProgress + 4;
      });
    }, 150);
    
    // Update messages as "progress" is made
    const messageTimeouts = [
      { time: 1000, message: "Calculating your daily calorie needs..." },
      { time: 3000, message: "Personalizing your nutrition plan..." },
      { time: 5000, message: cycleTracking ? "Integrating cycle-based adjustments..." : "Finalizing your nutrition strategy..." },
      { time: 7000, message: "Creating your personalized dashboard..." },
      { time: 9000, message: "Almost there..." },
    ];
    
    messageTimeouts.forEach(({ time, message }) => {
      setTimeout(() => {
        setMessage(message);
      }, time);
    });
    
    // Finish the "calculation" after 10 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 10000);
    
    // Cleanup
    return () => {
      clearInterval(progressInterval);
      messageTimeouts.forEach((_, index) => {
        clearTimeout(index);
      });
    };
  }, [cycleTracking]);

  const handleContinue = () => {
    // In a real app, you would save the created plan to the database
    // For now, we'll navigate to the main app by resetting the navigation
    // This is a workaround since we're crossing stack navigators
    // In a proper implementation, we would use a navigation service or context
    navigation.reset({
      index: 0,
      routes: [{ name: 'Welcome' }],
    });
    
    // Since we can't directly navigate to the Home screen from the onboarding stack,
    // in a real app we would:
    // 1. Set an authentication state in a global context or Redux
    // 2. This would trigger the RootNavigator to show the MainNavigator instead
    console.log('In a real app, this would navigate to the main dashboard');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <H1 style={styles.title}>Creating Your Plan</H1>
            
            <View style={styles.progressContainer}>
              <View style={styles.progressBarBackground}>
                <View 
                  style={[
                    styles.progressBar, 
                    { width: `${progress}%` }
                  ]} 
                />
              </View>
              <Body1 style={styles.progressText}>{`${Math.min(100, Math.round(progress))}%`}</Body1>
            </View>
            
            <Body1 style={styles.message}>{message}</Body1>
            
            <ActivityIndicator 
              size="large" 
              color={COLORS.PRIMARY} 
              style={styles.spinner}
            />
          </View>
        ) : (
          <View style={styles.completedContainer}>
            <View style={styles.checkmarkContainer}>
              <View style={styles.checkmark}>
                <H1 style={styles.checkmarkText}>✓</H1>
              </View>
            </View>
            
            <H1 style={styles.completedTitle}>Your Plan Is Ready!</H1>
            
            <Body1 style={styles.completedMessage}>
              {`We've created a personalized nutrition plan based on your ${goal.replace('_', ' ')}.`}
            </Body1>
            
            {cycleTracking && (
              <Body1 style={styles.completedMessage}>
                Your plan will automatically adjust based on your cycle phase to optimize your results.
              </Body1>
            )}
            
            <View style={styles.planSummary}>
              <H2 style={styles.summaryTitle}>Your Daily Targets</H2>
              
              <View style={styles.targetRow}>
                <Body1>Calories:</Body1>
                <Body1 style={styles.targetValue}>
                  {calculateCalories(personalInfo, goal)}
                </Body1>
              </View>
              
              <View style={styles.targetRow}>
                <Body1>Protein:</Body1>
                <Body1 style={styles.targetValue}>
                  {calculateProtein(personalInfo, goal)} g
                </Body1>
              </View>
              
              <View style={styles.targetRow}>
                <Body1>Carbs:</Body1>
                <Body1 style={styles.targetValue}>
                  {calculateCarbs(personalInfo, goal)} g
                </Body1>
              </View>
              
              <View style={styles.targetRow}>
                <Body1>Fat:</Body1>
                <Body1 style={styles.targetValue}>
                  {calculateFat(personalInfo, goal)} g
                </Body1>
              </View>
            </View>
            
            <Button
              title="GET STARTED"
              variant="primary"
              onPress={handleContinue}
              style={styles.button}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

// Simplified calorie calculation functions (these would be more sophisticated in a real app)
const calculateCalories = (personalInfo: any, goal: string) => {
  const weight = parseFloat(personalInfo.weight);
  const height = parseFloat(personalInfo.height);
  const age = parseFloat(personalInfo.age);
  
  // Base calculation (Harris-Benedict formula for women)
  let bmr = 655 + (9.6 * weight) + (1.8 * height) - (4.7 * age);
  
  // Activity multiplier
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9
  };
  
  const multiplier = activityMultipliers[personalInfo.activityLevel as keyof typeof activityMultipliers];
  let calories = Math.round(bmr * multiplier);
  
  // Goal adjustment
  if (goal === 'lose_weight') {
    calories -= 500; // Deficit for weight loss
  } else if (goal === 'gain_muscle') {
    calories += 300; // Surplus for muscle gain
  }
  
  return calories;
};

const calculateProtein = (personalInfo: any, goal: string) => {
  const weight = parseFloat(personalInfo.weight);
  
  // Protein calculation based on body weight and goal
  let proteinMultiplier = 1.6; // Base multiplier (g per kg of body weight)
  
  if (goal === 'gain_muscle') {
    proteinMultiplier = 2.0; // Higher for muscle gain
  } else if (goal === 'lose_weight') {
    proteinMultiplier = 1.8; // Higher for weight loss to preserve muscle
  }
  
  return Math.round(weight * proteinMultiplier);
};

const calculateCarbs = (personalInfo: any, goal: string) => {
  const calories = calculateCalories(personalInfo, goal);
  let carbPercentage = 0.45; // 45% of calories from carbs by default
  
  if (goal === 'lose_weight') {
    carbPercentage = 0.40; // Lower for weight loss
  } else if (goal === 'gain_muscle') {
    carbPercentage = 0.50; // Higher for muscle gain
  }
  
  // Carbs have 4 calories per gram
  return Math.round((calories * carbPercentage) / 4);
};

const calculateFat = (personalInfo: any, goal: string) => {
  const calories = calculateCalories(personalInfo, goal);
  const protein = calculateProtein(personalInfo, goal);
  const carbs = calculateCarbs(personalInfo, goal);
  
  // Calculate remaining calories after protein and carbs
  const proteinCalories = protein * 4;
  const carbCalories = carbs * 4;
  const fatCalories = calories - proteinCalories - carbCalories;
  
  // Fat has 9 calories per gram
  return Math.round(fatCalories / 9);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
  },
  title: {
    marginBottom: 32,
    textAlign: 'center',
  },
  progressContainer: {
    width: '100%',
    marginBottom: 24,
    alignItems: 'center',
  },
  progressBarBackground: {
    width: '100%',
    height: 8,
    backgroundColor: COLORS.BORDER,
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 4,
  },
  progressText: {
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
    marginBottom: 24,
  },
  spinner: {
    marginTop: 24,
  },
  completedContainer: {
    alignItems: 'center',
  },
  checkmarkContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkmark: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: COLORS.WHITE,
    fontSize: 40,
  },
  completedTitle: {
    marginBottom: 16,
    textAlign: 'center',
  },
  completedMessage: {
    textAlign: 'center',
    marginBottom: 8,
  },
  planSummary: {
    width: '100%',
    backgroundColor: COLORS.WHITE,
    borderRadius: 16,
    padding: 20,
    marginTop: 32,
    marginBottom: 32,
  },
  summaryTitle: {
    marginBottom: 16,
    textAlign: 'center',
  },
  targetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  targetValue: {
    fontWeight: '600',
  },
  button: {
    width: '100%',
  },
});

export default PlanCreationScreen;