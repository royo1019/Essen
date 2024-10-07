// Home.js
import { StyleSheet, Text, View, ScrollView, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import React, { useRef, useEffect } from 'react';
import { useRouter, Stack } from "expo-router";
import { useNavigation } from '@react-navigation/native';
import SearchAnimation from '../../components/SearchAnimation'; // Make sure this path is correct

const { width } = Dimensions.get('window'); // Get device width for responsive images

// Sample imageData and categoryData
const imageData = [
    { id: '1', uri: 'https://i.pinimg.com/564x/d6/07/a4/d607a439ad5e307e9d6eb470d814d102.jpg' },
    { id: '2', uri: 'https://i.pinimg.com/564x/c1/cf/90/c1cf905c53d8c256eee69188ac1da5d6.jpg' },
    { id: '3', uri: 'https://i.pinimg.com/564x/aa/dd/8a/aadd8a7a7d40ec6c3cbde995ea735757.jpg' },
    { id: '4', uri: 'https://i.pinimg.com/564x/1f/a6/2c/1fa62c9e8d5f7f0dd403d7deb468b075.jpg' },
];

const categoryData = [
    { id: '1', imageUri: 'https://i.pinimg.com/564x/7c/d1/1f/7cd11f7443c47ba80aa79cfad266a5ab.jpg', name: "Iron Box", description: "Iron box for clothing", price: "20.00", category: "Appliances" },
    { id: '2', imageUri: 'https://i.pinimg.com/564x/2b/7c/9d/2b7c9dc63e01fe5823670b11c8042e29.jpg', name: "Kettle", description: "Electric kettle for boiling water", price: "30.00", category: "Kitchen" },
    { id: '3', imageUri: 'https://i.pinimg.com/736x/41/c3/c8/41c3c8e636427982a6f328efec6a6c82.jpg', name: "Study Lamp", description: "Lamp for studying", price: "15.00", category: "Furniture" },
    { id: '4', imageUri: 'https://i.pinimg.com/564x/4d/0e/41/4d0e41b6a64352835e106cddc8aa7f68.jpg', name: "Extension Cord", description: "Cord for multiple devices", price: "10.00", category: "Electrical" },
];

const Home = () => {
    const navigation = useNavigation();
    const router = useRouter();
    const sliderRef = useRef(null);
    const intervalRef = useRef(null);
    const currentIndex = useRef(0); // To keep track of the current index

    // To make the infinite slider, we duplicate the list
    const infiniteImageData = [...imageData, ...imageData];

    const renderImageItem = ({ item }) => (
        <Image source={{ uri: item.uri }} style={styles.sliderImage} />

    );

    const renderCategoryItem = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => handleCardPress(item)}>
            <Image source={{ uri: item.imageUri }} style={styles.cardImage} />
            <Text style={styles.cardName}>{item.name}</Text>
        </TouchableOpacity>

    );

    const onScrollEnd = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const itemWidth = width * 0.82;
        const currentIndex = Math.round(contentOffsetX / itemWidth);

        if (currentIndex >= imageData.length) {
            // If the user has scrolled past the original list, reset to the beginning of the list
            sliderRef.current.scrollToOffset({ offset: 0, animated: false });
        }
    };

    // Autoplay functionality
    useEffect(() => {
        const autoplay = () => {
            // Calculate the next index
            currentIndex.current = (currentIndex.current + 1) % infiniteImageData.length;
            const offset = currentIndex.current * (width * 0.82); // Calculate the offset for the next item

            sliderRef.current.scrollToOffset({ offset, animated: true });
        };

        intervalRef.current = setInterval(autoplay, 3000); // Change slide every 3 seconds

        return () => clearInterval(intervalRef.current); // Clear interval on unmount
    }, []);

    const handleCardPress = (item) => {
        console.log('Item clicked:', item); // Log clicked item details
        
    };


    return (
        <>
            {/* This hides the header */}
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.container}>

                <Text style={styles.welcome}>Welcome, User!</Text>
                <Text style={styles.subtext}>Buy or Borrow, Your Choice!</Text>

                {/* Infinite Image Slider */}
                <FlatList
                    ref={sliderRef}
                    data={infiniteImageData}
                    horizontal
                    renderItem={renderImageItem}
                    keyExtractor={(item, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    onMomentumScrollEnd={onScrollEnd}
                    style={styles.imageSlider}
                />

                {/* Essential Items List */}
                <ScrollView>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Popular Categories</Text>
                    </View>
                    {/* Render Cards for Categories */}
                    <FlatList
                        data={categoryData}
                        renderItem={renderCategoryItem}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categoryList}
                    />
                </ScrollView>

                {/* Bottom Navigation Bar */}
            </View>
        </>
    );
};

export default Home;

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#e3f2f8",
        paddingTop: 0,
        paddingLeft: 30,
        paddingRight: 30,
    },
    welcome: {
        fontWeight: '700',
        fontSize: 30,
        marginTop: 150,
    },
    subtext: {
        fontWeight: '700',
        fontSize: 15,
        marginTop: 5,
        marginBottom: 10,
        color: '#ac96b9',
    },
    imageSlider: {
        marginTop: 20,
    },
    sliderImage: {
        width: width * 0.8,
        height: 200,
        borderRadius: 10,
        marginRight: 10,
    },
    searchbar:
    {
        color: "#fff",
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    sectionTitle2: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#4c81d8',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginRight: 10,
        width: width * 0.45, // Card width (adjust as needed)
    },
    cardImage: {
        width: '100%', // Full width for the card image
        height: 200, // Adjust height to your liking
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    cardName: {
        fontSize: 15,
        padding: 10,
        textAlign: 'center',
    },

});