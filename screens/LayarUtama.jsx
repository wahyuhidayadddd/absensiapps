import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';

const LayarUtama = ({ navigation }) => {
  return (
    <Swiper loop={false} activeDotColor="#3B82F6">
      {/* Slide 1: Selamat Datang */}
      <View style={styles.slide}>
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => navigation.replace('Login')}
        >
          <Text style={styles.skipButtonText}>Lewati</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Aplikasi Absensi Online</Text>
        <Image source={require('../assets/pengajuancuti.png')} style={styles.icon} />
        <Text style={styles.description}>
          Nusa Techno adalah aplikasi absensi online karyawan yang bisa dilakukan melalui handphone dari mana saja dan kapan saja.
        </Text>
      </View>

      {/* Slide 2: Presensi */}
      <View style={styles.slide}>
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => navigation.replace('Login')}
        >
          <Text style={styles.skipButtonText}>Lewati</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Presensi Kapan dan Dimana Saja?</Text>
        <Image source={require('../assets/cocokwajah.png')} style={styles.icon} />
        <Text style={styles.description}>
          Lakukan Presensi Kerja secara mudah hanya satu klik dengan mencocokan Wajah dan lokasi presensi Anda
        </Text>
      </View>

      {/* Slide 3: Pengajuan Izin dan Cuti */}
      <View style={styles.slide}>
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => navigation.replace('Login')}
        >
          <Text style={styles.skipButtonText}>Lewati</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Pengajuan Izin dan Cuti</Text>
        <Image source={require('../assets/meeting.png')} style={styles.icon} />
        <Text style={styles.description}>
          Lakukan Pengajuan izin maupun cuti dan pantau persetujuan ataupun penolakan melalui Notifikasi
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.replace('Login')}
        >
          <Text style={styles.buttonText}>Mulai</Text>
        </TouchableOpacity>
      </View>
    </Swiper>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  skipButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#D1D5DB', // Light grey background for the skip button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  skipButtonText: {
    color: '#1E3A8A',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 20,
    textAlign: 'center',
  },
  icon: {
    width: 300,
    height: 190,
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    color: '#555555',
    textAlign: 'center',
    marginHorizontal: 20,
    lineHeight: 25,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LayarUtama;
