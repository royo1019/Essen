import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const RequestItem = () => {
    const router = useRouter(); // Initialize the router
    // Example data for requests with a status and time period field
    const requests = [
        { id: 1, title: "Iron Box", borrower: "John Doe", status: "Accepted", timePeriod: "1 week", image: { uri: 'https://i.pinimg.com/564x/d6/07/a4/d607a439ad5e307e9d6eb470d814d102.jpg' } },
        { id: 2, title: "Study Lamp", borrower: "Jane Smith", status: "Pending", timePeriod: "3 days", image: { uri: 'https://i.pinimg.com/564x/c1/cf/90/c1cf905c53d8c256eee69188ac1da5d6.jpg' } },
        { id: 3, title: "Coffee Table", borrower: "David Brown", status: "Accepted", timePeriod: "2 weeks", image: { uri: 'https://i.pinimg.com/564x/aa/dd/8a/aadd8a7a7d40ec6c3cbde995ea735757.jpg' } },
        { id: 4, title: "Cutlery Set", borrower: "Sarah White", status: "Pending", timePeriod: "5 days", image: { uri: 'https://i.pinimg.com/564x/1f/a6/2c/1fa62c9e8d5f7f0dd403d7deb468b075.jpg' } },
        { id: 5, title: "Extension Cord", borrower: "Michael Green", status: "Accepted", timePeriod: "1 month", image: { uri: 'https://i.pinimg.com/564x/7c/d1/1f/7cd11f7443c47ba80aa79cfad266a5ab.jpg' } },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Requests</Text>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {requests.map((request) => (
                    <TouchableOpacity
                        key={request.id}
                        style={styles.card}
                        onPress={() => router.push(`/RequestDetail?request=${JSON.stringify(request)}`)} // Pass request data as query parameter
                    >
                        <View style={styles.cardRow}>
                            <Image source={request.image} style={styles.productImage} />
                            <Text style={styles.cardTitle}>{request.title}</Text>
                            <View style={request.status === 'Accepted' ? styles.Acceptedbutton : styles.Pendingbutton}>
                                <Text style={styles.buttonText}>{request.status}</Text>
                            </View>
                        </View>
                        <Text style={styles.cardDescription}>
                            <Text style={styles.requesteeText}>Requestee: </Text>
                            <Text style={styles.borrowerText}>{request.borrower}</Text>
                        </Text>
                        <Text style={styles.timePeriodText}>
                            <Text style={styles.requesteeText}>Time Period: </Text>
                            <Text style={styles.timePeriod}>{request.timePeriod}</Text>
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e3f2f8',
        paddingHorizontal: 20,
    },
    heading: {
        fontSize: 30,
        fontWeight: "600",
        marginTop: 100,
        marginBottom: 20,
        marginLeft: 15,
    },
    scrollContainer: {
        paddingBottom: 20,

        paddingHorizontal: 15,
    },
    card: {
        backgroundColor: '#ffff',
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        height: 150,
    },
    cardRow: {
        flexDirection: 'row', // Align title and button horizontally
        alignItems: 'center', // Center vertically
        justifyContent: 'space-between', // Space between title and button
    },
    productImage: {
        width: 50, // Adjust size as needed
        height: 50, // Adjust size as needed
        borderRadius: 25, // Make it circular
        marginRight: 10, // Space between image and title
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1, // Allow title to take up available space
    },
    cardDescription: {
        fontSize: 14,
        color: '#555',
        marginTop: 10, // Add space between description and card row
    },
    requesteeText: {
        fontWeight: '700', // Style for "Requestee" and "Time Period"
        color: '#000', // Color for "Requestee" and "Time Period"
    },
    borrowerText: {
        marginTop: 5, // Space between "Requestee:" and the borrower's name
    },
    timePeriodText: {
        marginTop: 10, // Space above the time period text
    },
    timePeriod: {
        color: '#888',
        marginTop: 5, // Space above the time period value
    },
    Acceptedbutton: {
        backgroundColor: '#5ecb3c', // Button color for accepted
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center', // Center text in the shape
    },
    Pendingbutton: {
        backgroundColor: '#7f7f7f', // Button color for pending
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center', // Center text in the shape
    },
    buttonText: {
        color: '#fff', // Button text color
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default RequestItem;
