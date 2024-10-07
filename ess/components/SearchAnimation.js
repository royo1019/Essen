import React, { useRef, useState } from "react";
import AnimatedSearchBox from "@ocean28799/react-native-animated-searchbox";
import { View, StyleSheet } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';



const SearchAnimation = () => {
    const refSearchBox = useRef();
    const [isOpen, setIsOpen] = useState(false);

    const openSearchBox = () => {
        refSearchBox.current.open();
        setIsOpen(true);
    };

    const closeSearchBox = () => {
        refSearchBox.current.close();
        setIsOpen(false);
    };

    return (
        <View style={styles.container}>
            <MaterialCommunityIcons style={styles.profile} name="account-outline" size={25} color="black" />
            <AnimatedSearchBox
                ref={(ref) => (refSearchBox.current = ref)}
                placeholder={"Search"}
                placeholderTextColor="#707070"
                backgroundColor="#acdaf5"
                searchIconColor="#000"
                focusAfterOpened
                searchIconSize={20}
                borderRadius={20}
                onChangeText={(text) => {
                    console.log("Input: ", text);
                }}
                onBlur={() => closeSearchBox()}
                style={{ width: isOpen ? 180 : 50 }}
                onPress={openSearchBox}
            />
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 30, // Position from the top
        left: 80, // Position from the left
        paddingTop: 50,
        paddingRight: 15,
        paddingBottom: 40,
        width: "90%",
        marginBottom: 30,
    },
    profile:
    {
        position: 'absolute',
        top: 65,
        right: 340,
    },
});

export default SearchAnimation;