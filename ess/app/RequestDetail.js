import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useGlobalSearchParams, useRouter } from 'expo-router'; // Import useRouter
import AntDesign from '@expo/vector-icons/AntDesign';

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

    return (
        <View style={styles.container}>
            {/* Back Button Section */}
            <TouchableOpacity style={styles.backContainer} onPress={() => router.push("/(tabs)/othersrequests")}>
                <AntDesign name="left" size={24} color="black" />
                <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>

            <Text style={styles.headerText}>Scheduled Borrow</Text>
            <Text style={styles.subHeaderText}>Requested on 15 May, 2024</Text>
            <View style={styles.imageContainer}>
                <Image source={{ uri: parsedRequest.image.uri }} style={styles.productImage} />
                <View style={styles.detailsContainer}>
                    <Text style={styles.itemTitle}>{parsedRequest.title}</Text>
                    <Text style={styles.itemBorrower}>Requested by {parsedRequest.borrower}</Text>
                    <Text style={styles.detailText}>Time Period: {parsedRequest.timePeriod}</Text>
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
        fontSize: 33,
        fontWeight: "700",
        alignSelf: "center",
    },
    itemBorrower: {
        marginTop: 5,
        alignSelf: "center",
        fontSize: 15,
        fontWeight: "500",
        color: "#737373",
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
        marginVertical: 5,
        color: '#333',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
    },
    headerText: {
        fontWeight: '600',
        alignItems: 'center',
    },
    subHeaderText: {
        fontWeight: '600',
        alignItems: 'center',
        color: '#878787',
        paddingTop: 5,
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
