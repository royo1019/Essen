import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import { supabase } from './lib/supabase';

const MyRequestsPage = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
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

        // Fetch all pending requests created by the user
        const { data: userRequests, error: userError } = await supabase
          .from('requests')
          .select('*')
          .eq('user_email', userEmail)
          .neq('status', 'accepted'); // Fetch only non-accepted (pending) requests

        if (userError) {
          console.error('Error fetching pending requests:', userError);
          return;
        }

        setPendingRequests(userRequests || []);
      }
    };

    fetchRequestsData();
  }, []);

  // Render each request card
  const renderRequest = ({ item }) => (
    <View style={styles.requestCard}>
      <Text style={styles.itemText}>Request item: {item.item_name}</Text>
      <Text style={styles.itemTex}>Duration: {item.borrow_period}</Text>
      <Text style={styles.statusText}>Status: {item.status}</Text>
    </View>
  );

  return (
    <FlatList
      data={pendingRequests}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderRequest}
      contentContainerStyle={styles.container}
      ListHeaderComponent={
        <View style={styles.header}>
          <TouchableOpacity style={styles.backContainer} onPress={() => router.push("/(tabs)/profile")}>
            <AntDesign name="left" size={24} color="black" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>My Requests</Text>
          <Text style={styles.details}>This page displays all the requests you've made and their status (accepted or pending).</Text>
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
  details:
  {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#34495E',
    marginTop: 40,
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
    marginHorizontal: 20,
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
    marginTop: '2%',
    fontStyle: 'italic',
  },
  statusText: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 4,
    fontWeight: '50',
  },
  header: {
    marginBottom: 20,
  },
});

export default MyRequestsPage;
