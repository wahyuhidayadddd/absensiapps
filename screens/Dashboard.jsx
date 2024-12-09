import { useNavigation } from '@react-navigation/native'; 
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, FlatList, Modal } from 'react-native'; 
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
     
        const token = await AsyncStorage.getItem('token');

        if (!token) {
          console.log('No token found. Please log in again.');
          return;
        }

        console.log("Fetching user data...");
        
        
        const response = await fetch('http://192.168.100.39:8000/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json',
          },
        });

     l
        if (!response.ok) {
          throw new Error('Error fetching profile data');
        }

        const data = await response.json();
        console.log("Response received: ", data);

        
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  

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
  {userData ? (
    <>
      <Text style={styles.userName}>{userData.name}</Text>
      <Text style={styles.userRole}>{userData.role}</Text>
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

      {/* Modal for Profile */}
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
  icon: { marginRight: 10 },
  newsSection: { padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  newsList: { gap: 15 },
  newsCard: { borderRadius: 10, overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 3, width: 250, marginRight: 15 },
  newsImage: { width: '100%', height: 150, resizeMode: 'cover' },
  newsText: { padding: 15, fontSize: 14, fontWeight: 'bold', color: '#555', textAlign: 'center' },
  menuContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', paddingTop: 20 },
  menuItem: { alignItems: 'center', marginBottom: 20, width: '30%' },
  menuIcon: { backgroundColor: '#3B82F6', padding: 10, borderRadius: 30, marginBottom: 10, alignItems: 'center', justifyContent: 'center' },
  iconImage: { width: 30, height: 30, resizeMode: 'contain' },
  menuText: { fontSize: 14, color: '#333' },
  footerContainer: { marginTop: 30, marginBottom: 10, alignItems: 'center' },
  footer: { fontSize: 12, color: '#888' },
  modalContainer: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#fff', borderRadius: 15, padding: 20, alignItems: 'center', width: '90%', elevation: 5 },
  closeIcon: { position: 'absolute', top: 10, right: 10 },
  modalImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 15, borderWidth: 2, borderColor: '#4CAF50' },
  modalName: { fontSize: 20, fontWeight: 'bold', marginBottom: 5 },
  modalRole: { fontSize: 16, color: '#4CAF50', marginBottom: 15 },
  modalDetails: { marginBottom: 15 },
  modalDetail: { fontSize: 14, color: '#333', marginBottom: 5 },
  closeButton: { backgroundColor: '#4CAF50', padding: 10, borderRadius: 5 },
  closeButtonText: { color: '#fff', fontSize: 16 },
});

export default Dashboard;
