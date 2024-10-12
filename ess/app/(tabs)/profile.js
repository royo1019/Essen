import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRouter } from 'expo-router';


const ProfilePage = () => {
  // Sample data - replace with your state or props as needed
  const userProfile = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    requestsAccepted: 15,
    points: 120,
    contactNo: 9902012344,
    block: 'A',
    roomNo: 703,
  };
  const router = useRouter()


  // Function to handle button press
  const handleMyRequestsPress = () => {
    // Implement your navigation logic here, for example:
    console.log("My Requests button pressed");
    // If you're using React Navigation, it could be:
    // navigation.navigate('MyRequests'); // Change 'MyRequests' to your actual screen name
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Hello {userProfile.name}!</Text>
        <FontAwesome6 name="circle-user" size={37} color="black" />
      </View>
      <Text style={styles.inLabel}>Welcome back</Text>
      <View style={styles.card}>
        <Text style={styles.subheading}>Personal Details</Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Name: </Text>
          {userProfile.name}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Email: </Text>
          {userProfile.email}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Phone Number: </Text>
          {userProfile.contactNo}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Block: </Text>
          {userProfile.block}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Room Number: </Text>
          {userProfile.roomNo}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.subheading}>Statistics</Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Requests Accepted: </Text>
          {userProfile.requestsAccepted}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Points: </Text>
          {userProfile.points}
        </Text>
      </View>

      <TouchableOpacity style={styles.requestButton}
        onPress={() => router.push("/myrequests")}>
        <Text style={styles.requestButtonText}>My Requests</Text>
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
    color: '#000', // Change text color if needed
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
