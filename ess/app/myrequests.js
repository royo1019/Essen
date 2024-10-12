import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, FlatList } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';

const data = {
  acceptedRequests: [
    { id: '1', item: 'Book - React Native Guide', daysToReturn: 3 },
    { id: '2', item: 'Headphones', daysToReturn: 5 },
  ],
  requestBoxes: [
    { id: '1', item: 'Laptop Charger', status: 'Pending' },
    { id: '2', item: 'Yoga Mat', status: 'Accepted - Please return it within 2 days' },
  ],
};

const MyRequestsPage = () => {
  const router = useRouter(); // Get the router object

  // Combine accepted requests and request boxes into a single array for rendering
  const combinedData = [
    { title: 'Accepted Requests', data: data.acceptedRequests },
    { title: 'Request Boxes', data: data.requestBoxes },
  ];

  // Render each section
  const renderSection = ({ item }) => (
    <View style={styles.requestBoxesSection}>
      <Text style={styles.subTitle}>{item.title}</Text>
      {item.data.map((request) => (
        <View key={request.id} style={styles.requestCard}>
          <Text style={styles.itemText}>{request.item}</Text>
          <Text style={styles.statusText}>
            {item.title === 'Accepted Requests' ?
              `Will be returned in ${request.daysToReturn} days` :
              request.status}
          </Text>
        </View>
      ))}
    </View>
  );

  return (
    <FlatList
      data={combinedData}
      keyExtractor={(item) => item.title}
      renderItem={renderSection}
      contentContainerStyle={styles.container}
      ListHeaderComponent={
        <View style={styles.header}>
          <TouchableOpacity style={styles.backContainer} onPress={() => router.push("/(tabs)/profile")}>
            <AntDesign name="left" size={24} color="black" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>My Requests</Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    flexGrow: 1,
    backgroundColor: '#F0F4F8',
    padding: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#34495E',
    marginTop: 40, // Adjusted for visibility
  },
  requestBoxesSection: {
    marginBottom: 24,
    paddingLeft: 20,
    paddingRight: 20,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#2C3E50',

  },
  requestCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,

  },
  backContainer: {
    flexDirection: 'row', // Align children in a row
    alignItems: 'center',  // Center align vertically
    position: 'absolute',
    top: 10, // Adjusted for visibility
    left: 10,
    zIndex: 1,
  },
  backText: {
    marginLeft: 10, // Add margin to space the text from the arrow
    color: "black",
    fontWeight: "700",
    fontSize: 16,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#34495E',
  },
  statusText: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 4,
  },
  header: {
    marginBottom: 20,
  },
});

export default MyRequestsPage;
