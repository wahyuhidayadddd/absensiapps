import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, ScrollView, Modal, TouchableOpacity } from 'react-native';

const approvalData = [
    { id: '1', name: 'Ari Purniawan', jobTitle: 'Director - Marketing', leaveType: 'Annual Leave', startDate: '03/05/2021', endDate: '03/05/2021', status: 'approved', profilePicture: 'https://media-sin6-1.cdn.whatsapp.net/v/t61.24694-24/418056953_1223417678762040_5347699442621558164_n.jpg?stp=dst-jpg_tt6&ccb=11-4&oh=01_Q5AaIJWJkUmPvJNrIbaOYUVsI6OR5MsajUwxMqLQWxq5jd8f&oe=67629CAB&_nc_sid=5e03e0&_nc_cat=109' },
    { id: '2', name: 'Asrie Koestantini', jobTitle: 'Manager - PPIC', leaveType: 'Annual Leave', startDate: '04/05/2021', endDate: '06/05/2021', status: 'approved', profilePicture: 'https://media-sin6-1.cdn.whatsapp.net/v/t61.24694-24/418056953_1223417678762040_5347699442621558164_n.jpg?stp=dst-jpg_tt6&ccb=11-4&oh=01_Q5AaIJWJkUmPvJNrIbaOYUVsI6OR5MsajUwxMqLQWxq5jd8f&oe=67629CAB&_nc_sid=5e03e0&_nc_cat=109' },
    { id: '3', name: 'Cissi Gustianti', jobTitle: 'No Position', leaveType: 'Annual Leave', startDate: '29/04/2021', endDate: '29/04/2021', status: 'rejected', profilePicture: 'https://media-sin6-1.cdn.whatsapp.net/v/t61.24694-24/418056953_1223417678762040_5347699442621558164_n.jpg?stp=dst-jpg_tt6&ccb=11-4&oh=01_Q5AaIJWJkUmPvJNrIbaOYUVsI6OR5MsajUwxMqLQWxq5jd8f&oe=67629CAB&_nc_sid=5e03e0&_nc_cat=109' },
    { id: '4', name: 'Alexander John Doe', jobTitle: 'Sales - Marketing', leaveType: 'Annual Leave', startDate: '22/04/2021', endDate: '22/04/2021', status: 'waiting', profilePicture: 'https://media-sin6-1.cdn.whatsapp.net/v/t61.24694-24/418056953_1223417678762040_5347699442621558164_n.jpg?stp=dst-jpg_tt6&ccb=11-4&oh=01_Q5AaIJWJkUmPvJNrIbaOYUVsI6OR5MsajUwxMqLQWxq5jd8f&oe=67629CAB&_nc_sid=5e03e0&_nc_cat=109' },
    { id: '5', name: 'Alexander John Doe', jobTitle: 'Sales - Marketing', leaveType: 'Annual Leave', startDate: '22/04/2021', endDate: '22/04/2021', status: 'waiting', profilePicture: 'https://media-sin6-1.cdn.whatsapp.net/v/t61.24694-24/418056953_1223417678762040_5347699442621558164_n.jpg?stp=dst-jpg_tt6&ccb=11-4&oh=01_Q5AaIJWJkUmPvJNrIbaOYUVsI6OR5MsajUwxMqLQWxq5jd8f&oe=67629CAB&_nc_sid=5e03e0&_nc_cat=109' },
    { id: '6', name: 'Alexander John Doe', jobTitle: 'Sales - Marketing', leaveType: 'Annual Leave', startDate: '22/04/2021', endDate: '22/04/2021', status: 'waiting', profilePicture: 'https://media-sin6-1.cdn.whatsapp.net/v/t61.24694-24/418056953_1223417678762040_5347699442621558164_n.jpg?stp=dst-jpg_tt6&ccb=11-4&oh=01_Q5AaIJWJkUmPvJNrIbaOYUVsI6OR5MsajUwxMqLQWxq5jd8f&oe=67629CAB&_nc_sid=5e03e0&_nc_cat=109' },
    { id: '7', name: 'Alexander John Doe', jobTitle: 'Sales - Marketing', leaveType: 'Annual Leave', startDate: '22/04/2021', endDate: '22/04/2021', status: 'waiting', profilePicture: 'https://media-sin6-1.cdn.whatsapp.net/v/t61.24694-24/418056953_1223417678762040_5347699442621558164_n.jpg?stp=dst-jpg_tt6&ccb=11-4&oh=01_Q5AaIJWJkUmPvJNrIbaOYUVsI6OR5MsajUwxMqLQWxq5jd8f&oe=67629CAB&_nc_sid=5e03e0&_nc_cat=109' },
    { id: '8', name: 'Alexander John Doe', jobTitle: 'Sales - Marketing', leaveType: 'Annual Leave', startDate: '22/04/2021', endDate: '22/04/2021', status: 'waiting', profilePicture: 'https://media-sin6-1.cdn.whatsapp.net/v/t61.24694-24/418056953_1223417678762040_5347699442621558164_n.jpg?stp=dst-jpg_tt6&ccb=11-4&oh=01_Q5AaIJWJkUmPvJNrIbaOYUVsI6OR5MsajUwxMqLQWxq5jd8f&oe=67629CAB&_nc_sid=5e03e0&_nc_cat=109' }
];

const Approval = () => {
  const [filterStatus, setFilterStatus] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleFilterChange = (text) => {
    setFilterStatus(text);
  };

  const filteredData = approvalData.filter(item =>
    !filterStatus || item.status.toLowerCase().includes(filterStatus.toLowerCase())
  );

  const handleItemPress = (item) => {
    if (item.status === 'approved') {
      setSelectedItem(item);
      setModalVisible(true);
    }
  };

  const renderRequestItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemPress(item)}>
      <View style={styles.requestCard}>
        <View style={styles.row}>
          <Image source={{ uri: item.profilePicture }} style={styles.profilePicture} />
          <View style={styles.requestInfo}>
            <Text style={styles.requestText}>{item.name}</Text>
            <Text style={styles.jobTitleText}>{item.jobTitle}</Text>
          </View>
        </View>
        <Text style={styles.leaveType}>{item.leaveType}</Text>
        <View style={styles.dateRow}>
          <Text style={styles.dateText}>From: {item.startDate} - To: {item.endDate}</Text>
          <Text style={styles.statusText(item.status)}>{item.status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Leave Approvals</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Employee"
        onChangeText={handleFilterChange}
        value={filterStatus}
      />
      <FlatList
        data={filteredData}
        renderItem={renderRequestItem}
        keyExtractor={(item) => item.id}
        style={styles.requestList}
      />
      
      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            {selectedItem && (
              <>
                <Text style={styles.modalTitle}>Approval Details</Text>
                <Text style={styles.modalText}>Name: {selectedItem.name}</Text>
                <Text style={styles.modalText}>Job Title: {selectedItem.jobTitle}</Text>
                <Text style={styles.modalText}>Leave Type: {selectedItem.leaveType}</Text>
                <Text style={styles.modalText}>From: {selectedItem.startDate} - To: {selectedItem.endDate}</Text>
                <Text style={styles.modalText}>Status: {selectedItem.status}</Text>
                
                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  searchInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  requestList: {
    marginTop: 10,
  },
  requestCard: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  requestInfo: {
    flex: 1,
  },
  requestText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  jobTitleText: {
    fontSize: 14,
    color: '#777',
  },
  leaveType: {
    fontSize: 15,
    color: '#333',
    fontWeight: 'bold',
    marginTop: 10, 
  },
  dateRow: {
    marginTop: 10,
  },
  dateText: {
    fontSize: 14,
    color: '#555',
  },
  statusText: (status) => ({
    fontSize: 14,
    color: status === 'approved' ? '#4CAF50' : status === 'waiting' ? '#FFB84D' : '#F44336',
    fontWeight: 'bold',
    marginTop: 5,
  }),

  // Modal styles
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    maxWidth: 400,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Approval;
