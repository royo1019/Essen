import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';

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
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>My Requests</Text>

      <View style={styles.acceptedRequestsSection}>
        <Text style={styles.subTitle}>Accepted Requests</Text>
        <FlatList
          data={data.acceptedRequests}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.requestCard}>
              <Text style={styles.itemText}>{item.item}</Text>
              <Text style={styles.statusText}>Will be returned in {item.daysToReturn} days</Text>
            </View>
          )}
        />
      </View>

      <View style={styles.requestBoxesSection}>
        <Text style={styles.subTitle}>Request Boxes</Text>
        <FlatList
          data={data.requestBoxes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.requestCard}>
              <Text style={styles.itemText}>{item.item}</Text>
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    padding: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#34495E',
    marginTop:'14%'
  },
  acceptedRequestsSection: {
    marginBottom: 24,
  },
  requestBoxesSection: {
    marginBottom: 24,
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
});

export default MyRequestsPage;
