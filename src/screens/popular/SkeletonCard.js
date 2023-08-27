import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

const SkeletonCard = () => {
    return (
        <>
            <SafeAreaView>
                <ScrollView>
                    <View style={styles.cardContainer}>
                        <View style={styles.imageContainer}>
                            {/* Placeholder SVG */}
                        </View>
                        <View style={styles.horizontalLine}></View>
                        <View style={styles.flexContainer}>
                            {/* Placeholder SVG */}
                            <View style={styles.textContainer}>
                                <View style={styles.smallLine}></View>
                                <View style={styles.largeLine}></View>
                            </View>
                        </View>
                        <Text style={styles.srOnly}>Loading...</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        maxWidth: 150,
        padding: 10,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 4,
        marginHorizontal: 10,
        marginBottom: 2,
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        width: 125,
        marginBottom: 4,
        backgroundColor: '#E5E5E5',
        borderRadius: 8,
    },
    horizontalLine: {
        height: 10,
        width: 120,
        backgroundColor: '#E5E5E5',
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 4,
    },
    smallLine: {
        height: 4,
        width: '100%',
        backgroundColor: '#E5E5E5',
        borderRadius: 2,
        marginBottom: 4,
    },
    largeLine: {
        height: 4,
        width: '70%',
        backgroundColor: '#E5E5E5',
        borderRadius: 2,
    },
    flexContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 4,
    },
    textContainer: {
        flex: 1,
        marginLeft: 10,
    },
    srOnly: {
        display: 'none', // Hide this text visually
    },
});

export default SkeletonCard;
