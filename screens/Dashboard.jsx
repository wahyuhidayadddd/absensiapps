import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Dashboard = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Button
        title="Manajemen Siswa"
        onPress={() => navigation.navigate('StudentManagement')}
      />
      <Button
        title="Manajemen Guru"
        onPress={() => navigation.navigate('TeacherManagement')}
      />
      <Button
        title="Absensi"
        onPress={() => navigation.navigate('Attendance')}
      />
      <Button
        title="Jadwal Pelajaran"
        onPress={() => navigation.navigate('Schedule')}
      />
      <Button
        title="Pengumuman"
        onPress={() => navigation.navigate('Announcement')}
      />
      <Button
        title="Laporan"
        onPress={() => navigation.navigate('Report')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
});

export default Dashboard;
