import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useRef } from 'react';
import { Formik } from 'formik';
import { Video, ResizeMode } from 'expo-av';
import { Stack } from 'expo-router';
import * as Yup from 'yup';
import { supabase } from '../lib/supabase';

const validationSchema = Yup.object().shape({
    full_name: Yup.string().required('Full name is required').label('Full Name'),
    phone_number: Yup.string()
        .required('Phone number is required')
        .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
        .label('Phone Number'),
    room_number: Yup.string().required('Room number is required').label('Room Number'),
    block: Yup.string().required('Block is required').label('Block'),
    email: Yup.string().required('Email is required').email().label('Email'),
    password: Yup.string().required('Password is required').min(4).label('Password'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

const Register = () => {
    const videoRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const signUpWithEmail = async (email, password, full_name, phone_number, room_number, block) => {
        setLoading(true);
        const { error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    full_name: full_name,
                    phone_number: phone_number,
                    room_number: room_number,
                    block: block,
                },
            },
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
                <View style={styles.overlay} />
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Register</Text>
                    <Formik
                        initialValues={{
                            full_name: '',
                            phone_number: '',
                            room_number: '',
                            block: '',
                            email: '',
                            password: '',
                            confirmPassword: '',
                        }}
                        onSubmit={(values) =>
                            signUpWithEmail(
                                values.email,
                                values.password,
                                values.full_name,
                                values.phone_number,
                                values.room_number,
                                values.block
                            )
                        }
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
                                    placeholder="Full Name"
                                    onChangeText={handleChange('full_name')}
                                    onBlur={handleBlur('full_name')}
                                    value={values.full_name}
                                />
                                {errors.full_name && touched.full_name && (
                                    <Text style={styles.errorText}>{errors.full_name}</Text>
                                )}

                                <TextInput
                                    style={styles.input}
                                    placeholder="Phone Number"
                                    onChangeText={handleChange('phone_number')}
                                    onBlur={handleBlur('phone_number')}
                                    value={values.phone_number}
                                    keyboardType="phone-pad"
                                />
                                {errors.phone_number && touched.phone_number && (
                                    <Text style={styles.errorText}>{errors.phone_number}</Text>
                                )}

                                <TextInput
                                    style={styles.input}
                                    placeholder="Room Number"
                                    onChangeText={handleChange('room_number')}
                                    onBlur={handleBlur('room_number')}
                                    value={values.room_number}
                                />
                                {errors.room_number && touched.room_number && (
                                    <Text style={styles.errorText}>{errors.room_number}</Text>
                                )}

                                <TextInput
                                    style={styles.input}
                                    placeholder="Block"
                                    onChangeText={handleChange('block')}
                                    onBlur={handleBlur('block')}
                                    value={values.block}
                                />
                                {errors.block && touched.block && (
                                    <Text style={styles.errorText}>{errors.block}</Text>
                                )}

                                <TextInput
                                    style={styles.input}
                                    placeholder="Email"
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    keyboardType="email-address"
                                />
                                {errors.email && touched.email && (
                                    <Text style={styles.errorText}>{errors.email}</Text>
                                )}

                                <TextInput
                                    style={styles.input}
                                    placeholder="Password"
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    secureTextEntry
                                />
                                {errors.password && touched.password && (
                                    <Text style={styles.errorText}>{errors.password}</Text>
                                )}

                                <TextInput
                                    style={styles.input}
                                    placeholder="Confirm Password"
                                    onChangeText={handleChange('confirmPassword')}
                                    onBlur={handleBlur('confirmPassword')}
                                    value={values.confirmPassword}
                                    secureTextEntry
                                />
                                {errors.confirmPassword && touched.confirmPassword && (
                                    <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                                )}

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
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    formContainer: {
        width: '90%',
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 10,
        elevation: 5,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#000',
    },
    form: {
        width: '100%',
    },
    input: {
        height: 50,
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 16,
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