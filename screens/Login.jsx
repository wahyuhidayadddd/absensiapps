import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false); // State to control password visibility

  return (
    <ImageBackground
      source={{ uri: 'https://www.gajikuapp.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fgajiku-hero-image.d542e448.png&w=3840&q=75' }} // Background image URL
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Selamat Datang endang kancut</Text>

        <View style={styles.inputContainer}>
          <Icon name="account" size={24} color="#888" style={styles.icon} />
          <TextInput placeholder="Nama Pengguna" style={styles.input} />
        </View>

        {/* Password input */}
        <View style={styles.inputContainer}>
          <Icon name="lock" size={24} color="#888" style={styles.icon} />
          <TextInput
            placeholder="Kata Sandi"
            style={styles.input}
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

    
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Masuk</Text>
        </TouchableOpacity>

   
        <Text style={styles.footerText}>
          Syarat dan Ketentuan dapat Dilihat Disini
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
