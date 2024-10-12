import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useRef } from 'react';
import { Formik } from 'formik';
import { Video, ResizeMode } from 'expo-av';
import { Stack } from 'expo-router';
import * as Yup from 'yup';
import { supabase } from '../lib/supabase';

const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email().label('Email'),
    password: Yup.string().required('Password is required').min(4).label('Password'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

const Register = () => {
    const videoRef = useRef(null); // Create a reference for the video
    const [loading, setLoading] = useState(false);

    const signUpWithEmail = async (email, password) => {
        setLoading(true);
        const { error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) {
            Alert.alert('Registration Error', error.message);
        } else {
            Alert.alert('Success', 'Please check your inbox for email verification!');
        }
        setLoading(false);
    };

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.container}>
                {/* Fullscreen Video Background */}
                <Video
                    ref={videoRef}
                    style={StyleSheet.absoluteFillObject} // Fill the entire screen
                    source={{
                        uri: 'https://cdn.pixabay.com/video/2024/09/06/230060_large.mp4',
                    }}
                    resizeMode={ResizeMode.COVER}
                    shouldPlay
                    isLooping
                />
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Register</Text>
                    <Formik
                        initialValues={{ email: '', password: '', confirmPassword: '' }}
                        onSubmit={(values) => signUpWithEmail(values.email, values.password)}
                        validationSchema={validationSchema}
                    >
                        {({
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            values,
                            errors,
                            touched,
                        }) => (
                            <View style={styles.form}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email"
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    keyboardType="email-address"
                                />
                                {errors.email && touched.email ? (
                                    <Text style={styles.errorText}>{errors.email}</Text>
                                ) : null}

                                <TextInput
                                    style={styles.input}
                                    placeholder="Password"
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    secureTextEntry
                                />
                                {errors.password && touched.password ? (
                                    <Text style={styles.errorText}>{errors.password}</Text>
                                ) : null}

                                <TextInput
                                    style={styles.input}
                                    placeholder="Confirm Password"
                                    onChangeText={handleChange('confirmPassword')}
                                    onBlur={handleBlur('confirmPassword')}
                                    value={values.confirmPassword}
                                    secureTextEntry
                                />
                                {errors.confirmPassword && touched.confirmPassword ? (
                                    <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                                ) : null}

                                <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
                                    <Text style={styles.buttonText}>{loading ? 'Registering...' : 'Register'}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </Formik>
                </View>
            </View>
        </>
    );
};

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 24,
        color: '#000', // Change to black for visibility
    },
    formContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        paddingHorizontal: 16,
        paddingVertical: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent background
        borderRadius: 20, // Curved corners
        elevation: 5, // Shadow effect on Android
        shadowColor: '#000', // Shadow effect on iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    form: {
        width: '100%',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 16,
        backgroundColor: '#fff',
    },
    errorText: {
        color: 'red',
        marginBottom: 16,
    },
    button: {
        height: 50,
        backgroundColor: '#6200ea',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
