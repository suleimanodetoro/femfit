import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { COLORS, SHADOWS } from '../../constants/colors';
import { H1, H3, Body1, Body2, Caption } from '../../components/typography/Typography';
import Button from '../../components/buttons/Button';
import TextInput from '../../components/inputs/TextInput';
import Card from '../../components/cards/Card';
import { OnboardingScreenProps } from '../../navigation';

type CycleSetupScreenProps = OnboardingScreenProps<'CycleSetup'>;

const CycleSetupScreen: React.FC<CycleSetupScreenProps> = ({ navigation, route }) => {
  const { goal, personalInfo } = route.params;
  
  const [trackCycle, setTrackCycle] = useState<boolean | null>(null);
  const [cycleLength, setCycleLength] = useState('28');
  const [lastPeriodDay, setLastPeriodDay] = useState('');
  const [periodLength, setPeriodLength] = useState('5');
  
  const handleContinue = () => {
    // If user opts out of cycle tracking or has provided cycle info
    if (trackCycle === false || (trackCycle === true && lastPeriodDay)) {
      navigation.navigate('AccountSetup', {
        goal,
        personalInfo,
        cycleTracking: trackCycle ? {
          cycleLength,
          lastPeriodDay,
          periodLength
        } : null
      });
    }
  };

  const handleSkip = () => {
    setTrackCycle(false);
    navigation.navigate('AccountSetup', {
      goal,
      personalInfo,
      cycleTracking: null
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <H1>Cycle Tracking</H1>
          <Body1 color={COLORS.TEXT_MEDIUM} style={styles.subtitle}>
            FeminaFit adapts to your body's natural rhythm
          </Body1>
        </View>

        <Card style={styles.infoCard}>
          <H3 style={styles.infoTitle}>Why Track Your Cycle?</H3>
          <Body1 style={styles.infoText}>
            Your nutrition needs change throughout your menstrual cycle. 
            By tracking your cycle, FeminaFit can:
          </Body1>
          <View style={styles.bulletPoints}>
            <View style={styles.bulletPoint}>
              <View style={styles.bullet} />
              <Body2 style={styles.bulletText}>
                Adjust your calorie targets based on your cycle phase
              </Body2>
            </View>
            <View style={styles.bulletPoint}>
              <View style={styles.bullet} />
              <Body2 style={styles.bulletText}>
                Recommend nutrients that support you during each phase
              </Body2>
            </View>
            <View style={styles.bulletPoint}>
              <View style={styles.bullet} />
              <Body2 style={styles.bulletText}>
                Provide phase-specific exercise recommendations
              </Body2>
            </View>
          </View>
        </Card>

        <View style={styles.optionContainer}>
          <TouchableOpacity
            style={[
              styles.optionCard,
              trackCycle === true && styles.selectedOptionCard
            ]}
            onPress={() => setTrackCycle(true)}
            activeOpacity={0.8}
          >
            <Body1 
              style={styles.optionTitle}
              color={trackCycle === true ? COLORS.WHITE : COLORS.TEXT_DARK}
            >
              Yes, I want to track my cycle
            </Body1>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.optionCard,
              trackCycle === false && styles.selectedOptionCard
            ]}
            onPress={() => setTrackCycle(false)}
            activeOpacity={0.8}
          >
            <Body1 
              style={styles.optionTitle}
              color={trackCycle === false ? COLORS.WHITE : COLORS.TEXT_DARK}
            >
              No, I'll skip this for now
            </Body1>
          </TouchableOpacity>
        </View>

        {trackCycle === true && (
          <View style={styles.cycleForm}>
            <TextInput
              label="When did your last period start? (DD/MM/YYYY)"
              placeholder="DD/MM/YYYY"
              value={lastPeriodDay}
              onChangeText={setLastPeriodDay}
            />
            
            <TextInput
              label="Average cycle length (days)"
              placeholder="28"
              keyboardType="number-pad"
              value={cycleLength}
              onChangeText={setCycleLength}
            />
            
            <TextInput
              label="Average period length (days)"
              placeholder="5"
              keyboardType="number-pad"
              value={periodLength}
              onChangeText={setPeriodLength}
            />
            
            <Caption style={styles.noteText} color={COLORS.TEXT_MEDIUM}>
              Don't worry if you're not sure. You can always update this later.
            </Caption>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <Button
            title="CONTINUE"
            variant="primary"
            onPress={handleContinue}
            disabled={trackCycle === true && !lastPeriodDay}
            style={styles.button}
          />
          
          {trackCycle === null && (
            <Button
              title="SKIP FOR NOW"
              variant="tertiary"
              onPress={handleSkip}
              style={styles.skipButton}
            />
          )}
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
    marginBottom: 24,
  },
  subtitle: {
    marginTop: 8,
  },
  infoCard: {
    marginBottom: 24,
  },
  infoTitle: {
    marginBottom: 12,
  },
  infoText: {
    marginBottom: 16,
  },
  bulletPoints: {
    marginTop: 8,
  },
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.PRIMARY,
    marginTop: 8,
    marginRight: 8,
  },
  bulletText: {
    flex: 1,
  },
  optionContainer: {
    marginBottom: 24,
  },
  optionCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    ...SHADOWS.SMALL,
  },
  selectedOptionCard: {
    backgroundColor: COLORS.PRIMARY,
  },
  optionTitle: {
    fontWeight: '500',
    textAlign: 'center',
  },
  cycleForm: {
    marginBottom: 24,
  },
  noteText: {
    marginTop: 8,
    fontStyle: 'italic',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    width: '100%',
    marginBottom: 16,
  },
  skipButton: {
    alignSelf: 'center',
  },
});

export default CycleSetupScreen;