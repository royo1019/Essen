import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useRef } from 'react';
import { Formik } from "formik";
import { Video, ResizeMode } from "expo-av";
import { useRouter, Stack } from "expo-router";
import * as Yup from "yup";
import AsyncStorage from '@react-native-async-storage/async-storage';

const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email().label("Email"),
    password: Yup.string()
        .required("Password is required")
        .min(4)
        .label("Password"),
});

const Login = () => {
    const { height, width } = Dimensions.get("window");
    const router = useRouter();
    const videoRef = useRef(null);

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.container}>
                {/* Fullscreen Video Background */}
                <Video
                    ref={videoRef}
                    style={styles.video}
                    source={{
                        uri: "https://cdn.pixabay.com/video/2024/09/06/230060_large.mp4",
                    }}
                    resizeMode={ResizeMode.COVER}
                    shouldPlay
                    isLooping
                />
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Login</Text>
                    <Formik
                        initialValues={{ email: "", password: "" }}
                        onSubmit={async (values, { setSubmitting }) => {
                            // Temporarily bypass backend authentication
                            try {
                                // You can comment out the API call
                                // fetch("http://192.168.1.7:5000/api/auth/login", {
                                //     method: "POST",
                                //     headers: {
                                //         "Content-Type": "application/json",
                                //     },
                                //     body: JSON.stringify({
                                //         email: values.email,
                                //         password: values.password,
                                //     }),
                                // })
                                // .then((res) => res.json())
                                // .then(async (data) => {
                                //     if (data.token) {
                                //         console.log("Login successful:", data);
                                //         await AsyncStorage.setItem('token', data.token);
                                //         router.push("/(tabs)");
                                //     } else {
                                //         Alert.alert("Login failed", data.message);
                                //     }
                                // });

                                // Directly navigate to the home page
                                router.push("/(tabs)");
                            } catch (err) {
                                console.error("Error:", err);
                                Alert.alert("Error", "An error occurred while logging in.");
                            } finally {
                                setSubmitting(false);
                            }
                        }}
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
                                    placeholderTextColor="black"
                                    onChangeText={handleChange("email")}
                                    onBlur={handleBlur("email")}
                                    value={values.email}
                                    keyboardType="email-address"
                                />
                                {errors.email && touched.email ? (
                                    <Text style={styles.errorText}>{errors.email}</Text>
                                ) : null}
                                <TextInput
                                    style={styles.input}
                                    placeholder="Password"
                                    placeholderTextColor="black"
                                    onChangeText={handleChange("password")}
                                    onBlur={handleBlur("password")}
                                    value={values.password}
                                    secureTextEntry
                                />
                                {errors.password && touched.password ? (
                                    <Text style={styles.errorText}>{errors.password}</Text>
                                ) : null}
                                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                    <Text style={styles.buttonText}>Login</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </Formik>
                </View>
            </View>
        </>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
    },
    video: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1, // Place behind other components
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 24,
        color: "#000",
    },
    formContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: "90%", // Adjust width as needed
        paddingHorizontal: 16,
        paddingVertical: 20,
        backgroundColor: "#ffffff", // Change to desired color
        borderRadius: 20, // Adjust radius for curvature
        elevation: 5, // For shadow effect on Android
        shadowColor: '#000', // For shadow effect on iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    form: {
        width: "100%",
    },
    input: {
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 16,
        backgroundColor: "#fff",
    },
    errorText: {
        color: "red",
        marginBottom: 16,
    },
    button: {
        height: 50,
        backgroundColor: "#6200ea",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        marginTop: 16,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});
