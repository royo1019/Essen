import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { createClient } from '@supabase/supabase-js';

import { supabase } from '../lib/supabase';
const NewRequestPage = () => {
    const router = useRouter();

    const [itemName, setItemName] = useState('');
    const [timePeriod, setTimePeriod] = useState('');
    const [details, setDetails] = useState('');
    const [userEmail, setUserEmail] = useState('');

    // Fetch the user's email from the Supabase auth session
    useEffect(() => {
        const fetchUserEmail = async () => {
            const {
                data: { user },
                error,
            } = await supabase.auth.getUser();

            if (error) {
                console.error('Error fetching user email:', error);
            } else if (user) {
                setUserEmail(user.email);
            }
        };

        fetchUserEmail();
    }, []);

    // Handle form submission
    const handleSubmit = async () => {
        try {
            const { data, error } = await supabase.from('requests').insert([
                {
                    item_name: itemName,
                    borrow_period: timePeriod,
                    additional_details: details,
                    user_email: userEmail, // Add email to the request
                },
            ]);

            if (error) {
                console.error('Error submitting request:', error);
            } else {
                console.log('Request submitted successfully:', data);
                // Redirect to the requests page after submission
                router.push('/myrequests');
            }
        } catch (err) {
            console.error('Unexpected error:', err);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>New Request</Text>
            <Text style={styles.inputHeading}>Item Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Item Name"
                value={itemName}
                onChangeText={setItemName}
            />
            <Text style={styles.inputHeading}>Borrow Period</Text>
            <TextInput
                style={styles.input}
                placeholder="Time period in days"
                value={timePeriod}
                onChangeText={setTimePeriod}
            />
            <Text style={styles.inputHeading}>Additional Details</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Enter details here"
                multiline
                numberOfLines={4}
                value={details}
                onChangeText={setDetails}
            />

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit Request</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e3f2f8',
        paddingHorizontal: 20,
        paddingTop: 150,
    },
    heading: {
        fontSize: 30,
        fontWeight: '600',
        marginBottom: 20,
        marginLeft: 20,
    },
    inputHeading: {
        marginLeft: 20,
        fontWeight: '500',
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        marginVertical: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    submitButton: {
        backgroundColor: '#2A9BE7',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        marginVertical: 20,
        marginHorizontal: 40,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default NewRequestPage;
