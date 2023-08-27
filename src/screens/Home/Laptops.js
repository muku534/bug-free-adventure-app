import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, SafeAreaView, TextInput, Image } from 'react-native';
import { COLORS, FONTS, images, SIZES } from '../../../constants';
import { Card, Text } from 'react-native-paper';
import PageContainer from '../../components/PageContainer';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import SkeletonCard from '../popular/SkeletonCard';


const Laptops = ({ navigation }) => {

    const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const getProducts = async () => {
        try {

            const response = await axios.get(`${process.env.REACT_APP_API_URL}/getProducts`)
            setProducts(response.data.Products);
            setLoading(false);
            console.log('all products get sucessfully')

        } catch (error) {
            setLoading(false);
            console.log('axios error', error.message)
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    const skeletonCount = 10; // Set the number of skeleton cards
    const cardsPerRow = 2; // Number of skeleton cards per row

    const renderProducts = ({ item }) => (

        <TouchableOpacity
            onPress={() => {
                // Handle navigation to product details
            }}
            key={item._id}
            style={{
                flex: 1,
                marginVertical: 10,
                width: '50%',
                paddingHorizontal: 5,
                marginVertical: 5
            }}
        >
            <View style={{
                height: 205,
                width: 150,
                marginHorizontal: 10,
                marginBottom: 2,
                paddingBottom: 20,
                backgroundColor: COLORS.lightgray,
                borderRadius: 15,
                shadowColor: COLORS.black,
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5
            }}>
                <Image source={images.dims}
                    style={{
                        height: 100,
                        width: 150
                    }} />

                <View style={{
                    backgroundColor: COLORS.tertiaryWhite, justifyContent: 'center',
                    borderRadius: 15,
                    marginVertical: 5,
                    marginHorizontal: 5,
                    height: 'auto',
                    paddingHorizontal: 5,
                    paddingTop: 10,
                    // paddingVertical: 2,
                }}>

                    <Text style={{
                        lineHeight: 20,
                        ...FONTS.body4,
                        fontWeight: 'bold'
                    }}  >{item.name} </Text>

                    <View style={{
                        justifyContent: 'space-between', flexDirection: 'row',
                        paddingTop: 13,
                        paddingVertical: 2
                    }}>

                        <Text variant="titleLarge" style={{
                            ...FONTS.body4, fontWeight: 'bold',
                        }}>₹ {item.price}</Text>

                        <View style={{
                            backgroundColor: COLORS.lightgray,
                            height: 30,
                            width: 30,
                            borderRadius: 8
                        }}>
                            <MaterialIcons name='keyboard-arrow-right'
                                size={28}
                                style={{ color: COLORS.secondaryBlack }} />
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>

    )


    return (
        <>
            <SafeAreaView>
                <PageContainer>
                    <View style={{ flex: 1 }} >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginHorizontal: 22,
                                marginTop: 40,
                                paddingBottom: 10
                            }}
                        >
                            <TouchableOpacity onPress={() => navigation.navigate("Home")}
                                style={{ marginLeft: -10 }} >
                                <MaterialIcons name='keyboard-arrow-left'
                                    size={28}
                                    style={{ color: COLORS.secondaryBlack }} />
                            </TouchableOpacity>
                            <Text style={{ ...FONTS.h4 }}>Laptops</Text>
                            <TouchableOpacity onPress={() => navigation.navigate("Wishlist")}>
                                <AntDesign name='hearto'
                                    size={24}
                                    style={{ color: COLORS.secondaryBlack }} />
                            </TouchableOpacity>
                        </View>

                        <View
                            style={{
                                marginHorizontal: 22,
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: COLORS.secondaryWhite,
                                height: 48,
                                marginVertical: 22,
                                paddingHorizontal: 12,
                                borderRadius: 10,
                            }}
                        >
                            <Ionicons name="ios-search-outline" size={24} color={COLORS.black} />

                            <TextInput
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    marginHorizontal: 12,
                                }}
                                placeholder="Search Contact..."
                                value={searchQuery}
                                onChangeText={(text) => setSearchQuery(text)}
                            />
                        </View>

                        {isLoading ? (
                            <View style={{
                                flexDirection: 'row',
                                marginVertical: 25,
                                marginHorizontal: 10
                            }}>
                                {Array.from({ length: cardsPerRow }, (_, i) => (
                                    <SkeletonCard key={i} />
                                ))}
                            </View>
                        ) : (

                            < FlatList
                                data={products.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))}
                                keyExtractor={(item) => item._id}
                                renderItem={renderProducts}
                                numColumns={2}
                                contentContainerStyle={{
                                    marginHorizontal: 10,
                                    paddingBottom: 25,
                                    marginVertical: 18
                                }}
                            />
                        )
                        }
                    </View>
                </PageContainer>
            </SafeAreaView>
        </>
    )
}

export default Laptops
