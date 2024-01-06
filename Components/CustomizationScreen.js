// CustomizationScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const CustomizationScreen = ({ navigation }) => {
  const [breakTime, setBreakTime] = useState('5');
  const [workTime, setWorkTime] = useState('25');

  const saveCustomization = () => {
    // Save the customization values and navigate back to the main screen
    navigation.navigate('Pomodoro', {
      breakTime: parseInt(breakTime),
      workTime: parseInt(workTime),
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Break Time (minutes):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={breakTime}
        onChangeText={(text) => setBreakTime(text)}
      />

      <Text style={styles.label}>Work Time (minutes):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={workTime}
        onChangeText={(text) => setWorkTime(text)}
      />

      <TouchableOpacity style={styles.button} onPress={saveCustomization}>
        <Text style={styles.buttonText}>Save Customization</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default CustomizationScreen;
