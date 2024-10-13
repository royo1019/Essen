import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import { supabase } from '../lib/supabase';

const MyRequestsPage = () => {
    const [acceptedRequests, setAcceptedRequests] = useState([]);
    const [loading, setLoading] = useState(true); // State to track loading status
    const router = useRouter(); // Get the router object

    useEffect(() => {
        const fetchRequestsData = async () => {
            // Fetch the current user's information
            const {
                data: { user },
                error,
            } = await supabase.auth.getUser(); // Fetch the user details

            if (error) {
                console.error('Error fetching user session:', error);
                return;
            }

            if (user) {
                const userEmail = user.email; // Get the email of the currently logged-in user

                // Fetch all accepted requests from other users
                const { data: acceptedRequests, error: acceptedError } = await supabase
                    .from('requests')
                    .select('*')
                    .eq('status', 'accepted')
                    .neq('user_email', userEmail); // Requests from other users

                if (acceptedError) {
                    console.error('Error fetching accepted requests:', acceptedError);
                    return;
                }

                setAcceptedRequests(acceptedRequests || []);
            }
            setLoading(false); // Set loading to false after data fetching
        };

        fetchRequestsData();
    }, []);

    // Render each accepted request
    const renderRequest = ({ item: request }) => (
        <View key={request.id} style={styles.requestCard}>
            <Text style={styles.itemText}>Item Name: {request.item_name}</Text>
            <Text style={styles.itemTex}>Duration: {request.borrow_period}</Text>
            <Text style={styles.statusText}>
                Will be returned in {request.borrow_period} days
            </Text>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={styles.loadingText}>Loading items...</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={acceptedRequests}
            keyExtractor={(item) => item.id.toString()} // Unique key for each item
            renderItem={renderRequest}
            contentContainerStyle={styles.container}
            ListHeaderComponent={
                <View style={styles.header}>
                    <Text style={styles.sectionTitle}>Lent Products</Text>
                    <Text style={styles.details}>This page displays all accepted requests by user.</Text>
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0F4F8',
    },
    loadingText: {
        fontSize: 20,
        fontWeight: '500',
        color: '#34495E',
    },
    details: {
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
