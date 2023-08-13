import React from 'react'
import { View, Text, Pressable, Image, Alert, SafeAreaView, StyleSheet } from 'react-native'
import COLORS from '../../../constants/colors';
import { FONTS, SIZES, images } from '../../../constants';
import Button from '../../components/Button';


const Welcome = () => {
    return (
        <SafeAreaView style={{ flex: 1, color: COLORS.secondaryWhite }}>
            <View style={{ flex: 1 }}>

                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={require('../../../assets/images/dims.png')}
                            style={styles.image}
                        />
                    </View>

                </View>

              
            </View>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent', // Set your desired background color
    },
    imageContainer: {
        backgroundColor: 'white', // You can adjust the background color of the container for the image
        padding: 20,
        borderRadius: 10,
        elevation: 5, // For shadow on Android (adjust as needed)
        shadowColor: 'black', // For shadow on iOS (adjust as needed)
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
    },
    image: {
        width: 200, // Set your desired image width
        height: 200, // Set your desired image height
        resizeMode: 'cover',
         transform: [{ scale: 1.2 }], // This keeps the image aspect ratio and scales it to fit within the container
    },
});

export default Welcome
