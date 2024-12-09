import { useNavigation } from '@react-navigation/native'; 
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, FlatList, Modal } from 'react-native'; 
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../src/features/authSlice'; 

const newsData = [
  {
    id: '1',
    title: 'EVENT DEMO DAY EX CUBE ME CIP PT 25 NOVEMBER 2022',
    image: 'https://triaspolitika.id/wp-content/uploads/2024/12/Screenshot_20241206_163727_WhatsApp.jpg',
  },
  {
    id: '2',
    title: 'Perusahaan Bimbel Online Bangkrut Sebab AI',
    image: 'https://www.rakyatsulbar.com/wp-content/uploads/2024/11/image-70.jpeg',
  },
  {
    id: '3',
    title: 'KOLABORASI TEKNOLOGI UNTUK TRANSPORTASI MASA DEPAN',
    image: 'https://indoaviation.asia/wp-content/uploads/2022/11/IMG-20221126-WA0004.jpg',
  },
  {
    id: '4',
    title: 'Pelatihan Internet of Things (IoT) Untuk Guru SMK Negeri 7 Pekanbaru menggunakan NodeMCU',
    image: 'https://jurnal.pcr.ac.id/publik/journals/9/submission_5905_5556_coverImage_en_US',
  },
];

const Dashboard = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const { token, user, loading, error } = useSelector(state => state.auth);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      dispatch(loginStart()); // Start loading

      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (!storedToken) {
          dispatch(loginFailure('No token found. Please log in again.'));
          return;
        }

        const response = await fetch('http://192.168.100.39:8000/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${storedToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Error fetching profile data');
        }

        const data = await response.json();
        dispatch(loginSuccess({ token: storedToken, user: data }));
      } catch (error) {
        dispatch(loginFailure(error.message));
      }
    };

    fetchUserData();
  }, [dispatch]);

  const handleMenuClick = (screenName) => {
    navigation.navigate(screenName); 
  };

  const renderNewsItem = ({ item }) => (
    <View style={styles.newsCard}>
      <Image style={styles.newsImage} source={{ uri: item.image }} />
      <Text style={styles.newsText}>{item.title}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.profileSection} onPress={() => navigation.navigate('EditProfile')}>
            <Image
              source={require('../assets/wahyu.jpeg')}
              style={styles.profileImage}
            />
            <View>
              {user ? (
                <>
                  <Text style={styles.userName}>{user.name}</Text>
                  <Text style={styles.userRole}>{user.role}</Text>
                </>
              ) : (
                <Text>Loading...</Text> 
              )}
            </View>
          </TouchableOpacity>
          <View style={styles.headerIcons}>
            <Icon name="notifications-none" size={24} color="#fff" style={styles.icon} />
            <Icon name="settings" size={24} color="#fff" />
          </View>
        </View>
      </View>

      <View style={styles.newsSection}>
        <Text style={styles.sectionTitle}>Berita PTR Terbaru</Text>
        <FlatList
          data={newsData}
          renderItem={renderNewsItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.newsList}
        />
      </View>

      <View style={styles.menuContainer}>
        {[ 
          { name: 'Approval', icon: require('../assets/icons/approve.png'), screen: 'Approval' },
          { name: 'Absensi', icon: require('../assets/icons/immigration.png'), screen: 'Absensi' },
          { name: 'Izin & Cuti', icon: require('../assets/icons/leave.png'), screen: 'Leave' },
          { name: 'Lembur', icon: require('../assets/icons/moon.png'), screen: 'Overtime' },
          { name: 'Berita PTR', icon: require('../assets/icons/broadcasting.png'), screen: 'News' },
          { name: 'Pengajuan', icon: require('../assets/icons/payroll.png'), screen: 'Pengajuan' }
        ].map((menu, index) => (
          <TouchableOpacity key={index} style={styles.menuItem} onPress={() => handleMenuClick(menu.screen)}>
            <View style={styles.menuIcon}>
              <Image source={menu.icon} style={styles.iconImage} />
            </View>
            <Text style={styles.menuText}>{menu.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footerContainer}>
        <Text style={styles.footer}>Copyright © PT Nusa Techno Indonesia 2024</Text>
      </View>

     
      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeIcon} onPress={() => setModalVisible(false)}>
              <Icon name="close" size={24} color="#333" />
            </TouchableOpacity>
            <Image source={require('../assets/wahyu.jpeg')} style={styles.modalImage} />
            <Text style={styles.modalName}>Wahyu Hidayat</Text>
            <Text style={styles.modalRole}>Founder Nusa Techno</Text>
            <View style={styles.modalDetails}>
              <Text style={styles.modalDetail}>
                <Icon name="email" size={16} color="#4CAF50" /> Email: wahyu.hidayat@nusatechno.com
              </Text>
              <Text style={styles.modalDetail}>
                <Icon name="phone" size={16} color="#4CAF50" /> Telepon: +62 812-3456-7890
              </Text>
              <Text style={styles.modalDetail}>
                <Icon name="location-on" size={16} color="#4CAF50" /> Alamat: Jl. Merdeka No. 123, Pekanbaru
              </Text>
              <Text style={styles.modalDetail}>
                <Icon name="business" size={16} color="#4CAF50" /> Divisi: Pengembangan Teknologi
              </Text>
              <Text style={styles.modalDetail}>
                <Icon name="badge" size={16} color="#4CAF50" /> NIP: 123456789
              </Text>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  header: { backgroundColor: '#25a0ab', paddingVertical: 30, paddingHorizontal: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  headerContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  profileSection: { flexDirection: 'row', alignItems: 'center' },
  profileImage: { width: 50, height: 50, borderRadius: 25, marginRight: 10, backgroundColor: '#fff' },
  userName: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  userRole: { color: '#fff', fontSize: 14 },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  icon: { marginRight: 15 },
  newsSection: { marginTop: 20, paddingHorizontal: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  newsList: { marginTop: 10 },
  newsCard: { marginRight: 15, backgroundColor: '#fff', borderRadius: 10, padding: 10, width: 250 },
  newsImage: { width: '100%', height: 150, borderRadius: 8 },
  newsText: { marginTop: 10, fontSize: 14, fontWeight: 'bold', color: '#333' },
  menuContainer: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 20, paddingHorizontal: 20, justifyContent: 'space-between', },
  menuItem: {  width: '30%', marginBottom: 20, backgroundColor: '#fff', padding: 15, borderRadius: 10, alignItems: 'center' },
  menuIcon: { backgroundColor: '#d1d1d1', borderRadius: 20, padding: 15 },
  iconImage: { width: 30, height: 30 },
  menuText: { marginTop: 10, fontSize: 14, color: '#333' },
  footerContainer: { alignItems: 'center', marginTop: 20, paddingBottom: 20 },
  footer: { fontSize: 12, color: '#666' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: '#fff', padding: 20, width: '80%', borderRadius: 15 },
  closeIcon: { position: 'absolute', top: 10, right: 10 },
  modalImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 15, alignSelf: 'center' },
  modalName: { fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
  modalRole: { fontSize: 14, textAlign: 'center', color: '#888' },
  modalDetails: { marginTop: 15 },
  modalDetail: { fontSize: 14, marginBottom: 10, color: '#333' },
  closeButton: { marginTop: 20, backgroundColor: '#25a0ab', padding: 10, borderRadius: 5 },
  closeButtonText: { color: '#fff', textAlign: 'center', fontSize: 16 },
});

export default Dashboard;
