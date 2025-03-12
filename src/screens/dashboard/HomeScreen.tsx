import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { COLORS, SHADOWS } from '../../constants/colors';
import { H1, H2, Body1, Body2 } from '../../components/typography/Typography';
import Card from '../../components/cards/Card';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  // This is a placeholder for the main dashboard
  // In a real app, this would display dynamic content based on the user's data
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <H1>Welcome to FeminaFit</H1>
          <Body1 color={COLORS.TEXT_MEDIUM}>
            Your personalized nutrition tracker
          </Body1>
        </View>
        
        <Card style={styles.calorieCard}>
          <H2 style={styles.calorieTitle}>Today's Calories</H2>
          <View style={styles.calorieCircle}>
            <H1 style={styles.calorieText}>1850</H1>
            <Body2 color={COLORS.TEXT_MEDIUM}>remaining</Body2>
          </View>
          
          <View style={styles.macroContainer}>
            <View style={styles.macroItem}>
              <Body1 style={styles.macroLabel}>Protein</Body1>
              <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { width: '40%', backgroundColor: '#A78BFA' }]} />
              </View>
              <Body2>32/80g</Body2>
            </View>
            
            <View style={styles.macroItem}>
              <Body1 style={styles.macroLabel}>Carbs</Body1>
              <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { width: '60%', backgroundColor: '#FBBF24' }]} />
              </View>
              <Body2>120/200g</Body2>
            </View>
            
            <View style={styles.macroItem}>
              <Body1 style={styles.macroLabel}>Fat</Body1>
              <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { width: '30%', backgroundColor: '#EC4899' }]} />
              </View>
              <Body2>20/65g</Body2>
            </View>
          </View>
        </Card>
        
        <Card style={styles.mealCard}>
          <H2 style={styles.mealTitle}>Today's Meals</H2>
          
          <View style={styles.mealItem}>
            <View style={[styles.mealDot, { backgroundColor: '#F97316' }]} />
            <View style={styles.mealContent}>
              <Body1 style={styles.mealName}>Breakfast</Body1>
              <Body2 color={COLORS.TEXT_MEDIUM}>0/400 kcal</Body2>
            </View>
            <View style={styles.addButtonPlaceholder}>
              <Body1 color={COLORS.PRIMARY}>+</Body1>
            </View>
          </View>
          
          <View style={styles.mealItem}>
            <View style={[styles.mealDot, { backgroundColor: '#EAB308' }]} />
            <View style={styles.mealContent}>
              <Body1 style={styles.mealName}>Lunch</Body1>
              <Body2 color={COLORS.TEXT_MEDIUM}>0/600 kcal</Body2>
            </View>
            <View style={styles.addButtonPlaceholder}>
              <Body1 color={COLORS.PRIMARY}>+</Body1>
            </View>
          </View>
          
          <View style={styles.mealItem}>
            <View style={[styles.mealDot, { backgroundColor: '#84CC16' }]} />
            <View style={styles.mealContent}>
              <Body1 style={styles.mealName}>Dinner</Body1>
              <Body2 color={COLORS.TEXT_MEDIUM}>0/550 kcal</Body2>
            </View>
            <View style={styles.addButtonPlaceholder}>
              <Body1 color={COLORS.PRIMARY}>+</Body1>
            </View>
          </View>
          
          <View style={styles.mealItem}>
            <View style={[styles.mealDot, { backgroundColor: '#8B5CF6' }]} />
            <View style={styles.mealContent}>
              <Body1 style={styles.mealName}>Snacks</Body1>
              <Body2 color={COLORS.TEXT_MEDIUM}>0/300 kcal</Body2>
            </View>
            <View style={styles.addButtonPlaceholder}>
              <Body1 color={COLORS.PRIMARY}>+</Body1>
            </View>
          </View>
        </Card>
        
        <Card style={styles.cycleCard}>
          <H2 style={styles.cycleTitle}>Cycle Phase</H2>
          <View style={[styles.phaseIndicator, { backgroundColor: COLORS.PHASE_FOLLICULAR }]}>
            <Body1 style={styles.phaseText}>Follicular Phase</Body1>
          </View>
          <Body2 style={styles.phaseDescription}>
            Focus on lean proteins and complex carbs. Your energy levels are increasing.
          </Body2>
        </Card>
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
    paddingBottom: 100, // Extra padding for bottom tabs
  },
  header: {
    marginBottom: 24,
  },
  calorieCard: {
    marginBottom: 24,
    alignItems: 'center',
  },
  calorieTitle: {
    marginBottom: 16,
  },
  calorieCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 8,
    borderColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  calorieText: {
    color: COLORS.PRIMARY,
  },
  macroContainer: {
    width: '100%',
    marginTop: 16,
  },
  macroItem: {
    marginBottom: 16,
  },
  macroLabel: {
    marginBottom: 4,
  },
  progressContainer: {
    height: 8,
    backgroundColor: COLORS.BORDER,
    borderRadius: 4,
    marginBottom: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  mealCard: {
    marginBottom: 24,
  },
  mealTitle: {
    marginBottom: 16,
  },
  mealItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  mealDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  mealContent: {
    flex: 1,
  },
  mealName: {
    marginBottom: 2,
  },
  addButtonPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0FFF4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cycleCard: {
    marginBottom: 24,
  },
  cycleTitle: {
    marginBottom: 16,
  },
  phaseIndicator: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  phaseText: {
    color: COLORS.WHITE,
    fontWeight: '500',
  },
  phaseDescription: {
    lineHeight: 22,
  },
});

export default HomeScreen;