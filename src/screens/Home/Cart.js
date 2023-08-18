import React, { useEffect, useState } from 'react'
import { Image, SafeAreaView, View, Text, TouchableOpacity } from 'react-native'
import PageContainer from '../../components/PageContainer'
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { COLORS, FONTS, images, SIZES } from '../../../constants';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';


const Cart = () => {
    return (
        <SafeAreaView>
            <PageContainer>
                <View style={{ flex: 1 }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginHorizontal: 22,
                            marginTop: 35,
                            paddingBottom: 10
                        }}
                    >
                        <TouchableOpacity onPress={() => navigation.navigate("Home")}
                            style={{ marginLeft: -10 }} >
                            <MaterialIcons name='keyboard-arrow-left'
                                size={28}
                                style={{ color: COLORS.secondaryBlack }} />
                        </TouchableOpacity>
                        <Text style={{ ...FONTS.h4 }}>Cart Details</Text>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                        }}
                    >
                        <Image
                            source={{ uri: 'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/4.webp' }}
                            resizeMode="contain"
                            style={{
                                height: 250,
                                width: 300,
                            }}
                        />

                    </View>

                    <View style={{
                        backgroundColor: COLORS.secondaryWhite,
                        borderTopLeftRadius: 25,
                        borderTopRightRadius: 25,
                        height: '60%',
                        width: '100%',
                        shadowColor: COLORS.secondaryBlack,
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.27,
                        shadowRadius: 4.65,
                        elevation: 6
                    }}>

                        <View style={{
                            color: COLORS.secondaryBlack,
                            paddingHorizontal: 22,
                            marginVertical: 22
                        }}>
                            <Text style={{ ...FONTS.h2, paddingBottom: 10 }}>
                                {product.name}
                            </Text>

                            <Text style={{ ...FONTS.h4, marginVertical: 15, paddingBottom: 10 }}>
                                Lenovo Flex - 3 Core i5 12th Gen - (16 GB/512 GB SSD/Windows 11 Home/4 GB Graphics/NVIDIA GeForce RTX 3050) AN515-58 Gaming Laptop  (15.6 inch, Shale Black, 2.5 kg)
                            </Text>

                            <Text style={{ ...FONTS.h4, marginVertical: 15, paddingTop: 15 }}>
                                ₹{product.price}
                            </Text>
                        </View>
                    </View>
                </View>
            </PageContainer>
        </SafeAreaView >
    )
}

export default Cart
