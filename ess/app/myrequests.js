import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, FlatList } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import { supabase } from './lib/supabase';

const MyRequestsPage = () => {
  const [combinedData, setCombinedData] = useState([]);
  const router = useRouter(); // Get the router object

  useEffect(() => {
    const fetchRequestsData = async () => {
      // Fetch the current user's information
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser(); // Changed to getUser() to directly fetch the user details

      if (error) {
        console.error('Error fetching user session:', error);
        return;
      }

      if (user) {
        const userEmail = user.email; // Get the email of the currently logged-in user

        // Fetch all requests created by the user
        const { data: userRequests, error: userError } = await supabase
          .from('requests')
          .select('*')
          .eq('user_email', userEmail);

        // Fetch all accepted requests from other users
        const { data: acceptedRequests, error: acceptedError } = await supabase
          .from('requests')
          .select('*')
          .eq('status', 'accepted')
          .neq('user_email', userEmail); // Requests from other users

        if (userError || acceptedError) {
          console.error('Error fetching requests:', userError || acceptedError);
          return;
        }

        // Process and format the data
        const formattedData = [
          { title: 'Accepted Requests', data: acceptedRequests || [] },
          { title: 'Pending Requests', data: userRequests || [] },
        ];

        setCombinedData(formattedData);
      }
    };

    fetchRequestsData();
  }, []);

  // Render each section
  const renderSection = ({ item }) => (
    <View style={styles.requestBoxesSection}>
      <Text style={styles.subTitle}>{item.title}</Text>
      {item.data.map((request) => (
        <View key={request.id} style={styles.requestCard}>
          <Text style={styles.itemText}>Request item: {request.item_name}</Text>
          <Text style={styles.itemTex}>Duration: {request.borrow_period}</Text>
          <Text style={styles.statusText}>
            {item.title === 'Accepted Requests'
              ? `Will be returned in ${request.borrow_period} days`
              : `Status: ${request.status}`}
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
          <Text>This page displays all your requests and their status, including pending and accepted ones.</Text>
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
    marginTop: 40,
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
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  backText: {
    marginLeft: 10,
    color: 'black',
    fontWeight: '700',
    fontSize: 16,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#34495E',
  },
  itemTex: {
    fontSize: 14,
    fontWeight: '50',
    color: '#34495E',
    marginTop:'2%',
    fontStyle:'italic'
  },
  statusText: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 4,
    fontWeight:'50'
  },
  header: {
    marginBottom: 20,
  },
});

export default MyRequestsPage;
