import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RequestItem = () => {
    return (
        <View style={styles.container}>
            <Text>Lent Requests</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default RequestItem;
