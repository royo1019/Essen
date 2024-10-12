import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const NewRequestPage = () => {
    const router = useRouter();

    const [itemName, setItemName] = useState('');
    const [timePeriod, setTimePeriod] = useState('');
    const [quotedPrice, setQuotedPrice] = useState('');
    const [details, setDetails] = useState('');

    // Handle form submission
    const handleSubmit = () => {
        // Here you can add the logic to save the request, such as sending it to an API

        // Redirect back to the requests page after submission (modify the path as needed)
        router.push('/RequestItem');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>New Request</Text>
            <Text style={styles.inputHeading}>
                Item Name
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Item Name"
                value={itemName}
                onChangeText={setItemName}
            />
            <Text style={styles.inputHeading}>
                Borrow Period
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Time period in days"
                value={timePeriod}
                onChangeText={setTimePeriod}
            />
            <Text style={styles.inputHeading}>
                Additional Details
            </Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Enter details here"
                multiline
                numberOfLines={4}
                value={details}
                onChangeText={setDetails}
            />

            <Button title="Submit Request" onPress={handleSubmit} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e3f2f8',
        paddingHorizontal: 20,
        paddingTop: 100,
    },
    heading: {
        fontSize: 30,
        fontWeight: '600',
        marginBottom: 20,
        marginLeft: 20,
    },
    inputHeading:
    {
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
        height: 100, // Fixed height for the text area
        textAlignVertical: 'top', // Align text at the top
    },
});

export default NewRequestPage;
