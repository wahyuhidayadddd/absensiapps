import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as faceapi from 'face-api.js';

const Scan = () => {
  const [hasCameraPermission, setCameraPermission] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [scanStatus, setScanStatus] = useState('Scan Face');
  const cameraRef = useRef(null); // Camera reference

  useEffect(() => {
    // Load face-api.js models
    const loadFaceAPIModels = async () => {
      await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
    };

    loadFaceAPIModels();
  }, []);

  useEffect(() => {
    // Request camera permission
    const requestPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(status === 'granted');
    };
    requestPermissions();
  }, []);

  const handleFaceDetection = async () => {
    if (cameraRef.current) {
      const frame = await cameraRef.current.takePictureAsync({
        base64: true,
      });

      const image = await faceapi.bufferToImage(frame.base64);
      const detections = await faceapi
        .detectAllFaces(image)
        .withFaceLandmarks()
        .withFaceDescriptors();

      if (detections.length > 0) {
        setScanStatus('Face Detected');
        Alert.alert('Success', 'Face Detected for Attendance');
      } else {
        setScanStatus('No Face Detected');
        Alert.alert('Error', 'No face detected. Please try again.');
      }
    }
  };

  if (hasCameraPermission === null) {
    return <Text>Loading...</Text>;
  }

  if (!hasCameraPermission) {
    return (
      <View style={styles.container}>
        <Text>Akses kamera diperlukan untuk menggunakan aplikasi ini.</Text>
      </View>
    );
  }

  const handleCameraReady = () => {
    setCameraReady(true);
  };

  return (
    <View style={styles.container}>
      {cameraReady ? (
        <Camera
          style={styles.camera}
          type={Camera.Constants.Type.front} // Front camera for face detection
          ref={cameraRef}
          onCameraReady={handleCameraReady}
        >
          <View style={styles.overlay}>
            <Text style={styles.instruction}>Arahkan wajah Anda ke kamera untuk absensi.</Text>
            <Button title="Scan Face" onPress={handleFaceDetection} />
            <Text style={styles.status}>{scanStatus}</Text>
          </View>
        </Camera>
      ) : (
        <Text>Menunggu kamera siap...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instruction: {
    fontSize: 18,
    color: 'white',
    marginBottom: 20,
  },
  status: {
    fontSize: 18,
    color: 'white',
    marginTop: 20,
  },
});

export default Scan;
