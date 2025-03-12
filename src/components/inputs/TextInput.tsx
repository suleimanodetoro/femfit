import React, { useState } from 'react';
import {
  View,
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/typography';
import { Body2, Caption } from '../typography/Typography';

interface CustomTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
}

const TextInput: React.FC<CustomTextInputProps> = ({
  label,
  error,
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  onFocus,
  onBlur,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Body2 style={[styles.label, labelStyle]} color={COLORS.TEXT_MEDIUM}>
          {label}
        </Body2>
      )}
      <RNTextInput
        style={[
          styles.input,
          isFocused && styles.focused,
          error && styles.error,
          inputStyle,
        ]}
        placeholderTextColor={COLORS.TEXT_MEDIUM}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...rest}
      />
      {error && (
        <Caption style={[styles.errorText, errorStyle]} color={COLORS.ERROR}>
          {error}
        </Caption>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 4,
  },
  input: {
    ...TYPOGRAPHY.BODY1,
    height: 48,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER,
    paddingVertical: 8,
    color: COLORS.TEXT_DARK,
  },
  focused: {
    borderBottomColor: COLORS.PRIMARY,
    borderBottomWidth: 2,
  },
  error: {
    borderBottomColor: COLORS.ERROR,
  },
  errorText: {
    marginTop: 4,
  },
});

export default TextInput;