import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import axios from 'axios'; 

const Login = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const currentYear = new Date().getFullYear();


  const handleLogin = async () => {
    // Cek jika field email atau password kosong
    if (!username) {
      Alert.alert('Missing Email', 'Please enter your email');
      return; // Stop execution if email is empty
    }
  
    if (!password) {
      Alert.alert('Missing Password', 'Please enter your password');
      return; // Stop execution if password is empty
    }
  
    try {
      const response = await axios.post(
        'http://192.168.100.39:8000/login',
        { email: username, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log('Login Response:', response);
  
      if (response.data.token) {
        // Simpan token di AsyncStorage dan arahkan ke Dashboard
        await AsyncStorage.setItem('token', response.data.token);
        navigation.replace('Dashboard'); // Redirect to Dashboard
      } else {
        // Jika tidak ada token, berarti kredensial salah
        Alert.alert('Login failed', 'Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error.response || error.message || error);
  
      // Jika response error menyebutkan "Invalid credentials" atau kesalahan lain
      if (error.response && error.response.data) {
        if (error.response.data.message === 'Invalid password') {
          Alert.alert('Login failed', 'Password salah');
        } else {
          Alert.alert('Login failed', 'An error occurred during login');
        }
      } else {
        // Jika tidak ada response dari server
        Alert.alert('Login failed', 'An error occurred during login');
      }
    }
  };
  
  
  

  return (
    <ImageBackground
      source={{ uri: 'https://www.gajikuapp.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fgajiku-hero-image.d542e448.png&w=3840&q=75' }} // Background image URL
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Absensi Online</Text>

        <View style={styles.inputContainer}>
          <Icon name="account" size={24} color="#888" style={styles.icon} />
          <TextInput 
            placeholder="Email" 
            style={styles.input} 
            value={username}
            onChangeText={setUsername} 
          />
        </View>

  
        <View style={styles.inputContainer}>
          <Icon name="lock" size={24} color="#888" style={styles.icon} />
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry={!showPassword} 
            value={password}
            onChangeText={setPassword} 
          />
          <TouchableOpacity
            onPress={() => setShowPassword(prev => !prev)} 
            style={styles.iconButton}
          >
            <Icon
              name={showPassword ? "eye-off" : "eye"} 
              size={24}
              color="#888"
            />
          </TouchableOpacity>
        </View>

      
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Masuk</Text>
        </TouchableOpacity>

    
        <Text style={styles.footerText}>
          @{currentYear} PT. NUSA TECHNO INDONESIA
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  iconButton: {
    padding: 8,
  },
  button: {
    backgroundColor: '#0066cc',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText: {
    marginTop: 15,
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

export default Login;
