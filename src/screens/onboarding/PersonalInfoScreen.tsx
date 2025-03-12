import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView,
  TouchableOpacity,
  Platform
} from 'react-native';
import { COLORS } from '../../constants/colors';
import { H1, Body1, Body2 } from '../../components/typography/Typography';
import Button from '../../components/buttons/Button';
import TextInput from '../../components/inputs/TextInput';
import { OnboardingScreenProps } from '../../navigation';

type PersonalInfoScreenProps = OnboardingScreenProps<'PersonalInfo'>;

const PersonalInfoScreen: React.FC<PersonalInfoScreenProps> = ({ navigation, route }) => {
  const { goal } = route.params;
  
  const [formData, setFormData] = useState({
    age: '',
    height: '',
    weight: '',
    activityLevel: 'moderate' as 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active',
  });
  
  const [formErrors, setFormErrors] = useState({
    age: '',
    height: '',
    weight: '',
  });

  const activityLevels = [
    { id: 'sedentary', label: 'Sedentary', description: 'Little to no exercise' },
    { id: 'light', label: 'Lightly Active', description: '1-3 days of exercise/week' },
    { id: 'moderate', label: 'Moderately Active', description: '3-5 days of exercise/week' },
    { id: 'active', label: 'Active', description: '6-7 days of exercise/week' },
    { id: 'very_active', label: 'Very Active', description: 'Physical job or 2x training/day' },
  ];

  const validateForm = () => {
    const errors = {
      age: '',
      height: '',
      weight: '',
    };
    
    let isValid = true;
    
    if (!formData.age) {
      errors.age = 'Age is required';
      isValid = false;
    } else if (parseInt(formData.age) < 18 || parseInt(formData.age) > 100) {
      errors.age = 'Age must be between 18 and 100';
      isValid = false;
    }
    
    if (!formData.height) {
      errors.height = 'Height is required';
      isValid = false;
    }
    
    if (!formData.weight) {
      errors.weight = 'Weight is required';
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };

  const handleContinue = () => {
    if (validateForm()) {
      navigation.navigate('CycleSetup', { 
        goal,
        personalInfo: formData 
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <H1>Tell us about yourself</H1>
          <Body1 color={COLORS.TEXT_MEDIUM} style={styles.subtitle}>
            We'll use this to create your personalized plan
          </Body1>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            label="Age"
            placeholder="Enter your age"
            keyboardType="number-pad"
            value={formData.age}
            error={formErrors.age}
            onChangeText={(text) => setFormData({ ...formData, age: text })}
            maxLength={3}
          />

          <TextInput
            label="Height (cm)"
            placeholder="Enter your height in centimeters"
            keyboardType="number-pad"
            value={formData.height}
            error={formErrors.height}
            onChangeText={(text) => setFormData({ ...formData, height: text })}
            maxLength={3}
          />

          <TextInput
            label="Weight (kg)"
            placeholder="Enter your weight in kilograms"
            keyboardType="number-pad"
            value={formData.weight}
            error={formErrors.weight}
            onChangeText={(text) => setFormData({ ...formData, weight: text })}
            maxLength={3}
          />

          <View style={styles.activitySection}>
            <Body2 style={styles.activityLabel} color={COLORS.TEXT_MEDIUM}>
              Activity Level
            </Body2>
            
            {activityLevels.map((activity) => (
              <TouchableOpacity
                key={activity.id}
                style={[
                  styles.activityCard,
                  formData.activityLevel === activity.id && styles.selectedActivityCard,
                ]}
                onPress={() => setFormData({ ...formData, activityLevel: activity.id as any })}
                activeOpacity={0.8}
              >
                <Body1 
                  style={styles.activityTitle}
                  color={formData.activityLevel === activity.id ? COLORS.WHITE : COLORS.TEXT_DARK}
                >
                  {activity.label}
                </Body1>
                <Body2
                  color={formData.activityLevel === activity.id ? COLORS.WHITE : COLORS.TEXT_MEDIUM}
                >
                  {activity.description}
                </Body2>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="CONTINUE"
            variant="primary"
            onPress={handleContinue}
            style={styles.button}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 24,
    paddingBottom: 36,
  },
  header: {
    marginBottom: 32,
  },
  subtitle: {
    marginTop: 8,
  },
  formContainer: {
    marginBottom: 24,
  },
  activitySection: {
    marginTop: 16,
  },
  activityLabel: {
    marginBottom: 8,
  },
  activityCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  selectedActivityCard: {
    backgroundColor: COLORS.PRIMARY,
  },
  activityTitle: {
    marginBottom: 4,
    fontWeight: '500',
  },
  buttonContainer: {
    marginTop: 8,
  },
  button: {
    width: '100%',
  },
});

export default PersonalInfoScreen;