import { Tabs } from "expo-router";
import { StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons'; // Import an icon library

export default function RootLayout() {
    // Shared value for animation
    const translateY = useSharedValue(0);

    useEffect(() => {
        // Start the animation when the component mounts
        translateY.value = withTiming(0, { duration: 300 }); // Adjust the duration as needed
    }, []);

    // Animated style for the tab bar
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
        };
    });

    return (
        <Animated.View style={[styles.container, animatedStyle]}>
            <Tabs
                screenOptions={{
                    headerShown: false, // Hide the header for all screens
                    tabBarStyle: styles.tabBar, // Apply unique styles to the tab bar
                    // tabBarShowLabel: false,
                }}
            >
                {/* Home Tab */}
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Home',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="home-outline" size={size} color={color} />
                        ),
                    }}
                />
                {/* Others Requests Tab */}
                <Tabs.Screen
                    name="othersrequests"
                    options={{
                        title: 'Others requests',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="list-outline" size={size} color={color} />
                        ),
                        resizeMode: 'contain'
                    }}
                />
                <Tabs.Screen
                    name='generaterequest' // Replace with your new tab name
                    options={{
                        title: 'New',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="add-circle-outline" size={size} color={color} />
                        ),
                    }}
                />
                {/* Lent Requests Tab */}
                <Tabs.Screen
                    name="lentrequests"
                    options={{
                        title: 'Lent Requests',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="hand-right-outline" size={size} color={color} />
                        ),
                    }}
                />
            </Tabs>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBar: {
        position: 'absolute',
        bottom: 40,
        left: 0,
        right: 0,
        height: 70, // Increased height
        width: '80%', // Set width to 80% of the screen
        borderRadius: 40,
        alignItems: 'flex-end',
        paddingBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        justifyContent: 'space-around', // Distribute icons evenly
        alignItems: 'center',
        marginLeft: 40, // Center horizontally
        marginRight: 40, // Center horizontally
    },

});
