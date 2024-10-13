import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useGlobalSearchParams, useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import { supabase } from './lib/supabase';



const RequestDetail = () => {
    const { request } = useGlobalSearchParams(); // Get the request parameter from the query
    const parsedRequest = request ? JSON.parse(request) : null; // Parse the request if available
    const router = useRouter(); // Get the router object

    if (!parsedRequest) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Request not found.</Text>
            </View>
        );
    }

    const handleAccept = async () => {
        try {
            // Update the request status in the Supabase database
            const { data, error } = await supabase
                .from('requests') // Replace 'requests' with your table name
                .update({ status: 'accepted' }) // Set the status to 'accepted'
                .eq('id', parsedRequest.id); // Update the request with the matching ID

            if (error) {
                throw error;
            }

            // Show success message
            Alert.alert("Success", "You have accepted the request.");
        } catch (error) {
            // Show error message if update fails
            Alert.alert("Error", "Failed to accept the request. Please try again.");
            console.log(error);
        }
    };

    const handleDismiss = () => {
        // Handle dismissal logic here
        router.replace('./(tabs)/othersrequests');
        console.log("Request Dismissed");
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backContainer} onPress={() => router.replace("/(tabs)/othersrequests")}>
                <AntDesign name="left" size={24} color="black" />
                <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>

            <Text style={styles.headerText}>Scheduled Borrow</Text>
            <View style={styles.imageContainer}>
                {parsedRequest.image?.uri && (
                    <Image source={{ uri: parsedRequest.image.uri }} style={styles.productImage} />
                )}

                <View style={styles.detailsContainer}>
                    <Text style={styles.itemTitle}>{parsedRequest.item_name}</Text>
                    <Text style={styles.detailText}>Requested by: {parsedRequest.full_name}</Text>
                    <Text style={styles.detailText}>Time Period: {parsedRequest.borrow_period}</Text>
                    <Text style={styles.detailText}>Request Time: {parsedRequest.created_at}</Text>
                    <Text style={styles.detailText}>Additional Details: {parsedRequest.additional_details}</Text>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.acceptedButton} onPress={handleAccept}>
                            <Text style={styles.buttonText}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.dismissButton} onPress={handleDismiss}>
                            <Text style={styles.buttonText}>Dismiss</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 120,
        backgroundColor: '#e3f2f8',
        alignItems: 'center',
    },
    imageContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        shadowColor: '#626262',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        zIndex: 1,
    },
    itemTitle: {
        marginTop: 50,
        marginBottom: 20,
        fontSize: 33,
        fontWeight: "700",
        alignSelf: "center",
    },
    detailsContainer: {
        position: 'absolute',
        top: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 10,
        height: 570,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        width: '90%',
        alignItems: 'flex-start',
    },
    detailText: {
        fontSize: 18,
        marginVertical: 10,
        color: '#333',
        marginHorizontal: 10,
        fontWeight: '600',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
    },
    headerText: {
        fontWeight: '600',
        alignItems: 'center',
        fontSize: 23,
    },
    buttonContainer: {
        flexDirection: 'row', // Align buttons in a row
        justifyContent: 'space-between', // Space out buttons
        marginTop: 30, // Add some space above buttons
        width: '100%', // Make buttons take full width
    },
    acceptedButton: {
        backgroundColor: '#5ecb3c', // Button color for accepted
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center', // Center text in the button
        flex: 1, // Take equal space for both buttons
        marginRight: 10, // Space between buttons
    },
    dismissButton: {
        backgroundColor: '#7f7f7f', // Button color for dismiss
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center', // Center text in the button
        flex: 1, // Take equal space for both buttons
        marginLeft: 10, // Space between buttons
    },
    buttonText: {
        color: 'white', // Button text color
        fontWeight: '700',
        fontSize: 16,
    },
    backContainer: {
        flexDirection: 'row', // Align children in a row
        alignItems: 'center',  // Center align vertically
        position: 'absolute',
        top: 70,
        left: 10,
        zIndex: 1,
    },
    backText: {
        marginLeft: 10, // Add margin to space the text from the arrow
        color: "black",
        fontWeight: "700",
        fontSize: 16,
    },
});

export default RequestDetail;
