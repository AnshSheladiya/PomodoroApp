// PomodoroApp.js

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Vibration,
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomFloatingActionButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.floatingButton} onPress={onPress}>
      <Icon name="settings" size={24} color="#fff" />
    </TouchableOpacity>
  );
};

const PomodoroApp = ({ route }) => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [progress, setProgress] = useState(1);
  const [breakTime, setBreakTime] = useState(5);
  const navigation = useNavigation();
  const isFocused = useIsFocused(); // Check if the screen is focused

  // Load timer settings from AsyncStorage
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedWorkTime = await AsyncStorage.getItem('workTime');
        const storedBreakTime = await AsyncStorage.getItem('breakTime');

        if (storedWorkTime) {
          setMinutes(parseInt(storedWorkTime, 10));
        } else {
          setMinutes(25);
        }

        if (storedBreakTime) {
          setBreakTime(parseInt(storedBreakTime, 10));
        } else {
          setBreakTime(5);
        }
      } catch (error) {
        console.error('Error loading timer settings:', error);
      }
    };

    loadSettings();
  }, [isFocused]);

  useEffect(() => {
    if (route.params) {
      const { breakTime: newBreakTime, workTime: newWorkTime } = route.params;
      setBreakTime(newBreakTime);
      setMinutes(newWorkTime);
      setSeconds(0);
      setProgress(1);
    }
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            setIsActive(false);
            handleTimerFinish();

            // Start break timer if it was a work session
            if (!isBreak) {
              setIsBreak(true);
              setMinutes(breakTime); // Set break time
              setSeconds(0);
              setProgress(1);
            } else {
              setIsBreak(false);
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
          const totalSeconds = minutes * 60 + seconds;
          setProgress(totalSeconds / (isBreak ? breakTime * 60 : 1 * 60));
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, isBreak, breakTime]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };
  const resetTimer = async () => {
    setIsActive(false);
    setIsBreak(false);

    try {
      const storedWorkTime = await AsyncStorage.getItem('workTime');
      const storedBreakTime = await AsyncStorage.getItem('breakTime');

      if (storedWorkTime) {
        setMinutes(parseInt(storedWorkTime, 10));
      } else {
        setMinutes(25); // Default work time
      }

      if (storedBreakTime) {
        setBreakTime(parseInt(storedBreakTime, 10));
      } else {
        setBreakTime(5); // Default break time
      }

      setSeconds(0);
      setProgress(1);
    } catch (error) {
      console.error('Error loading timer settings:', error);
    }
  };
  const handleTimerFinish = () => {
    Vibration.vibrate([
      1000,
      500,
      1000,
      500,
      1000,
      500,
      1000,
      500,
      1000,
      500,
      1000,
      500,
    ]);
  };

  const formatTime = (value) => {
    return String(value).padStart(2, '0');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>PomodoroTimer</Text>
      <View style={styles.progressBar}>
        <View style={{ flex: progress, backgroundColor: '#4CAF50' }}>
          <View
            style={{
              height: 20,
              backgroundColor: '#4CAF50',
            }}
          />
        </View>
      </View>

      <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
      <Text style={styles.timerText}>
        {formatTime(minutes)}:{formatTime(seconds)}
      </Text>

      <Text
        style={[
          styles.timerStatus,
          isBreak
            ? { color: 'red', backgroundColor: '#FFCDD2' } // break time styles
            : null,
        ]}>
        {isBreak ? 'Break Time' : 'Work Time'}
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: isActive ? '#e53935' : '#4CAF50' },
          ]}
          onPress={toggleTimer}>
          <Text style={styles.buttonText}>
            {isActive ? 'Pause' : 'Start'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={resetTimer}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
      <CustomFloatingActionButton
        onPress={() => navigation.navigate('NotificationTest')}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F7C4',
  },
  floatingButton: {
    backgroundColor: '#4CAF50',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    height: 20,
    backgroundColor: '#eee',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBarContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressText: {
    marginTop: 5,
    fontSize: 16,
    color: '#4CAF50',
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    margin: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  timerStatus: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    textTransform: 'uppercase',
    textAlign: 'center',
    backgroundColor: '#eee',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
});

export default PomodoroApp;



