import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../lib/supabase'; // Ensure the path is correct

const RequestItem = () => {
    const router = useRouter(); // Initialize the router
    const [combinedData, setCombinedData] = useState([]);
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(true); // Add a loading state

    useEffect(() => {
        const fetchRequestsData = async () => {
            setLoading(true); // Set loading to true when fetching starts
            const {
                data: { user },
                error,
            } = await supabase.auth.getUser();
            if (error) {
                console.error('Error fetching user session:', error);
                setLoading(false);
                return;
            }

            if (user) {
                const userName = user.user_metadata.full_name || 'User';
                setUserName(userName);
                const userEmail = user.email;
                const { data: allRequests, error: requestsError } = await supabase
                    .from('requests')
                    .select('*')
                    .neq('user_email', userEmail);

                if (requestsError) {
                    console.error('Error fetching requests:', requestsError);
                    setLoading(false);
                    return;
                }

                // Filter out accepted requests
                const filteredRequests = allRequests.filter(request => request.status !== 'accepted');

                // Process and format the data
                const formattedData = [
                    { title: '', data: filteredRequests || [] },
                ];

                setCombinedData(formattedData);
                setLoading(false); // Set loading to false once data is fetched
            }
        };

        fetchRequestsData();
    }, []);

    const renderSection = ({ item }) => (
        <View style={styles.requestBoxesSection}>
            <Text style={styles.subTitle}>{item.title}</Text>
            {item.data.map((request) => (
                <TouchableOpacity
                    key={request.id}
                    style={styles.card}
                    onPress={() => router.push(`/RequestDetail?request=${JSON.stringify(request)}`)} // Pass request data as query parameter
                >
                    <View style={styles.cardRow}>
                        <Text style={styles.cardTitle}>{request.item_name}</Text>
                        <View style={request.status === 'accepted' ? styles.Acceptedbutton : styles.Pendingbutton}>
                            <Text style={styles.buttonText}>{request.status}</Text>
                        </View>
                    </View>
                    <Text style={styles.cardDescription}>
                        <Text style={styles.requesteeText}>Requestee: </Text>
                        <Text style={styles.borrowerText}>{request.full_name}</Text>
                    </Text>
                    <Text style={styles.timePeriodText}>
                        <Text style={styles.requesteeText}>Time Period: </Text>
                        <Text style={styles.timePeriod}>{request.borrow_period}</Text>
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );

    // Display loading text or spinner when data is being fetched
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={styles.loadingText}>Loading requests...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Requests</Text>
            <FlatList
                data={combinedData}
                keyExtractor={(item) => item.title}
                renderItem={renderSection} // Use the renderSection function for rendering
                contentContainerStyle={styles.scrollContainer} // Set the container style
                ListHeaderComponent={<Text style={styles.headerText}></Text>} // Optional header
            />
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
    buttonText: {
        color: '#fff', // Button text color
        fontWeight: 'bold',
        textAlign: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 18,
    },
});

export default RequestItem;
