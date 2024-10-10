import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const ProfilePage = () => {
  // Sample data - replace with your state or props as needed
  const userProfile = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    requestsAccepted: 15,
    points: 120,
    contactNo:9902012344,
    block:'A',
    roomNo:703,
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Your Profile</Text>
      
      <View style={styles.infoContainer}>
     
        <Text style={styles.infoLabel}>Hello {userProfile.name}!</Text>
        <FontAwesome6 name="circle-user" size={37} color="white" />

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
      <Text style={styles.lab}>Borrow Freely, Return Kindly! </Text>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor:'black',
    color:'white'
  },

  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: '12%',
    marginBottom:'10%',
    textAlign: 'center',
    color:'white'
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
  },
  subheading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoContainer:{
    flexDirection:'row',
    justifyContent: 'space-between',
    


  },
  lab:{
color:'white',
fontSize: 22,
textAlign: 'center',
fontWeight:'bold',
marginBottom:'5%'
  },
  infoLabel:{
    color:'white',
    fontSize: 30,
    fontWeight: 'bold',
    
  },
  inLabel:{
    fontSize:18,
marginBottom:'5%',
color:'white',
fontStyle:'italic'
  },
  text: {
    fontSize: 16,
    marginBottom:'5%',
  },
  label: {
    fontWeight: 'bold',
  },
});

export default ProfilePage;
