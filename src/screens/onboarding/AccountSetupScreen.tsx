import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import { COLORS } from '../../constants/colors';
import { H1, Body1, Body2, Caption } from '../../components/typography/Typography';
import Button from '../../components/buttons/Button';
import TextInput from '../../components/inputs/TextInput';
import { signUp } from '../../services/supabase/supabase';
import { OnboardingScreenProps } from '../../navigation';

type AccountSetupScreenProps = OnboardingScreenProps<'AccountSetup'>;

const AccountSetupScreen: React.FC<AccountSetupScreenProps> = ({ navigation, route }) => {
  const { goal, personalInfo, cycleTracking } = route.params;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [loading, setLoading] = useState(false);
  
  const validateForm = () => {
    const errors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
    
    let isValid = true;
    
    // Validate name
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email';
      isValid = false;
    }
    
    // Validate password
    if (!formData.password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
      isValid = false;
    }
    
    // Validate confirm password
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };

  const handleCreateAccount = async () => {
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Call Supabase signup
      const { data, error } = await signUp(formData.email, formData.password);
      
      if (error) {
        Alert.alert('Error', error.message);
      } else {
        // Store user profile data in Supabase
        // In a real app, you would create a function to store the user profile
        // For now, we'll just navigate to the next screen
        navigation.navigate('PlanCreation', {
          goal,
          personalInfo,
          cycleTracking,
          userProfile: {
            name: formData.name,
            email: formData.email,
          }
        });
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
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
          <H1>Create Your Account</H1>
          <Body1 color={COLORS.TEXT_MEDIUM} style={styles.subtitle}>
            Set up your FeminaFit account to save your progress
          </Body1>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            label="Name"
            placeholder="Enter your name"
            value={formData.name}
            error={formErrors.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
          />
          
          <TextInput
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={formData.email}
            error={formErrors.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
          />
          
          <TextInput
            label="Password"
            placeholder="Create a password"
            secureTextEntry
            value={formData.password}
            error={formErrors.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
          />
          
          <TextInput
            label="Confirm Password"
            placeholder="Confirm your password"
            secureTextEntry
            value={formData.confirmPassword}
            error={formErrors.confirmPassword}
            onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
          />
          
          <Caption style={styles.passwordHint} color={COLORS.TEXT_MEDIUM}>
            Password must be at least 8 characters long
          </Caption>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="CREATE ACCOUNT"
            variant="primary"
            onPress={handleCreateAccount}
            disabled={loading}
            loading={loading}
            style={styles.button}
          />
          
          <View style={styles.loginContainer}>
            <Body2 color={COLORS.TEXT_MEDIUM}>Already have an account?</Body2>
            <TouchableOpacity 
              onPress={() => console.log('Navigate to SignIn - will implement later')}
              style={styles.loginButton}
            >
              <Body2 color={COLORS.PRIMARY}>Log In</Body2>
            </TouchableOpacity>
          </View>
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
  passwordHint: {
    marginTop: -8,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    width: '100%',
    marginBottom: 16,
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  loginButton: {
    marginLeft: 8,
  },
});

export default AccountSetupScreen;