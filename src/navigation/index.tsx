import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

// Import your screens
import WelcomeScreen from '../screens/onboarding/WelcomeScreen';
import GoalSelectionScreen from '../screens/onboarding/GoalSelectionScreen';
import PersonalInfoScreen from '../screens/onboarding/PersonalInfoScreen';
import CycleSetupScreen from '../screens/onboarding/CycleSetupScreen';
import AccountSetupScreen from '../screens/onboarding/AccountSetupScreen';
import PlanCreationScreen from '../screens/onboarding/PlanCreationScreen';
import HomeScreen from '../screens/dashboard/HomeScreen';

// To be created later
// import SignUpScreen from '../screens/auth/SignUpScreen';
// import SignInScreen from '../screens/auth/SignInScreen';
// import FoodScreen from '../screens/food/FoodScreen';
// import ProfileScreen from '../screens/profile/ProfileScreen';
// import AnalyticsScreen from '../screens/dashboard/AnalyticsScreen';

// Define navigation types
export type OnboardingStackParamList = {
  Welcome: undefined;
  GoalSelection: undefined;
  PersonalInfo: { goal: string };
  CycleSetup: { goal: string; personalInfo: any };
  AccountSetup: { goal: string; personalInfo: any; cycleTracking: any | null };
  PlanCreation: { goal: string; personalInfo: any; cycleTracking: any | null; userProfile: any };
};

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Food: undefined;
  Analytics: undefined;
  Profile: undefined;
};

// Type definitions for navigation props
export type OnboardingScreenNavigationProp<T extends keyof OnboardingStackParamList> = 
  StackNavigationProp<OnboardingStackParamList, T>;

export type OnboardingScreenRouteProp<T extends keyof OnboardingStackParamList> = 
  RouteProp<OnboardingStackParamList, T>;

export type OnboardingScreenProps<T extends keyof OnboardingStackParamList> = {
  navigation: OnboardingScreenNavigationProp<T>;
  route: OnboardingScreenRouteProp<T>;
};

// Create the navigators
const OnboardingStack = createStackNavigator<OnboardingStackParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();

// Onboarding navigator
const OnboardingNavigator = () => (
  <OnboardingStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <OnboardingStack.Screen name="Welcome" component={WelcomeScreen} />
    <OnboardingStack.Screen name="GoalSelection" component={GoalSelectionScreen} />
    <OnboardingStack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
    <OnboardingStack.Screen name="CycleSetup" component={CycleSetupScreen} />
    <OnboardingStack.Screen name="AccountSetup" component={AccountSetupScreen} />
    <OnboardingStack.Screen name="PlanCreation" component={PlanCreationScreen} />
  </OnboardingStack.Navigator>
);

// Auth navigator
const AuthNavigator = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    {/* Temporary placeholder screen until we create actual auth screens */}
    <AuthStack.Screen 
      name="SignIn" 
      component={() => <View />} 
    />
  </AuthStack.Navigator>
);

// Main app tab navigator
const MainNavigator = () => (
  <MainTab.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <MainTab.Screen 
      name="Home" 
      component={HomeScreen} 
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <View style={{ width: size, height: size, backgroundColor: color, borderRadius: size/2 }} />
        ),
      }}
    />
    {/* We'll add these screens later */}
  </MainTab.Navigator>
);

// Root navigator that handles authentication state
const RootNavigator = () => {
  // For development, we can use these flags to skip to different parts of the app
  // In a real app, these would be stored in a global state/context or Redux
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = React.useState(false);
  
  // For development purposes - set to true to skip to the main app
  const showMainAppForDev = false;
  
  React.useEffect(() => {
    // This simulates what would happen after completing onboarding
    // In a real app, this would be handled by your state management
    if (showMainAppForDev) {
      setIsAuthenticated(true);
      setHasCompletedOnboarding(true);
    }
  }, [showMainAppForDev]);

  return (
    <NavigationContainer>
      {!hasCompletedOnboarding ? (
        <OnboardingNavigator />
      ) : !isAuthenticated ? (
        <AuthNavigator />
      ) : (
        <MainNavigator />
      )}
    </NavigationContainer>
  );
};

export default RootNavigator;