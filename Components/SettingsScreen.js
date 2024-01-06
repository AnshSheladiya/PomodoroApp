// SettingsScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = ({ navigation }) => {
  const [breakTime, setBreakTime] = useState('5');
  const [workTime, setWorkTime] = useState('25');

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedWorkTime = await AsyncStorage.getItem('workTime');
        const storedBreakTime = await AsyncStorage.getItem('breakTime');

        if (storedWorkTime) {
          setWorkTime(storedWorkTime);
        } else {
          // If not present, set default value
          setWorkTime('25');
        }

        if (storedBreakTime) {
          setBreakTime(storedBreakTime);
        } else {
          // If not present, set default value
          setBreakTime('5');
        }
      } catch (error) {
        console.error('Error loading timer settings:', error);
      }
    };

    loadSettings();
  }, []);

  const saveSettings = async () => {
    try {
      const maxWorkTime = 60;
      const maxBreakTime = 20;
      // Check if values exceed maximum limits
      if (parseInt(workTime, 10) > maxWorkTime || parseInt(breakTime, 10) > maxBreakTime) {
        Alert.alert(
          'Invalid Input',
          'Work time should be at most 60 minutes, and break time should be at most 20 minutes.'
        );
        return;
      }

      await AsyncStorage.setItem('breakTime', breakTime);
      await AsyncStorage.setItem('workTime', workTime);
      navigation.goBack();
    } catch (error) {
      console.error('Error saving timer settings:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customize Timer</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Break Time (minutes):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={breakTime}
          onChangeText={(text) => setBreakTime(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Work Time (minutes):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={workTime}
          onChangeText={(text) => setWorkTime(text)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={saveSettings}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F7C4',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 18,
    marginBottom: 8, // Increased spacing
    color: '#555', // Slightly darker color
    fontWeight: 'bold', // Added bold font weight
  },  
  input: {
    borderWidth: 2,
    borderColor: '#ddd', // Lighter border color for a clean look
    borderRadius: 20, // Increased border radius for a rounded appearance
    paddingVertical: 16, // Adjusted vertical padding for balanced spacing
    paddingHorizontal: 20, // Adjusted horizontal padding for better proportions
    marginTop: 20, // Increased top margin for better separation
    fontSize: 18, // Font size for clear visibility
    width: '100%',
    backgroundColor: '#f5f5f5', // Lighter gray background for a softer feel
    color: '#333', // Darker text color for better contrast
    letterSpacing: 1, // Increased letter spacing for a modern touch
    fontWeight: '600', // Added font weight for a bolder look
    elevation: 2, // Added elevation for a subtle shadow on Android
    shadowColor: '#000', // Shadow color
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2, // Adjusted shadow opacity
    shadowRadius: 4, // Adjusted shadow radius
  },    
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold', // Add bold text
  },
});


export default SettingsScreen;
