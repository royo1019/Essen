import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RequestItem = () => {
    return (
        <View style={styles.container}>
            <Text>Whenever the user accepts someone else's request, that request shows up on this page</Text>
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
