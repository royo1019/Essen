import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRouter } from 'expo-router';
import { supabase } from '../lib/supabase';

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      // Check if user is authenticated
      if (userError || !user) {
        console.error('Error fetching user:', userError);
        router.push('../auth/login');
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
      } else {
        const profile = data;
        profile.email = user.email; // Assign the email from the user object
        setUserProfile(profile);
      }
      setLoading(false);
    };

    fetchUserProfile();
  }, [router]);

  if (loading) {
    return <Text style={styles.loading}>Loading...</Text>;
  }

  if (!userProfile) {
    return <Text>No profile found</Text>;
  }

  // Function to handle button press for "My Requests"
  const handleMyRequestsPress = () => {
    router.push('/myrequests');
  };

  const handleLogOut = () => {
    router.push('../auth/login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Hello {userProfile.full_name || 'User'}!</Text>
        <FontAwesome6 name="circle-user" size={37} color="black" />
      </View>
      <Text style={styles.inLabel}>Welcome back</Text>
      <View style={styles.card}>
        <Text style={styles.subheading}>Personal Details</Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Name: </Text>
          {userProfile.full_name || 'N/A'}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Email: </Text>
          {userProfile.email || 'N/A'}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Phone Number: </Text>
          {userProfile.phone_number || '0'}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Block: </Text>
          {userProfile.block || '0'}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Room Number: </Text>
          {userProfile.room_number || '0'}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.subheading}>Statistics</Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Requests Accepted: </Text>
          {userProfile.requests_accepted || '0'}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Points: </Text>
          {userProfile.points || '0'}
        </Text>
      </View>

      <TouchableOpacity style={styles.requestButton} onPress={handleMyRequestsPress}>
        <Text style={styles.requestButtonText}>My Requests</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logOutButton}
        onPress={handleLogOut}
      >
        <Text style={styles.logouttext}>Log Out</Text>
      </TouchableOpacity>

      <Text style={styles.lab}>Borrow Freely, Return Kindly!</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 120,
    padding: 20,
    backgroundColor: '#e3f2f8',
    color: 'black',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: '12%',
    marginBottom: '10%',
    textAlign: 'center',
    color: 'black',
    paddingLeft: 20,
    paddingRight: 20,
  },
  logOutButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 80,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  logouttext: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },
  loading: {
    fontWeight: '500',
    position: 'absolute',
    top: 450,
    left: 180,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  subheading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
  },
  requestButton: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  requestButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  lab: {
    color: 'black',
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: '5%',
  },
  infoLabel: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
  },
  inLabel: {
    fontSize: 18,
    marginBottom: '5%',
    color: 'black',
    fontStyle: 'italic',
    paddingLeft: 20,
    paddingRight: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: '5%',
  },
  label: {
    fontWeight: 'bold',
  },
});

export default ProfilePage;
