import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, View, Text, TextInput, TouchableOpacity, AppState } from 'react-native';
import { supabase } from '../lib/supabase';
import { Stack, useRouter } from 'expo-router';

export default function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleAppStateChange = (state) => {
            if (state === 'active') {
                supabase.auth.startAutoRefresh();
            } else {
                supabase.auth.stopAutoRefresh();
            }
        };

        const subscription = AppState.addEventListener('change', handleAppStateChange);
        return () => {
            subscription.remove();
        };
    }, []);

    async function signInWithEmail() {
        setLoading(true);
        const { data: authData, error } = await supabase.auth.signInWithPassword({
            email: email.trim(),
            password: password,
        });

        if (error) {
            Alert.alert('Login Error', error.message);
        } else {
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('full_name')
                .eq('id', authData.user.id)
                .single(); // Get the full_name associated with this user's id

            if (profileError) {
                Alert.alert('Profile Error', profileError.message);
            } else {
                Alert.alert('Login Successful', `Welcome back, ${profileData.full_name || authData.user.email}!`);
                router.push('/(tabs)');
            }
        }
        setLoading(false);
    }


    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Login</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="black"
                        onChangeText={setEmail}
                        value={email}
                        keyboardType="email-address"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="black"
                        onChangeText={setPassword}
                        value={password}
                        secureTextEntry
                    />
                    <TouchableOpacity style={styles.button} onPress={signInWithEmail} disabled={loading}>
                        <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Login'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    formContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%', // Keep the width responsive
        paddingHorizontal: 16,
        paddingVertical: 20,
        backgroundColor: '#ffffff',
        borderRadius: 15,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    title: {
        fontSize: 28, // Slightly reduced for better visual balance
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#6200ea', // Changed color for better contrast
    },
    input: {
        height: 50,
        borderColor: '#6200ea', // Changed border color for better visibility
        borderWidth: 1,
        borderRadius: 8,
        width: 150,
        paddingHorizontal: 16,
        marginBottom: 20,
        backgroundColor: '#ffffff',
        fontSize: 16, // Increased font size for better readability
    },
    button: {
        height: 50,
        backgroundColor: '#6200ea',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        borderRadius: 8,
        marginTop: 16,
        elevation: 3, // Added elevation for depth effect
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
